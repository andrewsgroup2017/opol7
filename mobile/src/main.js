// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
/* eslint-disable */
import _ from 'lodash'
const FB_CONFIG = {
  deployDevRulesOnTesting: false,
  apiKey: 'AIzaSyCBcvJvSl24XC-f1O23N42bgjdMcZwJrnA',
  authDomain: 'opol7dev.firebaseapp.com',
  databaseURL: 'https://opol7dev.firebaseio.com',
  storageBucket: 'opol7dev.appspot.com',
  projectId: 'opol7dev',
  allowEmailLogin: true,
  allowEmailRegistration: false,
}

function initCordova(callback) {
  if (window.cordova !== undefined) {
    console.log('1')
    if (window.StatusBar !== undefined) {
      console.log('2')
      callback()
    } else {
      console.log('3')

      document.addEventListener(
        'deviceready',
        () => {
          callback()
        },
        false
      )
    }
  } else {
    console.log('4')
    // callback()
    // createVue()
  }
}
// }
let easierGlobalDataObject = {
  computed: {
    // Legacy support
    $get() {
      return this.$root.data
    },
  },
  methods: {
    $db(...args) {
      return this.$root.$db(...args)
    },
    // Legacy support
    $save(...args) {
      this.$root.saveData(...args)
    },
    $remove(...args) {
      this.$root.removeData(...args)
    },
  },
}

let easierFirebase = {
  computed: {
    // Authentication
    $fireAuth() {
      return window.firebase && window.firebase.auth
        ? window.firebase.auth
        : null
    },
    $funcs() {
      return this.$root.fbfuncs()
    },
    $user() {
      return this.$root.user
    },
    // Realtime Database
    $fireDB() {
      return window.firebase && window.firebase.database
        ? ref => {
            return window.firebase.database().ref(ref)
          }
        : null
    },
    // Cloud Storage
    $fireStore() {
      return window.firebase && window.firebase.firestore
        ? ref => {
            return window.firebase.firestore()
          }
        : null
    },
    // Cloud Storage
    $fireStorage() {
      return window.firebase && window.firebase.storage
        ? ref => {
            return window.firebase.storage().ref(ref)
          }
        : null
    },
  },
}

let mixins = {}
mixins.loadConfig = {
  data: {
    // Load App Framework version
    frameworkVersion: process.env.FRAMEWORK_VERSION,
    // Load project version
    version: process.env.PROJECT_VERSION,
    // Load application configuration
    config: require('./config.json'),
  },
  // Update Framework7 modal title
  created: function() {
    // this.$options.framework7.modalTitle = this.config.title
    // this.$options.framework7.modalTitle = 'hai'
  },
}

mixins.manageFirebase = {
  // Set initial values
  data: {
    user: null,
    db: null,
    storeage: null,
    firestore: null,
    timestamp: null,
    fbfuncs: null,
  },
  created: function() {
    let firebase = require('firebase/app')
    require('firebase/auth')
    require('firebase/database')
    require('firebase/functions')
    require('firebase/storage')
    require('firebase/firestore')
    window.firebase = firebase.initializeApp(FB_CONFIG)
    const firestore = window.firebase.firestore()
    const settings = { /* your settings... */ timestampsInSnapshots: true }
    window.firestore = firestore.settings(settings)
    // Initialize Firebase
    // Use auth service
    console.log('FIREBASE INITIALIZED')

    // Get initial user data from local storage
    this.user = window.localStorage.user
      ? JSON.parse(window.localStorage.user)
      : null
    // Clean local storage if user is not logged in initially
    if (!window.localStorage.user) this.cleanLocalStorageAfterLogut()
    // Monitor user changes
    firebase.auth().onAuthStateChanged(user => {
      this.user = user
        ? {
            uid: user.uid,
            email: user.email,
            name: user.displayName,
            photo: user.photoURL,
          }
        : null
      if (user) {
        EventBus.$emit('auth-login', user)
      } else {
        // EventBus.$emit('auth-logout', user)
      }
    })

    // Use database service
    const fb = firebase
    this.fb = function(path) {
      return firebase
    }
    this.db = function(path) {
      return firebase.database().ref(path)
    }
    this.timestamp = firebase.database.ServerValue.TIMESTAMP

    // Use storage service
    this.storage = function(path) {
      return firebase.storage().ref(path)
    }
    this.firestore = function(name) {
      return firebase.firestore().collection(name)
    }
    this.fbfuncs = function(path) {
      return window.firebase.functions()
    }
  },
  // Watch for changes
  watch: {
    user: function(newUser) {
      // Update local storage
      if (newUser === null) {
        window.localStorage.removeItem('user')
        this.cleanLocalStorageAfterLogut()
      } else {
        window.localStorage.user = JSON.stringify(newUser)
      }
      // Update window object
      window.user = newUser
    },
    db: function(newDB) {
      // Update window object
      window.db = newDB
    },
    storage: function(newStorage) {
      // Update window object
      window.storeage = newStorage
    },
    firestore: function(newStore) {
      // Update window object
      window.firestore = newStore
    },
    timestamp: function(newTimestamp) {
      // Update window object
      window.timestamp = newTimestamp
    },
  },
  methods: {
    cleanLocalStorageAfterLogut: function() {
      for (let item in window.localStorage) {
        // History
        if (/^urls\|([0-9a-zA-Z._-]+)$/.test(item)) {
          let urls = JSON.parse(window.localStorage[item])
          let newUrls = []
          let loginRequired = false
          urls.map(url => {
            if (this.urlRequiresLogin(url)) {
              loginRequired = true
            } else if (!loginRequired) {
              newUrls.push(url)
            }
          })
          window.localStorage[item] = JSON.stringify(newUrls)
          // Component data and scroll positions
        } else if (/(scroll|data)\|[0-9a-zA-Z._-]+\|(.+)$/.test(item)) {
          let url = item.match(/(scroll|data)\|[0-9a-zA-Z._-]+\|(.+)$/)[2]
          if (this.urlRequiresLogin(url)) {
            window.localStorage.removeItem(item)
          }
        }
      }
    },
  },
}
mixins.sortObject = {
  beforeCreate: function() {
    window.sortObject = require('./sort-object')
  },
}
mixins.resetCache = {
  created: function() {
    // if (
    //   this.config.resetLocalStorageOnVersionChange === true &&
    //   window.localStorage.projectVersion !== undefined &&
    //   window.localStorage.projectVersion !== this.projectVersion
    // ) {
    // Remember alert
    let text = 'The application has been updated and the cache has been reset.'

    window.localStorage.cacheResetAlert = text['en']

    // Empty local storage
    for (let item in window.localStorage) {
      if (
        !/(firebase:(.+)|user|cacheResetAlert)/.test(item) &&
        item !== 'user'
      ) {
        window.localStorage.removeItem(item)
      }
    }
    // }
    // Update framework version in local storage
    console.log(
      'The application has been updated and the cache has been reset.'
    )
    window.localStorage.projectVersion = this.projectVersion
  },
  // Show Alert
  watch: {
    stateReady: function() {
      if (window.localStorage.cacheResetAlert !== undefined) {
        window.f7.alert(window.localStorage.cacheResetAlert, () => {
          // Prevent to show alert twice
          window.localStorage.removeItem('cacheResetAlert')
        })
      }
    },
  },
}

// mixins.initWorkarounds = {
//   data: {
//     materialCodepoints: null,
//   },
//   beforeCreate: function() {
//     require('./workarounds.css')
//     // Actions not show/hide properly
//     window.Dom7(document).on('actions:open', e => {
//       e.target.__vue__.opened = true
//     })
//     window.Dom7(document).on('actions:close', e => {
//       e.target.__vue__.opened = false
//     })
//     // Login screen show/hide properly
//     window.Dom7(document).on('page:init', e => {
//       window
//         .Dom7(e.target)
//         .find('.login-screen.modal-out')
//         .hide()
//     })
//   },
//   created: function() {
//     // Materical Icons not shown in older browsers / android versions
//     if (process.env.FONT_MATERIAL) {
//       this.materialCodepoints = require('./material-codepoints.json')
//     }
//   },
// }
// mixins.manageGlobalDataObject = {
//   // Set initial data
//   data: {
//     data: {},
//   },
//   // Methods to add or remove data
//   methods: {
//     $db(...args) {
//       // Check arguments
//       if (args.length < 1 || args.length > 2 || typeof args[0] !== 'string') {
//         throw new Error(
//           '$db() should have one or two arguments, the first one should be a string'
//         )
//         // Read data
//       } else if (args.length === 1) {
//         return _.get(this.data, args[0], undefined)
//         // Write/Remove data
//       } else {
//         // Clone current data
//         const data = _.cloneDeep(this.data)
//         // Update data
//         if (args[1] !== null) {
//           _.set(data, args[0], args[1])
//           // Remove data
//         } else {
//           _.unset(data, args[0])
//         }
//         // Save data to Vue object
//         this.$set(this, 'data', data)
//         // Save data to local storage
//         if (window.cordova) {
//           window.NativeStorage.setItem('data', data)
//         } else {
//           window.localStorage.data = JSON.stringify(this.data)
//         }
//       }
//     },
//     // Legacy support
//     saveData: function(path, value) {
//       this.$db(path, value)
//     },
//     removeData: function(path) {
//       this.$db(path, null)
//     },
//   },
//   // Restore local storage
//   created: function() {
//     if (window.cordova) {
//       const self = this
//       window.NativeStorage.getItem(
//         'data',
//         function(data) {
//           self.data = data
//         },
//         function() {
//           self.data = {}
//         }
//       )
//     } else {
//       this.data =
//         window.localStorage.data !== undefined
//           ? JSON.parse(window.localStorage.data)
//           : {}
//     }
//   },
// }
mixins.appMode = {
  data: {
    appMode: null,
  },
  created: function() {
    if (window.cordova !== undefined) {
      this.appMode = 'native'
    } else {
      this.appMode = 'desktop'
    }
    console.log(this.appMode)
  },
}

// mixins.manageState = {
//   data: {
//     stateReady: false,
//   },
//   watch: {
//     f7Ready: function() {
//       const config = this.config
//       function restoreState(callback) {
//         restoreScrollOnPageLoad()
//         restoreTabOnPageLoad()
//         restoreFormInputOnPageLoad()
//         restoreViews(function() {
//           restoreOverlays(function() {
//             window.Dom7('#frame').show()
//             restoreFocus()
//             setTimeout(() => {
//               window.Dom7(window).trigger('resize')
//             }, 0)
//             callback()
//           })
//         })
//       }
//       function restoreViews(callback, viewId) {
//         viewId = viewId || 0
//         if (viewId < window.f7.views.length) {
//           restoreUrls(viewId, function() {
//             restoreViews(callback, viewId + 1)
//           })
//         } else {
//           callback()
//         }
//       }
//       function restoreUrls(viewId, callback, urls, urlId) {
//         urlId = urlId || 0
//         urls = urls || []
//         if (urlId === 0) {
//           try {
//             urls = JSON.parse(
//               window.localStorage['urls|' + window.f7.views[viewId].selector]
//             )
//             urls = Array.isArray(urls) ? urls : []
//           } catch (err) {
//             window.localStorage.removeItem(
//               'urls|' + window.f7.views[viewId].selector
//             )
//           }
//         }
//         if (config.restoreHistory === false && urls.length > 0) {
//           urls = urls.slice(-1)
//         }
//         if (urlId < urls.length) {
//           setTimeout(function() {
//             window.f7.views[viewId].router.load({
//               url: urls[urlId],
//               animatePages: false,
//             })
//             restoreUrls(viewId, callback, urls, urlId + 1)
//           }, 0)
//         } else {
//           callback()
//         }
//       }
//       function restoreScrollOnPageLoad() {
//         window.Dom7(document).on('page:init', function(e) {
//           restoreScrollOnPage(e.target)
//         })
//         window.Dom7(document).on('panel:open popup:open', function(e) {
//           window
//             .Dom7(e.target)
//             .find('.page')
//             .each(function(i, pageEl) {
//               restoreScrollOnPage(pageEl)
//             })
//         })
//       }
//       function restoreScrollOnPage(pageEl) {
//         window
//           .Dom7(pageEl)
//           .find('.page-content')
//           .each(function() {
//             let storageKey =
//               'scroll|' +
//               getViewSel(pageEl) +
//               '|' +
//               getViewUrl(pageEl) +
//               (this.id !== '' ? '|' + this.id : '')
//             if (/^[0-9]+$/.test(window.localStorage[storageKey])) {
//               window.Dom7(this).scrollTop(window.localStorage[storageKey])
//             }
//           })
//       }
//       function restoreTabOnPageLoad() {
//         window.Dom7(document).on('page:init', function(e) {
//           let tab =
//             window.localStorage['tab|' + getViewSel(e) + '|' + getViewUrl(e)]
//           if (tab !== undefined) {
//             window.f7.showTab('#' + tab, false)
//           }
//         })
//       }
//       function restoreFormInputOnPageLoad() {
//         window.Dom7(document).on('page:init', function(e) {
//           window
//             .Dom7(e.target)
//             .find('form')
//             .each(function(i, el) {
//               let formId = window.Dom7(el).attr('id')
//               let formData = window.localStorage['formInput|' + formId]
//                 ? JSON.parse(window.localStorage['formInput|' + formId])
//                 : null
//               if (
//                 formId !== null &&
//                 typeof formData === 'object' &&
//                 formData !== null
//               ) {
//                 window.f7.formFromData('#' + formId, formData)
//               }
//             })
//         })
//       }
//       function restoreOverlays(callback, elements) {
//         elements = elements || [
//           'popup',
//           'loginscreen',
//           'picker',
//           'panel',
//           'actions',
//         ]
//         if (elements.length === 0) {
//           callback()
//         } else {
//           let element = elements.shift()
//           let value = window.localStorage[element]
//           if (value !== undefined) {
//             setTimeout(function() {
//               if (
//                 element === 'panel' &&
//                 window.Dom7('.panel-' + value).length > 0
//               ) {
//                 window.f7.openPanel(value === 'right' ? 'right' : 'left', false)
//               } else if (
//                 element === 'actions' &&
//                 window.Dom7('.actions-modal' + value).length > 0
//               ) {
//                 window.f7.openModal(value, false)
//               } else if (
//                 element === 'loginscreen' &&
//                 window.Dom7('.login-screen' + value).length > 0
//               ) {
//                 window.f7.loginScreen(value, false)
//               } else if (
//                 element === 'picker' &&
//                 window.Dom7('.picker-modal' + value).length > 0
//               ) {
//                 window.f7.pickerModal(value, false, false)
//               } else if (
//                 element === 'popup' &&
//                 window.Dom7('.popup' + value).length > 0
//               ) {
//                 window.f7.popup(value, false, false)
//               }
//               restoreOverlays(callback, elements)
//             }, 0)
//           } else {
//             restoreOverlays(callback, elements)
//           }
//         }
//       }
//       function restoreFocus() {
//         if (window.localStorage.focus) {
//           setTimeout(function() {
//             window.Dom7(window.localStorage.focus).focus()
//           }, 0)
//         }
//       }
//       function rememberState() {
//         setTimeout(function() {
//           rememberViews()
//           rememberScroll()
//           rememberTab()
//           rememberOverlays()
//           rememberFormData()
//           rememberFocus()
//         }, 0)
//       }
//       function rememberViews() {
//         window
//           .Dom7(document)
//           .on('page:init page:reinit swipeback:beforechange', e => {
//             // Get view
//             let view =
//               e.type === 'swipeback:beforechange'
//                 ? e.target.f7View
//                 : e.detail.page.view
//             // Get urls
//             let urls = view.history
//               ? JSON.parse(JSON.stringify(view.history))
//               : []
//             // Remove url on back navigation
//             if (e.type !== 'page:init') urls.pop()
//             // Filter temporary pages
//             let urlsNew = []
//             urls.map(url => {
//               if (!/^\/?#content-/.test(url)) {
//                 if (url.substr(0, 1) === '/') url = url.substr(1)
//                 if (url.substr(url.length - 1) === '/')
//                   url = url.substr(0, url.length - 1)
//                 urlsNew.push(url)
//               }
//             })
//             // Save new history
//             window.localStorage['urls|' + view.selector] = JSON.stringify(
//               urlsNew
//             )
//           })
//       }
//       function rememberScroll() {
//         window.Dom7('.page-content').on('scroll', function(e) {
//           let storageKey =
//             'scroll|' +
//             getViewSel(e) +
//             '|' +
//             getViewUrl(e) +
//             (this.id !== '' ? '|' + this.id : '')
//           window.localStorage[storageKey] = this.scrollTop
//         })
//         window.Dom7(document).on('page:init', function(e) {
//           window
//             .Dom7(e.target)
//             .find('.page-content')
//             .on('scroll', function(e) {
//               let storageKey =
//                 'scroll|' +
//                 getViewSel(e) +
//                 '|' +
//                 getViewUrl(e) +
//                 (this.id !== '' ? '|' + this.id : '')
//               window.localStorage[storageKey] = this.scrollTop
//             })
//         })
//       }
//       function rememberTab() {
//         window.Dom7(document).on('tab:show', function(e) {
//           if (e.target.id !== '') {
//             window.localStorage['tab|' + getViewSel(e) + '|' + getViewUrl(e)] =
//               e.target.id
//           }
//         })
//       }
//       function rememberOverlays() {
//         window
//           .Dom7(document)
//           .on(
//             'panel:open panel:close actions:open actions:close loginscreen:open loginscreen:close picker:open picker:close popup:open popup:close',
//             function(e) {
//               // Get details
//               let type = e.type.split(':')[0]
//               let action = e.type.split(':')[1]
//               let id = e.target.id
//               if (id !== 'app-framework-login-popup') {
//                 let classes = e.target.className.split(' ')
//                 // Update local storage
//                 if (action === 'close') {
//                   window.localStorage.removeItem(type)
//                 } else if (type === 'panel') {
//                   window.localStorage.panel =
//                     classes.indexOf('panel-left') !== -1 ? 'left' : 'right'
//                 } else if (
//                   ['popup', 'loginscreen', 'picker', 'actions'].indexOf(
//                     type
//                   ) !== -1 &&
//                   id !== ''
//                 ) {
//                   window.localStorage[type] = '#' + id
//                 }
//               }
//             }
//           )
//       }
//       function rememberFormData() {
//         window.Dom7(document).on('keyup change', function(e) {
//           let formId = window
//             .Dom7(e.target)
//             .parents('form')
//             .attr('id')
//           if (formId !== null) {
//             window.localStorage['formInput|' + formId] = JSON.stringify(
//               window.f7.formToData('#' + formId)
//             )
//           }
//         })
//       }
//       function rememberFocus() {
//         window.Dom7(document).on('focusin focusout', function(e) {
//           if (e.type === 'focusout') {
//             window.localStorage.removeItem('focus')
//           } else {
//             let formId = window
//               .Dom7(e.target)
//               .parents('form')
//               .attr('id')
//             let inputName = window.Dom7(e.target).attr('name')
//             if (formId !== null && inputName !== null) {
//               let focusEl = 'form#' + formId + ' [name=' + inputName + ']'
//               window.localStorage.focus = focusEl
//             } else {
//               window.localStorage.removeItem('focus')
//             }
//           }
//         })
//       }
//       function getViewSel(el) {
//         el = window.Dom7(el.target || el).parents('.view')
//         return (
//           (el.attr('id') !== '' && el.attr('id') !== null
//             ? '#' + el.attr('id')
//             : '') +
//           (el.length > 0 && el[0].classList.length > 0
//             ? '.' + el[0].classList.value.replace(/ /g, '.')
//             : '')
//         )
//       }
//       function getViewUrl(el) {
//         let viewSel = getViewSel(el)
//         for (let v = 0; v < window.f7.views.length; v++) {
//           if (window.f7.views[v].selector === viewSel) {
//             let url = window.f7.views[v].url
//             if (url.substr(0, 1) === '/') url = url.substr(1)
//             if (url.substr(url.length - 1) === '/')
//               url = url.substr(0, url.length - 1)
//             return url
//           }
//         }
//       }
//       restoreState(() => {
//         rememberState()
//         setTimeout(() => {
//           this.stateReady = true
//         })
//       })
//     },
//   },
// }
import Vue from 'vue'
import Vuetify from 'vuetify'
// import 'vuetify/dist/vuetify.min.css' // Ensure you are using css-loader
// import 'material-design-icons-iconfont/dist/material-design-icons.css' // Ensure you are using css-loader
import VueRouter from 'vue-router'
import App from './App'
import store from './store'
import router from './router'
import locationService from './services/LocationService'
import './assets/vueify.styl'
import VueFirestore from 'vue-firestore'
import { EventBus } from './services/event-bus.js'

import './filter'
function createVue() {
  // Vue.use(locationService)
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
  Vue.use(VueFirestore)

  Vue.config.productionTip = false
  Vue.use(VueRouter)
  Vue.mixin(easierGlobalDataObject)
  Vue.mixin(easierFirebase)
  // if (config.restoreComponentData) {
  //   Vue.mixin(manageComponentData)
  // }

  let useMixins = Object.keys(mixins).map(mixin => mixins[mixin])

  router.beforeEach((to, from, next) => {
    var currentUser = null
    if (window.firebase) {
      currentUser = window.firebase.auth().currentUser
    }
    console.log(currentUser)
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
    if (requiresAuth && !currentUser) {
      next('/auth')
    } else if (requiresAuth && currentUser) {
      next()
    } else {
      next()
    }
  })

  new Vue({
    // el: '#app',
    store,
    router,
    template: '<App/>',
    mixins: useMixins,
    components: {
      App,
    },
  }).$mount('#app')
}
/* eslint-disable no-new */

initCordova(createVue())
