package main

import (
	"encoding/json"
	"flag"
	"fmt"
	"io/ioutil"
	"log"
	"math"
	"os"
	"strconv"
	"strings"

	"github.com/twpayne/go-geom"
	"github.com/twpayne/go-geom/encoding/geojson"
	kmlenc "github.com/twpayne/go-geom/encoding/kml"
	kml "github.com/twpayne/go-kml"
)

const origin = "https://jasen.org.rs"

var (
	id     = flag.String("id", "", "ID field")
	name   = flag.String("name", "", "Name field")
	wgs84  = flag.Bool("wgs84", true, "Convert EPSG34N to WGS84")
	format = flag.String("format", "geojson", "Output format, one of: 'geojson', 'kml'")
)

func NewFeature(id, name string) (*geojson.Feature, error) {
	geom, err := NewGeometry()
	if err != nil {
		return nil, err
	}
	return &geojson.Feature{
		ID:       id,
		Geometry: geom,
		Properties: map[string]interface{}{
			"name": name,
			"url":  fmt.Sprintf("%s/%s/", origin, id),
		},
	}, nil
}

func NewGeometry() (geom.T, error) {
	b, err := ioutil.ReadAll(os.Stdin)
	if err != nil {
		return nil, err
	}
	s := strings.TrimSpace(string(b))

	switch parts := strings.SplitN(s, "(", 2); parts[0] {
	case "POINT":
		return NewPoint(s)
	case "POLYGON":
		return NewPolygon(s)
	case "MULTIPOINT":
		return NewMultiPoint(s)
	case "MULTIPOLYGON":
		return NewMultiPolygon(s)
	default:
		return nil, fmt.Errorf("unknown prefix: %s", parts[0])
	}
}

func NewPoint(wkt string) (*geom.Point, error) {
	parts := strings.Split(strings.Trim(strings.TrimPrefix(wkt, "POINT"), "()"), " ")
	if len(parts) != 2 {
		return nil, fmt.Errorf("%q: failed to parse x/y coordinates", wkt)
	}

	x, err := strconv.ParseFloat(parts[0], 64)
	if err != nil {
		return nil, err
	}
	y, err := strconv.ParseFloat(parts[1], 64)
	if err != nil {
		return nil, err
	}

	if *wgs84 {
		var err error
		// Swap Y & X, they become longitude & latitude.
		if y, x, err = UTM34N2LL(x, y); err != nil {
			return nil, err
		}
	}

	return geom.NewPointFlat(geom.XY, []float64{x, y}), nil
}

func NewPolygon(wkt string) (*geom.Polygon, error) {
	parts := strings.Split(strings.Trim(strings.TrimPrefix(wkt, "POLYGON"), "()"), "),(")

	coords := [][]geom.Coord{}
	for _, part := range parts {
		c := []geom.Coord{}
		for _, p := range strings.Split(part, ",") {
			point, err := NewPoint(p)
			if err != nil {
				return nil, err
			}
			c = append(c, point.Coords())
		}
		coords = append(coords, c)
	}
	return geom.NewPolygon(geom.XY).SetCoords(coords)
}

func NewMultiPoint(wkt string) (*geom.MultiPoint, error) {
	parts := strings.Split(strings.Trim(strings.TrimPrefix(wkt, "MULTIPOINT"), "()"), "),(")

	coords := []geom.Coord{}
	for _, part := range parts {
		point, err := NewPoint(part)
		if err != nil {
			return nil, err
		}
		coords = append(coords, point.Coords())
	}

	return geom.NewMultiPoint(geom.XY).SetCoords(coords)
}

func NewMultiPolygon(wkt string) (*geom.MultiPolygon, error) {
	parts := strings.Split(strings.Trim(strings.TrimPrefix(wkt, "MULTIPOLYGON"), "()"), ")),((")

	coords := [][][]geom.Coord{}
	for _, part := range parts {
		polygon, err := NewPolygon(part)
		if err != nil {
			return nil, err
		}
		coords = append(coords, polygon.Coords())
	}

	return geom.NewMultiPolygon(geom.XY).SetCoords(coords)
}

// Symbols as used in USGS PP 1395: Map Projections - A Working Manual
var (
	DatumEqRad = []float64{
		6378137.0, 6378137.0, 6378137.0, 6378135.0, 6378160.0, 6378245.0, 6378206.4,
		6378388.0, 6378388.0, 6378249.1, 6378206.4, 6377563.4, 6377397.2, 6377276.3,
	}
	DatumFlat = []float64{
		298.2572236, 298.2572236, 298.2572215, 298.2597208, 298.2497323,
		298.2997381, 294.9786982, 296.9993621, 296.9993621, 293.4660167,
		294.9786982, 299.3247788, 299.1527052, 300.8021499,
	}
)

// Heavily based on https://gis.stackexchange.com/a/278112/4412.
func UTM2LL(easting, northing float64, utmZone int, isNorth bool) (float64, float64, error) {
	// First some validation:
	if easting < 160000 || easting > 840000 {
		return 0, 0, fmt.Errorf("outside permissible range of easting values: %d", easting)
	}
	if northing < 0 {
		return 0, 0, fmt.Errorf("negative values are not allowed for northing: %d", northing)
	}
	if northing > 10000000 {
		return 0, 0, fmt.Errorf("northing may not exceed 10,000,000: %d", northing)
	}

	const Item = 0                  // default
	const k = 1                     // local scale
	const k0 = 0.9996               // scale on central meridian
	const drad = math.Pi / 180      // convert degrees to radians
	const M0 = 0                    // in case origin other than zero lat
	a := DatumEqRad[Item]           // equatorial radius (meters)
	f := 1 / DatumFlat[Item]        // polar flattening
	b := a * (1 - f)                // polar axis
	e := math.Sqrt(1 - (b/a)*(b/a)) // eccentricity
	esq := (1 - (b/a)*(b/a))        // e² for use in expansions
	e0sq := e * e / (1 - e*e)       // e0² — always even powers

	// Now the actual calculation:
	zcm := 3 + 6*(float64(utmZone)-1) - 180 // central meridian of zone
	e1 := (1 - math.Sqrt(1-e*e)) / (1 + math.Sqrt(1-e*e))

	M := 0.0
	if isNorth {
		// arc length along standard meridian
		M = M0 + northing/k0
	} else {
		M = M0 + (northing-10000000)/k
	}
	mu := M / (a * (1 - esq*(1./4+esq*(3./64+5*esq/256))))
	phi1 := mu + e1*(3./2-27*e1*e1/32)*math.Sin(2*mu) + e1*e1*(21./16-55*e1*e1/32)*math.Sin(4*mu)
	phi1 = phi1 + e1*e1*e1*(math.Sin(6*mu)*151/96+e1*math.Sin(8*mu)*1097/512)
	C1 := e0sq * math.Pow(math.Cos(phi1), 2)
	T1 := math.Pow(math.Tan(phi1), 2)
	N1 := a / math.Sqrt(1-math.Pow(e*math.Sin(phi1), 2))
	R1 := N1 * (1 - e*e) / (1 - math.Pow(e*math.Sin(phi1), 2))
	D := (easting - 500000) / (N1 * k0)
	phi := (D * D) * (1./2 - D*D*(5+3*T1+10*C1-4*C1*C1-9*e0sq)/24)
	phi = phi + math.Pow(D, 6)*(61+90*T1+298*C1+45*T1*T1-252*e0sq-3*C1*C1)/720
	phi = phi1 - (N1*math.Tan(phi1)/R1)*phi

	lon := D * (1 + D*D*((-1-2*T1-C1)/6+D*D*(5-2*C1+28*T1-3*C1*C1+8*e0sq+24*T1*T1)/120)) / math.Cos(phi1)

	return phi / drad, zcm + lon/drad, nil
}

func UTM34N2LL(easting, northing float64) (float64, float64, error) {
	return UTM2LL(easting, northing, 34, true)
}

func main() {
	flag.Parse()

	f, err := NewFeature(*id, *name)
	if err != nil {
		log.Printf("E: %v", err)
		return
	}

	switch *format {
	case "geojson":
		if err := json.NewEncoder(os.Stdout).Encode(&f); err != nil {
			log.Printf("E: %v", err)
		}
	case "kml":
		g, err := kmlenc.Encode(f.Geometry)
		if err != nil {
			log.Printf("E: %v", err)
		}
		p := kml.Placemark(kml.Name(*name), g)
		if err := kml.KML(p).Write(os.Stdout); err != nil {
			log.Printf("E: %v", err)
		}
	default:
		log.Printf("E: -format=%s not supported", *format)
	}
}
