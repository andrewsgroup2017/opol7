/* eslint-disable */
// import BackgroundGeolocation from 'mauron85-background-geolocation'

import { EventBus } from './event-bus.js'

var callbackFn = function(location) {
  console.log(location)
  // console.log(location.latitude)
  var loc = {
    latitude: location.latitude,
    longitude: location.longitude,
    time: location.time,
  }
  EventBus.$emit('location-update', loc)
  backgroundGeolocation.finish()
}
var failureFn = function(error) {
  console.log('BackgroundGeolocation error', error)
  EventBus.$emit('location-error', error)
}
function onDeviceReadyx() {
  backgroundGeolocation.configure(callbackFn, failureFn, {
    desiredAccuracy: 10,
    stationaryRadius: 0,
    distanceFilter: 0,
    fastestInterval: 3000,
    interval: 7000,
    debug: true,
    startOnBoot: true,
    stopOnTerminate: false,
    stopOnStillActivity: false,
    // desiredAccuracy: 10,
    // stationaryRadius: 0,
    // // distanceFilter: 30,
    // maxLocations: 1000,
    // // Android only section
    // // locationProvider: backgroundGeolocation.provider.ANDROID_ACTIVITY_PROVIDER,
    // interval: 5000,
    // fastestInterval: 4000,
    // activitiesInterval: 6000,
    // notificationTitle: 'Background tracking',
    // notificationText: 'enabled',
    // notificationIconColor: '#FEDD1E',
    // notificationIconLarge: 'mappointer_large',
    // notificationIconSmall: 'mappointer_small',
  })
  backgroundGeolocation.start()
}
document.addEventListener('deviceready', onDeviceReadyx, false)
