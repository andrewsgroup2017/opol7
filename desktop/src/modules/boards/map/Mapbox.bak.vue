<template>
  <div id="map">
    <p id="latLng">Lat: {{ lat }} Lng: {{ lng }}</p>
    <form id="mapType">
      <label>Change Map Type</label>
      <input v-model="mapType" type="radio" name="mapType" value="default" @change="changeMapType" /> Default <br />
      <input v-model="mapType" type="radio" name="mapType" value="satellite" @change="changeMapType" /> Satellite <br />
    </form>
  </div>
</template>

<script>
// const config = require('../../config/app.config').default
const config = {
    mapboxToken: 'pk.eyJ1IjoicnlhbmhhbWxleSIsImEiOiJjaWszbmluaG8wMDAzdTBrc2Q3Ymk3b3l1In0.BxdMyaYKg_0-LwANjPybNA',
    mapStyles: {
        default: 'mapbox://styles/ryanhamley/ciuxgnhff00jo2irrvml8bfjk',
        satellite: 'mapbox://styles/mapbox/satellite-v9'
    }
}
const mapboxgl = require('mapbox-gl')
const Draw = require('mapbox-gl-draw')
const defaultLatLng = {
    lat: 37.7720566,
    lng: -122.4099524
}
const defaultOptions = {
    container: 'map',
    style: config.mapStyles.default,
    center: [ defaultLatLng.lng, defaultLatLng.lat ],
    zoom: 15,
    // pitch: 45,
    attributionControl: false
}
mapboxgl.accessToken = config.mapboxToken
export default {
    data: function() {
        return {
            route: [],
            lat: defaultLatLng.lat,
            lng: defaultLatLng.lng,
            mapType: 'default'
        }
    },
    mounted: function() {
        console.log('this', this)
        this.loadData()
    },
    methods: {
        changeMapType: function(event) {
            this.map.setStyle(config.mapStyles[this.mapType])
        },
        loadData: function() {
            let map
            let vm = this
            //   vm.$http.get('http://api.open-notify.org/iss-now.json')
            vm.$http.get('/iss')
                .then((res) => {
                    let issPosition = res.body.iss_position
                    let issLat = parseFloat(issPosition.latitude, 10)
                    let issLng = parseFloat(issPosition.longitude, 10)
                    vm.lat = issLat
                    vm.lng = issLng
                    vm.route.push([ issLng, issLat ])
                    defaultOptions.center = [ issLng, issLat ]
                    defaultOptions.zoom = 4
                    map = new mapboxgl.Map(defaultOptions)
                    vm.map = map
                    let nav = new mapboxgl.NavigationControl({ position: 'bottom-right' })
                    map.addControl(nav)
                    // map.addControl(Draw())
                    map.on('load', () => {
                        map.addSource('points', {
                            type: 'geojson',
                            data: {
                                type: 'FeatureCollection',
                                features: [ {
                                    type: 'Feature',
                                    geometry: {
                                        type: 'Point',
                                        coordinates: [ issLng, issLat ]
                                    },
                                    properties: {
                                        title: 'ISS',
                                        icon: 'rocket'
                                    }
                                } ]
                            }
                        })
                        map.addLayer({
                            id: 'points',
                            type: 'symbol',
                            source: 'points',
                            layout: {
                                'icon-image': '{icon}-15',
                                'text-field': '{title}',
                                'text-font': [ 'Open Sans Semibold', 'Arial Unicode MS Bold' ],
                                'text-offset': [ 0, 0.6 ],
                                'text-anchor': 'top'
                            }
                        })
                    })
                    map.on('mousemove', (e) => {
                        vm.lat = e.lngLat.lat.toFixed(7)
                        vm.lng = e.lngLat.lng.toFixed(7)
                    })
                })
            setTimeout(() => {
                vm.updateMap()
            }, 5000)
        },
        updateMap: function() {
            let vm = this
            vm.$http.get('/iss')
                .then((res) => {
                    let issPosition = res.body.iss_position
                    let issLat = parseFloat(issPosition.latitude, 10)
                    let issLng = parseFloat(issPosition.longitude, 10)
                    vm.route.push([ issLng, issLat ])
                    vm.lat = issLat
                    vm.lng = issLng
                    // vm.map.flyTo({
                    //   center: [
                    //     issLng,
                    //     issLat
                    //   ]
                    // });
                    // if (!vm.map.getSource('route')) {
                    //   vm.map.addSource("route", {
                    //     "type": "geojson",
                    //     "data": {
                    //       "type": "Feature",
                    //       "properties": {},
                    //       "geometry": {
                    //         "type": "LineString",
                    //         "coordinates": vm.route
                    //       }
                    //     }
                    //   });
                    //
                    //   vm.map.addLayer({
                    //     "id": "route",
                    //     "type": "line",
                    //     "source": "route",
                    //     "layout": {
                    //       "line-join": "round",
                    //       "line-cap": "round"
                    //     },
                    //     "paint": {
                    //       "line-color": "#888",
                    //       "line-width": 8
                    //     }
                    //   });
                    // } else {
                    //   vm.map.getSource('points').setData({
                    //     "type": "geojson",
                    //     "data": {
                    //       "type": "Feature",
                    //       "properties": {},
                    //       "geometry": {
                    //         "type": "LineString",
                    //         "coordinates": vm.route
                    //       }
                    //     }
                    //   });
                    // }
                    requestAnimationFrame(() => {
                        vm.map.getSource('points').setData({
                            type: 'FeatureCollection',
                            features: [ {
                                type: 'Feature',
                                properties: {
                                    title: 'ISS',
                                    icon: 'rocket'
                                },
                                geometry: {
                                    type: 'Point',
                                    coordinates: [ issLng, issLat ]
                                }
                            } ]
                        })
                    })
                    setTimeout(() => {
                        vm.updateMap()
                    }, 5000)
                })
        }
    }
}
</script>

<style scoped lang='scss'>
#map {
  position:absolute;
  top:0;
  bottom:0;
  width:100%;
}
#latLng {
  background: transparentize(white, 0.2);
  bottom: 0;
  box-sizing: border-box;
  display: inline;
  left: 10px;
  padding: 5px;
  pointer-events: none;
  position: absolute;
  z-index: 200;
}
#mapType {
  background: white;
  border-radius: 5px;
  box-sizing: border-box;
  display: inline;
  padding: 5px;
  top: 10px;
  right: 10px;
  position: absolute;
  z-index: 200;
  label {
    display: block;
    font-weight: bold;
  }
}
</style>
