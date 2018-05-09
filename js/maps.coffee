---
---

@initMap = () ->
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

csvEscape = (text) ->
  return '' unless text?
  if -1 is text.search /,/
    return text
  return "\"#{text.replace /"/g, '""'}\""

# Process each data source:
document.querySelectorAll('code.source').forEach (elem) ->
  json = elem.textContent
  return unless json

  oldObj = JSON.parse json
  newObj = {}
  for key, val of oldObj
    newObj[key.toLowerCase()] = val
  json = JSON.stringify newObj

  csv = ""
  for key, val of newObj
    csv += "#{csvEscape key},#{csvEscape val}\n"

  a = elem.parentElement.querySelector 'a.json'
  a.style.display = ''
  a.href = "data:text/json;charset=utf-8,#{json}"

  a = elem.parentElement.querySelector 'a.csv'
  a.style.display = ''
  a.href = "data:text/csv;charset=utf-8,#{csv}"

# Process each geometry source:
document.querySelectorAll('code.geometry').forEach (elem) ->
  json = elem.textContent
  return unless json

  geoms = JSON.parse json
  for geom in geoms
    # TODO: Download WKT data & update map, if loaded.
    console.log geom
