import Vue from 'vue'
import Vuetify from 'vuetify'
// import 'vuetify/dist/vuetify.min.css'
import '../assets/stylus/vueify.styl'
import { Plugins, StatusBarStyle } from '@capacitor/core'

const { StatusBar } = Plugins

var StatusBarExample = /** @class */ (function() {
  function StatusBarExample() {
    this.isStatusBarLight = true
  }
  StatusBarExample.prototype.changeStatusBar = function() {
    StatusBar.setStyle(
      {
        style: this.isStatusBarLight
          ? core_1.StatusBarStyle.Dark
          : core_1.StatusBarStyle.Light,
      },
      function() {}
    )
    this.isStatusBarLight = !this.isStatusBarLight
  }
  StatusBarExample.prototype.hideStatusBar = function() {
    StatusBar.hide()
  }
  StatusBarExample.prototype.showStatusBar = function() {
    StatusBar.show()
  }
  return StatusBarExample
})()

Vue.use(Vuetify, {
  theme: {
    primary: '#42B983',
    // secondary: '#212121',
    secondary: '#82B1FF',
    accent: '#82B1FF',
    error: '#FF5252',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFC107',
  },
})
