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
for code in document.querySelectorAll 'code.source'
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

# ------------------ #
# Initialise the map #
# ------------------ #
MAP = null
initMap = ->
  div = document.querySelector '#map'
  return unless div

  mapTypeIds = (item for _, item of google.maps.MapTypeId).concat 'osm'
  mapTypeRx = new RegExp "[?&]map=(#{mapTypeIds.join '|'})(?:&|$)"

  # Create a blank map.
  MAP = new google.maps.Map div,
    center: new google.maps.LatLng
    zoom: 1
    mapTypeId: location.search.match(mapTypeRx)?[1] or 'osm'
    mapTypeControlOptions:
      mapTypeIds: mapTypeIds
      style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
    fullscreenControl: true
    zoomControl: true
    streetViewControl: true

  MAP.mapTypes.set 'osm', new google.maps.ImageMapType
    getTileUrl: (coord, zoom) ->
      "http://tile.openstreetmap.org/#{zoom}/#{coord.x}/#{coord.y}.png"
    tileSize: new google.maps.Size 256, 256
    name: 'OSM'
    maxZoom: 18

  MAP.data.setStyle
    fillColor: '#2e7d32'    # green-800
    fillOpacity: 0.5
    strokeColor: '#ff6f00'  # amber-900
    strokeWeight: 2

  # Show the first prefetch element on the map.
  for link in document.querySelectorAll 'div.geometry > link'
    loadGeoJSON link.href
    break

N = S = E = W = null
loadGeoJSON = (path) ->
  MAP?.data.loadGeoJson path, null, (features) ->
    # Update the map so the newly added features would fit.
    for f in features
      f.getGeometry().forEachLatLng (x) ->
        if !N or x.lat() > N
          N = x.lat()
        if !S or x.lat() < S
          S = x.lat()
        if !E or x.lng() > E
          E = x.lng()
        if !W or x.lng() < W
          W = x.lng()
      ne = new google.maps.LatLng N, E
      sw = new google.maps.LatLng S, W
      bb = new google.maps.LatLngBounds sw, ne
      MAP.fitBounds bb, 0

    # Make sure the map is visible.
    MAP.getDiv().style.visibility = ''

if @isMapLoaded
  initMap()
else
  # Wait for the map code to load.
  id = setInterval () ->
    if @isMapLoaded
      clearInterval id
      initMap()
  , 100
