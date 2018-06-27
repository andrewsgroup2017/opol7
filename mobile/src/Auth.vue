
import { isThisQuarter } from 'date-fns';
<template lang="html">
  <!-- <div id="firebaseui-auth-container"></div> -->
  <v-container fluid fill-height v-if="!$user">
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar  color="primary" dark>
                <v-toolbar-title>Login</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-tooltip bottom>
                  <v-btn
                    icon
                    large
                    target="_blank"
                    slot="activator"
                  >
                    <v-icon large>code</v-icon>
                  </v-btn>
                  <span>Source</span>
                </v-tooltip>
                <!-- <span>{{version}}</span> -->
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field prepend-icon="person" name="login" v-model="username" label="Login" type="text"></v-text-field>
                  <v-text-field prepend-icon="lock" name="password" label="Password" id="password" v-model="password" :append-icon="hidepw ? 'visibility' : 'visibility_off'" :append-icon-cb="() => (hidepw = !hidepw)" :type="hidepw ? 'password' : 'text'"hint="At least 6 characters" required></v-text-field>
                </v-form>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
              <v-btn color="primary" v-on:click="triggerSignIn">
                        Log In
                      </v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
</template>
<script>
import { EventBus } from './services/event-bus.js'

export default {
  name: 'auth',
  data() {
    return {
      hidepw: true,
      password: 'asdfasdf',
      username: 'a@a.com',
    }
  },
  firestore() {
    return {
      currentUsers: this.$fireStore().collection('currentUsers'),
    }
  },
  computed: {
    firebaseConfig: function() {
      return process.env.NODE_ENV === 'production'
        ? this.$root.config.firebase
        : this.$root.config.devFirebase
    },
  },
  methods: {
    triggerSignIn() {
      var vm = this
      firebase
        .auth()
        .signInWithEmailAndPassword(vm.username, vm.password)
        .then(function() {
          vm.rtdb_and_local_fs_presence()
          vm.fs_listen_online()
        })
        .catch(function(err) {
          console.warn(err)
          console.warn(
            'Please enable Anonymous Authentication in your Firebase project!'
          )
        })
      // async function getUser(n, p) {
      //   return firebase
      //     .auth()
      //     .signInWithEmailAndPassword(n, p)
      //     .catch(function(error) {
      //       var errorCode = error.code
      //       var errorMessage = error.message
      //       console.log(errorMessage)
      //     })
      // }
      // const n = this.username
      // const p = this.password
      // getUser(n, p).then(user => {
      //   //this.$fireDB('logs/' + user.email).push({ eventType: 'login' })

      //   // var login = this.$funcs.httpsCallable('login')
      //   // var device_serial = 'desktop'
      //   // if (this.appMode == 'native') {
      //   //   device_serial = window.localStorage.getItem(device_serial)
      //   // }

      //   // login({ user: user, serial: device_serial }).then(function(result) {
      //   //   console.log(result)

      //   // this.$router.replace('home')

      //   //   if (result.error) {
      //   //     console.log('ERROR RESPONSE: ' + result.message)
      //   //     return
      //   //   }
      //   // })
      // })
    },
    handleSignOut() {
      firebase
        .auth()
        .signOut()
        .then(function() {
          EventBus.$emit('auth-logout', user)
        })
        .catch(function(error) {
          EventBus.$emit('auth-logout', error)
        })
    },

    rtdb_presence() {
      // [START rtdb_presence]
      // Fetch the current user's ID from Firebase Authentication.
      var uid = this.$root.firebase.auth().currentUser.uid

      // Create a reference to this user's specific status node.
      // This is where we will store data about being online/offline.
      var userStatusDatabaseRef = firebase.database().ref('/status/' + uid)

      // We'll create two constants which we will write to
      // the Realtime database when this device is offline
      // or online.
      var isOfflineForDatabase = {
        state: 'offline',
        last_changed: this.$root.timestamp,
      }

      var isOnlineForDatabase = {
        state: 'online',
        last_changed: this.$root.timestamp,
      }

      // Create a reference to the special '.info/connected' path in
      // Realtime Database. This path returns `true` when connected
      // and `false` when disconnected.
      firebase
        .database()
        .ref('.info/connected')
        .on('value', function(snapshot) {
          // If we're not currently connected, don't do anything.
          if (snapshot.val() == false) {
            return
          }

          // If we are currently connected, then use the 'onDisconnect()'
          // method to add a set which will only trigger once this
          // client has disconnected by closing the app,
          // losing internet, or any other means.
          userStatusDatabaseRef
            .onDisconnect()
            .set(isOfflineForDatabase)
            .then(function() {
              // The promise returned from .onDisconnect().set() will
              // resolve as soon as the server acknowledges the onDisconnect()
              // request, NOT once we've actually disconnected:
              // https://firebase.google.com/docs/reference/js/firebase.database.OnDisconnect

              // We can now safely set ourselves as 'online' knowing that the
              // server will mark us as offline once we lose connection.
              userStatusDatabaseRef.set(isOnlineForDatabase)
            })
        })
      // [END rtdb_presence]
    },

    rtdb_and_local_fs_presence() {
      // [START rtdb_and_local_fs_presence]
      // [START_EXCLUDE]
      var uid = firebase.auth().currentUser.uid
      var userStatusDatabaseRef = firebase.database().ref('/status/' + uid)
      console.log(this.$root.$db)
      var isOfflineForDatabase = {
        state: 'offline',
        last_changed: this.$root.timestamp,
      }

      var isOnlineForDatabase = {
        state: 'online',
        last_changed: this.$root.timestamp,
      }

      // [END_EXCLUDE]
      var userStatusFirestoreRef = firebase.firestore().doc('/status/' + uid)

      // Firestore uses a different server timestamp value, so we'll
      // create two more constants for Firestore state.
      var isOfflineForFirestore = {
        state: 'offline',
        last_changed: this.$root.timestamp,
      }

      var isOnlineForFirestore = {
        state: 'online',
        last_changed: this.$root.timestamp,
      }

      firebase
        .database()
        .ref('.info/connected')
        .on('value', function(snapshot) {
          if (snapshot.val() == false) {
            // Instead of simply returning, we'll also set Firestore's state
            // to 'offline'. This ensures that our Firestore cache is aware
            // of the switch to 'offline.'
            userStatusFirestoreRef.set(isOfflineForFirestore)
            return
          }

          userStatusDatabaseRef
            .onDisconnect()
            .set(isOfflineForDatabase)
            .then(function() {
              userStatusDatabaseRef.set(isOnlineForDatabase)

              // We'll also add Firestore set here for when we come online.
              userStatusFirestoreRef.set(isOnlineForFirestore)
            })
        })
      // [END rtdb_and_local_fs_presence]
    },
    fs_listen() {
      // [START fs_onsnapshot]
      userStatusFirestoreRef.onSnapshot(function(doc) {
        var isOnline = doc.data().state == 'online'
        // ... use isOnline
      })
      // [END fs_onsnapshot]
    },
    fs_listen_online() {
      var history = document.querySelector('#history')
      // [START fs_onsnapshot_online]
      firebase
        .firestore()
        .collection('status')
        .where('state', '==', 'online')
        .onSnapshot(function(snapshot) {
          snapshot.docChanges().forEach(function(change) {
            if (change.type === 'added') {
              var msg = 'User ' + change.doc.id + ' is online.'
              console.log(msg)
              // [START_EXCLUDE]
              // history.innerHTML += msg + '<br />'
              // [END_EXCLUDE]
            }
            if (change.type === 'removed') {
              var msg = 'User ' + change.doc.id + ' is offline.'
              console.log(msg)
              // [START_EXCLUDE]
              // history.innerHTML += msg + '<br />'
              // [END_EXCLUDE]
            }
          })
        })
      // [END fs_onsnapshot_online]
    },
  },

  created() {
    console.log(this.$fireStore)
    this.mode = this.$root.user ? 'signOut' : 'signIn'
    this.$root.$signOut = this.handleSignOut
    // this.user = this.$user
    if (this.$user) {
      this.$router.replace('home')
    }
    // console.log(this.$user)

    EventBus.$on('auth-login', user => {
      console.log('got login for ', user)
      var _device_serial = 'desktop'
      if (this.appMode == 'native') {
        console.log('we are native')
        _device_serial = window.localStorage.getItem('device_serial')
      }
      console.log('with device ', _device_serial)

      this.$fireDB('logs').push({
        event: {
          eventType: 'auth-login',
          device_serial: _device_serial,
          user: user.uid,
        },
      })
    })
    EventBus.$on('auth-logout', user => {
      console.log('got logout for ', user)
      var _device_serial = 'desktop'
      if (this.appMode == 'native') {
        _device_serial = window.localStorage.getItem('device_serial')
      }
      console.log('with device ', _device_serial)
      if (user) {
        this.$fireDB('logs').push({
          event: {
            eventType: 'auth-logout',
            device_serial: _device_serial,
            user: user.uid,
          },
        })
      } else {
        this.$fireDB('logs').push({
          event: {
            eventType: 'auth-login',
            device_serial: _device_serial,
            user: 'unknown',
          },
        })
      }
    })
  },
}
</script>
