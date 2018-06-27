<template>
  <v-app id="inspire">
<div v-if="$user">

    <v-content>
      <router-view />
    </v-content>

    <v-card height="200px">
    <v-bottom-nav
       :value="true"
      :active.sync="e2"
      color="blue darken-3"
      absolute
      shift
app
    >
      <v-btn dark @click="moveOn(0)">
        <span>Schedule</span>
        <v-icon>assignment</v-icon>
      </v-btn>

      <v-btn dark @click="moveOn(1)">
        <span>Assets</span>
        <v-icon>build</v-icon>
      </v-btn>

      <v-btn dark @click="moveOn(2)">
        <span>People</span>
        <v-icon>chat</v-icon>
      </v-btn>

      <v-btn dark @click="moveOn(3)">
        <span>Status</span>
        <v-icon>settings</v-icon>
      </v-btn>
    </v-bottom-nav>
  </v-card>
</div>
<div v-else>
   <v-content>
      <router-view />
    </v-content>
</div>
  </v-app>
</template>

<script>
import { EventBus } from './services/event-bus.js'
// EventBus.$on('location-update', location => {
//   console.log('Oh, thats nice. Its gotten licks! :)', location)
// })
function onDeviceReady() {
  var string = device.serial
  console.log(strings)
  console.log('Saving device serial in local storage: ', string)
  window.localStorage.setItem('device_serial', serial)
  EventBus.$on('location-update', location => {
    var u = this.$user
    var latLng = {lat: location.latitude, lng: location.longitude}
    var device_serial = window.localStorage.get('device_serial')
     this.$fireDB('logs').push({
        event: {
          eventType: 'position-update',
          device_serial: string,
          time: location.time,
          latlng: latLng,
          user: u.uid,
        },
      })
    console.log(location.time)
  })
}
document.addEventListener('deviceready', onDeviceReady, false)

export default {
  data: () => ({
    dialog: false,
    drawer: null,
    e2: 0,
    // user: null,
    items: [
      { icon: 'contacts', text: 'Contacts' },
      { icon: 'history', text: 'Frequently contacted' },
      { icon: 'content_copy', text: 'Duplicates' },
      {
        icon: 'keyboard_arrow_up',
        'icon-alt': 'keyboard_arrow_down',
        text: 'Labels',
        model: true,
        children: [{ icon: 'add', text: 'Create label' }],
      },
      {
        icon: 'keyboard_arrow_up',
        'icon-alt': 'keyboard_arrow_down',
        text: 'More',
        model: false,
        children: [{ text: 'Import' }, { text: 'Export' }],
      },
      { icon: 'settings', text: 'Settings' },
      { icon: 'chat_bubble', text: 'Send feedback' },
    ],
  }),
  props: {
    source: String,
  },
  methods: {
    moveOn(n) {
      switch (n) {
        case 0:
          console.log(n)
          this.$router.replace('bluetooth')
          break
        case 1:
          this.$router.replace('camera')
          break
        case 2:
          this.$router.replace('posts')
          break
        case 3:
          this.$router.replace('status')
          break
      }
    },
    // this.user = this.$user
    // console.log(this.user)
    // console.log(EventBus)
    // EventBus.$on('location-update', location => {
    //   console.log('Oh, thats nice. Its gotten licks! :)', location)
    // })
  },
}
</script>
