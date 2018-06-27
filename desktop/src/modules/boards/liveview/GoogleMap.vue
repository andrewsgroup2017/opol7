<template>

  <div id="map">
  </div>
</template>

<script>
// const config = require('../../config/app.config').default
const config = {
    googleKey: 'pk.eyJ1IjoicnlhbmhhbWxleSIsImEiOiJjaWszbmluaG8wMDAzdTBrc2Q3Ymk3b3l1In0.BxdMyaYKg_0-LwANjPybNA',
    mapStyles: {
        default: 'mapbox://styles/ryanhamley/ciuxgnhff00jo2irrvml8bfjk',
        satellite: 'mapbox://styles/mapbox/satellite-v9'
    }
}
const socketaddy = 'ws://localhost:1880/ws/location'
export default {
    data: function() {
        return {
            defaultlat: '-12.043333',
            defaultlng: '-77.028333',
            map: {},
        }
    },
    mounted: function() {
        this.map = new GMaps({
            div: '#map',
            lat: -35.043333,
            lng: -95.028333
        })
        this.sock = new WebSocket(socketaddy)
        let vm = this
        vm.sock.onopen = function() {
            console.log('Connected websocket')
	      console.log('Sending ping..')
	      vm.sock.send('Ping!')
	      console.log('Ping sent..')
        }
        vm.sock.onerror = function() {
            console.log('Websocket error')
        }
        vm.sock.onmessage = function(evt) {
            let latlng = JSON.parse(evt.data)
            let array = $.map(latlng, (el) => {
  			return [ [ el.lat, el.lng ] ]
            })

            vm.map.removeMarkers()
            vm.map.removePolylines()
       	console.log(`Got marker at ${ latlng[0].lat }, ${ latlng[0].lng}`, latlng)
            vm.map.setZoom(17)
       	vm.map.setCenter(latlng[0].lat, latlng[0].lng)
            vm.map.addMarkers(latlng)
      	vm.map.drawPolyline({
		  path: array,
		  strokeColor: '#131540',
		  strokeOpacity: 0.6,
		  strokeWeight: 6
            })
            // this.loadData();
        }
    },
    methods: {

        loadData: function() {

        },
        updateMap: function() {

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
