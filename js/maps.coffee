---
---

PHOTO_SIZE = 168

MAP_LABELS =
  ZZPS: 'Zavod za zaštitu prirode Srbije'
  PZZP: 'Pokrajinski zavod za zaštitu prirode'
  RGZ:  'Republički geodetski zavod'
  WDPA: 'Svetska baza zaštićenih područja'

MAP_SOURCE_ORDER = [
  'PZZP',
  'ZZPS',
  'RGZ',
  'WDPA',
]

MAP_STYLES =
  active:
    zIndex: 1
    fillColor: '#2e7d32' # green-800
    fillOpacity: 0.5
    strokeColor: '#9c27b0' # purple-500
    strokeWeight: 2
  inactive:
    zIndex: 0
    fillColor: 'black'
    fillOpacity: 0.1
    strokeColor: 'black'
    strokeWeight: 1
    strokeOpacity: 0.25

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
  div = document.getElementById 'map'
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

  MAP.data.setStyle MAP_STYLES.inactive

  MAP.addListener 'maptypeid_changed', ->
    history.replaceState
      map: MAP.mapTypeId
    , document.title, "#{location.pathname}?map=#{MAP.mapTypeId}#{location.hash}"

  loadGeoJSON 'map.json'

  loadPlace()

addControls = (labels) ->
  ul = document.createElement 'ul'
  ul.className = 'toggle'
  ul.index = 1

  i = 1
  MAP_SOURCE_ORDER.forEach (label) ->
    return unless labels.has label

    li = document.createElement 'li'
    li.tabindex = i
    li.title = MAP_LABELS[label]
    li.role = 'button'
    li.style.opacity = '0'
    li.innerText = label

    li.addEventListener 'click', ->
      MAP.data.setStyle (feature) ->
        return MAP_STYLES[if label is feature.getProperty 'label' then 'active' else 'inactive']

      for other in ul.children
        other.className = ''
      li.className = 'active'

    # Enable the first source by default:
    if i is 1
      li.dispatchEvent new Event 'click'

    ul.appendChild li
    i += 1

  MAP.controls[google.maps.ControlPosition.TOP_LEFT].push ul

  setTimeout ->
    try
      # Copy padding settings from the map-type-control element:
      padding = MAP.getDiv().querySelector('div.gm-style-mtc>div[role=button]')?.style.padding
      if padding and padding isnt '8px'
        ul.style.marginTop = '16px'
        for li in ul.children
          li.style.padding = padding
    catch e

    i = 0
    for li in ul.children
      setTimeout ((li) -> ->
        li.style.opacity = '1'
      )(li), i
      i += 100
  , 1000

N = S = E = W = null
loadGeoJSON = (path) ->

  MAP.data.loadGeoJson path, null, (features) ->
    labels = new Set

    # Update the map so the newly added features would fit.
    for f in features
      label = f.getProperty 'label'
      labels.add label if label

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

    addControls labels

    # Make sure the map is visible.
    MAP.getDiv().style.visibility = ''

loadPlace = (placeId) ->
  div = document.getElementById 'photos'
  return unless div

  placeId = div.dataset.placeId
  service = new google.maps.places.PlacesService MAP
  service.getDetails {placeId}, (place, status) ->
    return unless status is google.maps.places.PlacesServiceStatus.OK
    return unless place.photos

    width = 0
    showPhotos = false
    for photo in place.photos
      w = Math.ceil photo.width * PHOTO_SIZE / photo.height
      h = PHOTO_SIZE

      img = document.createElement 'div'
      img.className = 'photo'
      img.style.width = "#{w}px"
      img.style.height = "#{h}px"
      img.style.backgroundImage = "url(#{photo.getUrl
        maxWidth: w*2
        maxHeight: h*2
      })"

      a = document.createElement 'a'
      a.className = 'full-size'
      a.href = photo.getUrl
        maxWidth: window.outerWidth*2
      img.appendChild a

      if photo.html_attributions.length
        attr = document.createElement 'div'
        attr.className = 'attr'
        attr.innerHTML = "Foto: #{photo.html_attributions.join ' / '}"
        img.appendChild attr

      if width > photos.clientWidth
        img.style.display = 'none'
      width += w + 4

      div.appendChild img
      showPhotos = true

    if showPhotos
      div.style.visibility = ''

if @isMapLoaded
  initMap()
else
  # Wait for the map code to load.
  id = setInterval () ->
    if @isMapLoaded
      clearInterval id
      initMap()
  , 100
