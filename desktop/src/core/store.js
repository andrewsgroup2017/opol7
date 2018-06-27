import Vue from 'vue'
import Vuex from 'vuex'
// import firebase from 'firebase'
// import { VuetronVuex } from 'vuetron'
import hardware from '../modules/equipment/hardware/hardware'
import profile from '../modules/people/profile'
import common from './common'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    hardware,
    common,
    profile,
  },
  strict: false,
  state: {},
  getters: {},
  mutations: {},
  actions: {},
})
