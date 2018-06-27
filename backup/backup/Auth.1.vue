<template lang="html">
  <div>
    <div id="firebaseui-auth-container"/>
    <div id="history"/>
  </div>
</template>
<script>
import firebase from 'firebase/app'
import firebaseui from 'firebaseui'

function rtdb_presence() {
  console.log('1')
  // [START rtdb_presence]
  // Fetch the current user's ID from Firebase Authentication.
  var uid = firebase.auth().currentUser.uid

  // Create a reference to this user's specific status node.
  // This is where we will store data about being online/offline.
  var userStatusDatabaseRef = firebase.database().ref('/status/' + uid)

  // We'll create two constants which we will write to
  // the Realtime database when this device is offline
  // or online.
  var isOfflineForDatabase = {
    state: 'offline',
    last_changed: firebase.database.ServerValue.TIMESTAMP,
  }

  var isOnlineForDatabase = {
    state: 'online',
    last_changed: firebase.database.ServerValue.TIMESTAMP,
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
      console.log(' i think im online')

      // If we are currently connected, then use the 'onDisconnect()'
      // method to add a set which will only trigger once this
      // client has disconnected by closing the app,
      // losing internet, or any other means.
      userStatusDatabaseRef
        .onDisconnect()
        .set(isOfflineForDatabase)
        .then(function() {
          console.log(' i think im online')

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
}

function rtdb_and_local_fs_presence() {
  console.log('2')

  // [START rtdb_and_local_fs_presence]
  // [START_EXCLUDE]
  var uid = firebase.auth().currentUser.uid
  var userStatusDatabaseRef = firebase.database().ref('/status/' + uid)

  var isOfflineForDatabase = {
    state: 'offline',
    last_changed: firebase.database.ServerValue.TIMESTAMP,
  }

  var isOnlineForDatabase = {
    state: 'online',
    last_changed: firebase.database.ServerValue.TIMESTAMP,
  }

  // [END_EXCLUDE]
  var userStatusFirestoreRef = firebase.firestore().doc('/status/' + uid)
  console.log('usfr', userStatusFirestoreRef)
  // Firestore uses a different server timestamp value, so we'll
  // create two more constants for Firestore state.
  var isOfflineForFirestore = {
    state: 'offline',
    last_changed: firebase.firestore.FieldValue.serverTimestamp(),
  }

  var isOnlineForFirestore = {
    state: 'online',
    last_changed: firebase.firestore.FieldValue.serverTimestamp(),
  }

  firebase
    .database()
    .ref('.info/connected')
    .on('value', function(snapshot) {
      if (snapshot.val() == false) {
        console.log('setting offline')
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
          console.log('setting online')
          // We'll also add Firestore set here for when we come online.
          userStatusFirestoreRef.set(isOnlineForFirestore)
        })
    })
  // [END rtdb_and_local_fs_presence]
}

function fs_listen() {
  console.log('3')
  // [START fs_onsnapshot]
  userStatusFirestoreRef.onSnapshot(function(doc) {
    console.log('4', doc.data().state)
    var isOnline = doc.data().state == 'online'
    // ... use isOnline
  })
  // [END fs_onsnapshot]
}

function fs_listen_online() {
  console.log('5')
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
          history.innerHTML += msg + '<br />'
          // [END_EXCLUDE]
        }
        if (change.type === 'removed') {
          var msg = 'User ' + change.doc.id + ' is offline.'
          console.log(msg)
          // [START_EXCLUDE]
          history.innerHTML += msg + '<br />'
          // [END_EXCLUDE]
        }
      })
    })
  // [END fs_onsnapshot_online]
  firebase
    .firestore()
    .collection('status')
    .where('state', '==', 'offline')
    .onSnapshot(function(snapshot) {
      snapshot.docChanges().forEach(function(change) {
        console.log('howdy')
      })
    })
}

export default {
  name: 'Auth',
  mounted() {
    const uiConfig = {
      callbacks: {
        signInSuccessWithAuthResult: function(
          currentUser,
          credential,
          redirectUrl
        ) {
          rtdb_and_local_fs_presence()
          fs_listen_online()
          redirectUrl = `/home`
          return true
        },
      },
      signInSuccessUrl: 'home',
      signInOptions: [firebase.auth.EmailAuthProvider.PROVIDER_ID],
      credentialHelper: firebaseui.auth.CredentialHelper.NONE,
    }
    if (firebaseui.auth.AuthUI.getInstance()) {
      const ui = firebaseui.auth.AuthUI.getInstance()
      ui.start('#firebaseui-auth-container', uiConfig)
    } else {
      const ui = new firebaseui.auth.AuthUI(firebase.auth())
      ui.start('#firebaseui-auth-container', uiConfig)
    }
  },
}
</script>
