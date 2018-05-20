package main

import (
	"encoding/json"
	"flag"
	"log"
	"os"

	"github.com/twpayne/go-geom/encoding/geojson"
)

func Read(path string) (*geojson.Feature, error) {
	src, err := os.Open(path)
	if err != nil {
		return nil, err
	}

	f := geojson.Feature{}
	if err := json.NewDecoder(src).Decode(&f); err != nil {
		return nil, err
	}

	return &f, nil
}

func ReadAll(paths []string) (*geojson.FeatureCollection, error) {
	fc := geojson.FeatureCollection{}
	for _, path := range paths {
		f, err := Read(path)
		if err != nil {
			return nil, err
		}
		fc.Features = append(fc.Features, f)
	}
	return &fc, nil
}

func main() {
	flag.Parse()

	var m json.Marshaler
	var err error

	switch args := flag.Args(); len(args) {
	case 0:
		return
	case 1:
		m, err = Read(args[0])
	default:
		m, err = ReadAll(args)
	}

	if err == nil {
		err = json.NewEncoder(os.Stdout).Encode(m)
	}

	if err != nil {
		log.Printf("E: %v", err)
	}
}
