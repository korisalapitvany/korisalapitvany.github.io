---
---

# -------------------------------- #
# Generate JSON/CSV download links #
# -------------------------------- #
csvEscape = (text) ->
  return '' unless text?
  return text if -1 is text.search /,/
  return "\"#{text.replace /"/g, '""'}\""

# Process each data source:
document.querySelectorAll('code.source').forEach (code) ->
  json = code.textContent
  return unless json

  oldObj = JSON.parse json
  newObj = {}
  for key, val of oldObj
    newObj[key.toLowerCase()] = val
  json = JSON.stringify newObj

  csv = ""
  for key, val of newObj
    csv += "#{csvEscape key},#{csvEscape val}\n"

  a = code.parentElement.querySelector 'a.json'
  a.style.display = ''
  a.href = "data:text/json;charset=utf-8,#{json}"

  a = code.parentElement.querySelector 'a.csv'
  a.style.display = ''
  a.href = "data:text/csv;charset=utf-8,#{csv}"

# ----------------- #
# Download map data #
# ----------------- #
wktData = []
wktSources = []

# Process each geometry source:
document.querySelectorAll('div.geometry>link').forEach (link) ->
  wktSources.push link.href

wktSources.forEach ->
  wktData.push null

wktSources.forEach (src, i) ->
  req = new XMLHttpRequest
  req.addEventListener 'load', ->
    wktData[i] = this.responseText
    wktDataLoaded() if -1 is wktData.indexOf null
  req.open 'GET', src
  req.send()

wktDataLoaded = ->
  processMapData()
  if @isMapLoaded
    initMap()
  else
    # Wait for the map code to load.
    id = setInterval () ->
      if @isMapLoaded
        clearInterval id
        initMap()
    , 100

processMapData = ->

# ------------------ #
# Initialise the map #
# ------------------ #
initMap = ->
  elem = document.querySelector '#map'
  return unless elem

  map = new google.maps.Map elem,
    mapTypeId: google.maps.MapTypeId.HYBRID
    center:
      lat: (46.057833999992+46.1024559999919) / 2
      lng: (19.6944895000002+19.7733740000002) / 2
    zoom: 13,

  paths = []

  polygon = new google.maps.Polygon
    paths: paths
    strokeColor: '#FF0000',
    strokeOpacity: 0.8,
    strokeWeight: 3,
    fillColor: '#FF0000',
    fillOpacity: 0.35
  polygon.setMap map

# Heavily based on https://gis.stackexchange.com/a/278112/4412.
# Returns a function so that we can hide the constants from the outer scope.
utm2LL = (->
  # Symbols as used in USGS PP 1395: Map Projections - A Working Manual
  DatumEqRad = [
    6378137.0, 6378137.0, 6378137.0, 6378135.0, 6378160.0, 6378245.0, 6378206.4,
    6378388.0, 6378388.0, 6378249.1, 6378206.4, 6377563.4, 6377397.2, 6377276.3
  ]
  DatumFlat = [
    298.2572236, 298.2572236, 298.2572215, 298.2597208, 298.2497323,
    298.2997381, 294.9786982, 296.9993621, 296.9993621, 293.4660167,
    294.9786982, 299.3247788, 299.1527052, 300.8021499
  ]

  Item = 0                              # default
  a = DatumEqRad[Item]                  # equatorial radius (meters)
  f = 1 / DatumFlat[Item]               # polar flattening
  drad = Math.PI / 180                  # convert degrees to radians
  k0 = 0.9996                           # scale on central meridian
  b = a * (1 - f)                       # polar axis
  e = Math.sqrt(1 - (b / a) * (b / a))  # eccentricity
  esq = (1 - (b / a) * (b / a))         # e² for use in expansions
  e0sq = e * e / (1 - e * e)            # e0² — always even powers

  # Return the actual function.
  (easting, northing, utm_zone, is_north) ->
    # First some validation:
    if easting < 160000 or easting > 840000
      throw 'Outside permissible range of easting values.'
    if northing < 0
      throw 'Negative values are not allowed for northing.'
    if northing > 10000000
      throw 'Northing may not exceed 10,000,000.'

    # Now the actual calculation:
    zcm = 3 + 6 * (utm_zone - 1) - 180  # central meridian of zone
    e1 = (1 - Math.sqrt(1 - e * e)) / (1 + Math.sqrt(1 - e * e))
    M0 = 0  # in case origin other than zero lat

    M = if is_north # arc length along standard meridian
      M0 + northing / k0
    else
      M0 + (northing - 10000000) / k
    mu = M / (a * (1 - esq * (1 / 4 + esq * (3 / 64 + 5 * esq / 256))))
    phi1 = mu + e1 * (3 / 2 - 27 * e1 * e1 / 32) * Math.sin(2 * mu) + e1 * e1 * (21 / 16 - 55 * e1 * e1 / 32) * Math.sin(4 * mu)
    phi1 = phi1 + e1 * e1 * e1 * (Math.sin(6 * mu) * 151 / 96 + e1 * Math.sin(8 * mu) * 1097 / 512)
    C1 = e0sq * Math.pow(Math.cos(phi1), 2)
    T1 = Math.pow(Math.tan(phi1), 2)
    N1 = a / Math.sqrt(1 - Math.pow(e * Math.sin(phi1), 2))
    R1 = N1 * (1 - e * e) / (1 - Math.pow(e * Math.sin(phi1), 2))
    D = (easting - 500000) / (N1 * k0)
    phi = (D * D) * (1 / 2 - D * D * (5 + 3 * T1 + 10 * C1 - 4 * C1 * C1 - 9 * e0sq) / 24)
    phi = phi + Math.pow(D, 6) * (61 + 90 * T1 + 298 * C1 + 45 * T1 * T1 - 252 * e0sq - 3 * C1 * C1) / 720
    phi = phi1 - (N1 * Math.tan(phi1) / R1) * phi

    lon = D * (1 + D * D * ((-1 - 2 * T1 - C1) / 6 + D * D * (5 - 2 * C1 + 28 * T1 - 3 * C1 * C1 + 8 * e0sq + 24 * T1 * T1) / 120)) / Math.cos(phi1)

    [
      phi / drad,
      zcm + lon / drad,
    ]
)()

utm34N2LL = (easting, northing) ->
  utm2LL easting, northing, 34, true
