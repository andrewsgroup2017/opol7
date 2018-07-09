import Vue from 'vue'
import Notifications from 'vue-notification'
import VueFirestore from 'vue-firestore'
import firebase from './firebase'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)
Vue.use(VueFirestore)

Vue.prototype.$firebase = firebase

Vue.use(Notifications)


Vue.mixin({
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