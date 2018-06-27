import Vue from 'vue'
import App from './core/App'
import router from './core/routes'
import vuetify from './plugins/vuetify'
import store from './core/store'
import 'firebaseui/dist/firebaseui.css'
import Notifications from 'vue-notification'
import VueFirestore from 'vue-firestore'
import { fb } from './firebase'
Vue.use(VueFirestore)

Vue.use(Notifications)

Vue.config.productionTip = false

fb.auth().onAuthStateChanged(function(user) {
  store.dispatch('common/setUser', user)
  Vue.prototype.$user = user
  new Vue({
    el: '#app',
    store: store,
    fb,
    router,
    render: h => h(App),
  })
})
