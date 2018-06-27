<template>
  <div id="root">
  
    <GmapMap ref="mapRef" :center="center" :zoom="9" style="height: 900px">
      <gmap-info-window :options="infoOptions" :position="infoWindowPos" :opened="infoWinOpen" @closeclick="infoWinOpen=false">
        {{ infoContent }}
      </gmap-info-window>
      <gmap-marker v-for="(m, index) in markers" :key="index" :position="m.position" :label="m.label" :clickable="true" :draggable="false" @click="toggleInfoWindow(m,index)" @mouseover="statusText = m.text" @mouseout="statusText = null"></gmap-marker>
      <div slot="visible">
        <div style="bottom: 0; left: 0; background-color: #0000FF; color: white; position: absolute; z-index: 100">
          {{ statusText }}
        </div>
      </div>
    </GmapMap>
  </div>
</template>

<script>
  /////////////////////////////////////////
  // New in 0.4.0
  import * as VueGoogleMaps from 'vue2-google-maps'
  // import VueWebsocket from "vue-websocket";
  import LiveViewService from '../../services/LiveViewService.vue'
  import Vue from 'vue'
  // Vue.use(VueWebsocket, "ws://192.168.1.6:1880/ws/location");
  // this.$refs.gmap.$on('zoom_changed', someFunc)
  Vue.use(VueGoogleMaps, {
    load: {
      key: 'AIzaSyBGRXPPjwlX7WiuTvcH2KFw2yVgRrEqEzA',
      autobindAllEvents: false,
      // libraries: 'places', //// If you need to use place input
    }
  })
  
  export default {
    data() {
      return {
        center: {
          lat: 32.3173168,
          lng: -95.2474281
        },
        markers: {},
        sock: {},
        loadedMarkers: [],
        statusText: '',
        infoContent: '',
        infoWindowPos: null,
        infoWinOpen: false,
        currentMidx: null,
        //optional: offset infowindow so it visually sits nicely on top of our marker
        infoOptions: {
          pixelOffset: {
            width: 0,
            height: -35
          }
        },
      }
    },
    mounted() {
      this.markers = []
      LiveViewService.methods.getRegisters().then((res) => {
        // this.sock = new WebSocket('ws://localhost:1880/ws/location');
        this.sock = new WebSocket('ws://opol-fred.mybluemix.net/ws/location')
        var vm = this
        vm.$refs.mapRef.$mapPromise.then((map) => {
          map.panTo({
            lat: 1.38,
            lng: 103.80
          })
          console.log(map)
        })
  
        vm.sock.onopen = function() {
          console.log("Connected websocket")
          // console.log(vm.loadedMarkers)
          for (var m of vm.loadedMarkers) {
            vm.updateMarkers(m)
  
          }
        }
        vm.sock.onerror = function() {
          console.log("Websocket error")
        }
        vm.sock.onmessage = function(evt) {
          console.log(vm.$refs.gmap)
  
          vm.updateMarkers(evt)
        }
  
  
  
  
        for (var marker of res) {
          // console.log(marker.d.assigned_to.username)
          this.loadedMarkers.push(marker.d)
          // this.updateMarkers(marker.d)
        }
      })
  
      // console.log(message)
      //   vm.map.removeMarkers();
      //   vm.map.removePolylines();
      //  	console.log("Got marker at " + latlng[0].lat + ", " + latlng[0].lng, latlng);
      //   vm.map.setZoom(17);
      //  	vm.map.setCenter(latlng[0].lat, latlng[0].lng);
      //   vm.map.addMarkers(latlng);
      // 	vm.map.drawPolyline({
      // path: array,
      // strokeColor: '#131540',
      // strokeOpacity: 0.6,
      // strokeWeight: 6
      // });
      //}
  
    },
    beforeMount() {
  
    },
    methods: {
      route: function() {
        var map = this.$refs.gmap - map
        console.log(map)
  
      },
      toggleInfoWindow: function(marker, idx) {
        //  console.log(idx)
        //  console.log(marker)
        this.infoWindowPos = marker.position
        this.infoContent = marker.infoText
        this.infoWinOpen = true
  
        // //check if its the same marker that was selected if yes toggle
        // if (this.currentMidx == idx) {
        //   this.infoWinOpen = !this.infoWinOpen;
        // }
        // //if different marker set infowindow to open and reset current marker index
        // else {
        //   this.infoWinOpen = true;
        //   this.currentMidx = idx;
  
        // }
      },
      updateMarkers(evt) {
        var message = {}
        try {
          message = JSON.parse(evt.data)
        } catch (e) {
          console.log(e)
          message = evt
        }
        //  console.log(message)
        //fix for stoopid owntracks
        var lng = ""
        // if(!marker.lng){
        //   marker.lng = marker.lon 
        //  }
  
        var marker = {
          tid: message.tid,
          infoText: message.assigned_to.username + '  ' + message.tid,
          label: message.assigned_to.username,
          //text: message.assigned_to.username,
          position: {
            lat: message.lat,
            lng: message.lng || message.lon
          }
        }
  
        for (const [index, value] of this.markers.entries()) {
          // console.log(value.tid)
          // console.log(marker.tid)
          if (value.tid == marker.tid) {
            // console.log(index, value);           
            this.markers.splice(index, )
          }
        }
        this.markers.push(marker)
  
        console.log(this.markers.length)
        this.toggleInfoWindow(marker, this.markers.length - 1)
      }
    },
  }
</script>