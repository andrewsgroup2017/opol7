import Vue from 'vue'
import Notifications from 'vue-notification'
import VueFirestore from 'vue-firestore'
import firebase from './firebase'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Fingerprint2 from 'fingerprintjs2'
Vue.use(VueAxios, axios)
Vue.use(VueFirestore)

Vue.prototype.$firebase = firebase

Vue.use(Notifications)

let fp = window.localStorage.getItem('fingerprint')
const w = window
async function setFP () {
  fp = await new Fingerprint2().get(function (result, components) {
    console.log(result)
    w.localStorage.setItem('fingerprint', result.toString()) // a
  })
}

if (!fp || fp === 'undefined') {
  setFP()
}

Vue.mixin({
  data () {
    return {
      fingerprint: fp,
    }
  },
  methods: {

    fireNotify: function (msg, group, type) {
      this.$notify({
        group: group || 'all',
        title: 'Authentication',
        type: type || '',
        text: msg || '',
        width: '100%'
      })
    }
  }
})