const Presence = {
  // install(Vue) {
  //   try { Vue.fb.auth().currentUser.uid } catch{
  //     return
  //   }
  //   var uid = Vue.fb.auth().currentUser.uid
  //   console.log('hhi')
  //   var userStatusDatabaseRef = firebase.database().ref('/status/' + uid)
  //   var userStatusFirestoreRef = firebase.firestore().doc('/status/' + uid)
  //   var isOfflineForDatabase = {
  //     state: 'offline',
  //     last_changed: firebase.database.ServerValue.TIMESTAMP,
  //   }
  //   var isOnlineForDatabase = {
  //     state: 'online',
  //     last_changed: firebase.database.ServerValue.TIMESTAMP,
  //   }
  //   var isOfflineForFirestore = {
  //     state: 'offline',
  //     last_changed: firebase.firestore.FieldValue.serverTimestamp(),
  //   }
  //   var isOnlineForFirestore = {
  //     state: 'online',
  //     last_changed: firebase.firestore.FieldValue.serverTimestamp(),
  //   }
  //   firebase.database().ref('.info/connected').on('value', function (snapshot) {
  //     if (snapshot.val() == false) {
  //       console.log('out')
  //       userStatusFirestoreRef.set(isOfflineForFirestore)
  //       return
  //     }
  //     userStatusDatabaseRef.onDisconnect().set(isOfflineForDatabase).then(function () {
  //       console.log('in')
  //       userStatusDatabaseRef.set(isOnlineForDatabase)
  //       userStatusFirestoreRef.set(isOnlineForFirestore)
  //     })
  //   })
  //   // userStatusFirestoreRef.onSnapshot(function (doc) {
  //   //   var isOnline = doc.data().state == 'online';
  //   //   // ... use isOnline
  //   //   console.log(isOnline)
  //   // });
  //   // Vue.mixin({
  //   //   mounted() {
  //   //     console.log('Mounted!');
  //   //   }
  //   // })
  // }
}

export default Presence
