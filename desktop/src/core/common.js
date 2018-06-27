export const SHOW_MESSAGE = 'SHOW_MESSAGE'
export const SET_USER = 'SET_USER'
export const SET_ISLOGGEDIN = 'SET_ISLOGGEDIN'
// import firebase from './firebaseInit'
// import * as db from '../firebase'
import { fb, fs } from '../firebase'
// const firebase = db.fb
// import firebase from 'firebase'
// import Firebase from 'firebase/app'
// initial state
const state = {
  message: {
    visible: false,
    text: '',
    icon: '',
    color: '',
  },
  user: null,
  isLoggedIn: null,
}

// getters
const getters = {
  message: state => state.message,
  user: state => state.user,
  isLoggedIn: state => state.isLoggedIn,
}
const mutations = {
  [SHOW_MESSAGE](state, message) {
    /* eslint-disable-next-line */
    message.visible = true
    state.message = message
  },
  [SET_USER](state, user) {
    /* eslint-disable-next-line */
    state.user = user
  },
  [SET_ISLOGGEDIN](state, bool) {
    /* eslint-disable-next-line */
    state.isLoggedIn = bool
  },
}
// actions
function setupUser() {
  var user = fb.auth().currentUser

  user
    .updateProfile({
      displayName: 'Ash Downing',
      photoURL: 'https://groupandrews.com/profiles/pictures/1.jpg',
    })
    .then(function() {
      // Update successful.
      console.log(user.displayName)
    })
    .catch(function(error) {
      // An error happened.
      console.log(error)
    })
}

const actions = {
  showMessage({ commit }, message) {
    commit(SHOW_MESSAGE, message)
  },
  setUser({ commit }, user) {
    // fb.database()
    //   .ref('/.info/serverTimeOffset')
    //   .once('value')
    //   .then(
    //     function stv(data) {},
    //     function(err) {
    //       return err
    //     }
    //   )

    if (user) {
      commit(SET_ISLOGGEDIN, true)
      if (!user.displayName) {
        setupUser()
      }
      commit(SET_USER, user)
      var isOfflineForDatabase = {
        state: 'offline',
        last_changed: fb.database.ServerValue.TIMESTAMP,
      }

      var isOnlineForDatabase = {
        state: 'online',
        last_changed: fb.database.ServerValue.TIMESTAMP,
      }
      var userStatusFirestoreRef = fb.firestore().doc('/status/' + user.uid)
      var userStatusDatabaseRef = fb.database().ref('/status/' + user.uid)
      var isOfflineForFirestore = {
        state: 'offline',
        last_changed: fb.database.ServerValue.TIMESTAMP,
      }

      var isOnlineForFirestore = {
        state: 'online',
        last_changed: fb.database.ServerValue.TIMESTAMP,
      }
      fb.database()
        .ref('.info/connected')
        .on('value', function(snap) {
          if (snap.val() === true) {
            userStatusFirestoreRef.set(isOfflineForFirestore)
            return
          }
          userStatusDatabaseRef
            .onDisconnect()
            .set(isOfflineForDatabase)
            .then(function() {
              userStatusDatabaseRef.set(isOnlineForDatabase)
              userStatusFirestoreRef.set(isOnlineForFirestore)
            })
        })
    } else {
      commit(SET_ISLOGGEDIN, false)
      commit(SET_USER, user)
    }
  },
}

// mutations

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
