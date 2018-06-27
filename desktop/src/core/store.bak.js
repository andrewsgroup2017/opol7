export const SHOW_MESSAGE = 'SHOW_MESSAGE'
import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase/app'
// import { VuetronVuex } from 'vuetron'
import hardware from '../modules/equipment/hardware/hardware'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    hardware,
  },
  strict: false,
  state: {
    message: {
      visible: false,
      text: '',
      icon: '',
      color: '',
    },
    user: null,
    username: null,
    hardware: [],
    users: [],
    message: null,
    uid: null,
    // info: null,
    // student: null,
    // students: [],
    // classrooms: [],
    // assignments: [],
    // activeClassroom: null,
    // activeAssignment: null,
  },
  getters: {
    message: state => state.message,
    user: state => state.user,
    // classroom: state => {
    //   return state.classrooms.find(
    //     classroom => classroom.id === state.activeClassroom
    //   )
    // },
    // assignment: state => {
    //   return state.assignments.find(
    //     assignment => assignment.id === state.activeAssignment
    //   )
    // },
  },
  mutations: {
    [SHOW_MESSAGE](state, message) {
      /* eslint-disable-next-line */
      message.visible = true
      state.message = message
    },
    setUser: (state, user) => {
      if (user) {
        var isOnlineForDatabase = {
          state: 'online',
          username: user.displayName,
          last_changed: firebase.database.ServerValue.TIMESTAMP,
        }

        var isOnlineForFirestore = {
          state: 'online',
          username: user.displayName,
          last_changed: firebase.firestore.FieldValue.serverTimestamp(),
        }
        state.uid = user.uid
        state.username = user.displayName
        state.user = user
        var uid = state.uid

        var userStatusDatabaseRef = firebase.database().ref('/status/' + uid)
        var userStatusFirestoreRef = firebase.firestore().doc('/status/' + uid)
        userStatusFirestoreRef.set(isOnlineForFirestore)
        userStatusDatabaseRef.set(isOnlineForDatabase)
      } else {
        var isOfflineForDatabase = {
          state: 'offline',
          username: state.username,
          last_changed: firebase.database.ServerValue.TIMESTAMP,
        }

        var isOfflineForFirestore = {
          state: 'offline',
          username: state.username,
          last_changed: firebase.firestore.FieldValue.serverTimestamp(),
        }

        var uid = state.uid
        console.log(uid)
        if (!uid || uid == 'undefined') {
          return
        }
        var username = state.username
        console.log(username)
        if (!username || username == 'undefined') {
          return
        }
        var userStatusDatabaseRef = firebase.database().ref('/status/' + uid)
        var userStatusFirestoreRef = firebase.firestore().doc('/status/' + uid)
        userStatusFirestoreRef.set(isOfflineForFirestore)
        userStatusDatabaseRef.set(isOfflineForDatabase)
        state.user = null
        state.username = null
        state.uid = null
      }
    },
    setUsers: (state, users) => {
      state.users = users
    },
    // setActiveClassroom: (state, id) => {
    //   state.activeClassroom = id
    // },
    // setActiveAssignment: (state, id) => {
    //   state.activeAssignment = id
    // },
    // setStudent: (state, student) => {
    //   state.message = ''
    //   state.student = student
    // },
    // setClassrooms: (state, classrooms) => {
    //   state.classrooms = classrooms
    // },
    // setAssignments: (state, assignments) => {
    //   state.assignments = assignments
    // },
    // setStudents: (state, students) => {
    //   state.students = students
    // },
    // clearStudent: state => {
    //   state.student = null
    // },
    // setMessage: (state, message) => {
    //   state.message = message
    // },
    // setInfo: (state, info) => {
    //   state.info = info
    //   //timeout the view
    //   setTimeout(function() {
    //     state.info = ''
    //   }, 2000)
    // },
  },
  actions: {
    showMessage({ commit }, message) {
      commit(SHOW_MESSAGE, message)
    },
    // fetchClassrooms: ({ state, commit }) => {
    //   firebase
    //     .database()
    //     .ref('Classrooms')
    //     .orderByChild('TeacherId')
    //     .equalTo(state.user.uid)
    //     .once('value', function(data) {
    //       const obj = data.val()
    //       const classrooms = Object.keys(obj || {}).map(key => ({
    //         id: key,
    //         ClassName: obj[key].ClassName,
    //       }))
    //       commit('setClassrooms', classrooms)
    //     })
    // },
    fetchOnlineUsers({ commit }, classId) {
      firebase
        .firestore()
        .collection('status')
        .where('state', '==', 'online')
        .onSnapshot(function(snapshot) {
          console.log(snapshot)
        })
    },
    fetchHardware({ commit }, classId) {
      // firebase
      //   .firestore()
      //   .collection('status')
      //   .get()
      //   .then(querySnapshot => {
      //     querySnapshot.forEach(doc => {
      // var item =
      // {
      //   "id":1341,
      //   "name": doc.name,
      //   "asset_tag": doc.asset_tag,
      //   "serial": doc.serial,
      //   "model":{
      //   "id": doc.model.id,
      //   "name": doc.model.name
      //   },
      //   "model_number": doc.model_number,
      //   "eol":{
      //   "date": doc.eol.date,
      //   "formatted": doc.eol.formatted
      //   },
      //   "status_label":{
      //   "id": doc.status_label.id,
      //   "name": doc.status_label.name,
      //   "status_type": doc.status_label.status_type,
      //   "status_meta": doc.status_label.status_meta
      //   },
      //   "category":{
      //   "id": doc.category.id,
      //   "name": doc.category.name
      //   },
      //   "manufacturer":{
      //   "id": doc.manufacturer.id,
      //   "name": doc.manufacturer.name
      //   },
      //   "supplier":{
      //   "name": doc.supplier.name
      //   },
      //   "notes": doc.notes,
      //   "order_number": doc.order_number,
      //   "company": doc.company,
      //   "location":{
      //   "id": doc.location.id,
      //   "name": doc.location.name
      //   },
      //   "rtd_location":{
      //   "id": doc.rtd_location.id,
      //   "name": doc.rtd_location.name
      //   },
      //   "image": doc.image,
      //   "assigned_to": doc.assigned_to,
      //   "warranty_months": doc.warranty_months,
      //   "warranty_expires": doc.warranty_expires,
      //   "created_at":{
      //   "datetime": doc.created_at.datetime
      //   "formatted": doc.created_at.formatted
      //   },
      //   "updated_at":{
      //   "datetime": doc.updated_at.datetime,
      //   "formatted": doc.updated_at.formatted
      //   },
      //   "last_audit_date": doc.last_audit_date,
      //   "next_audit_date": doc.next_audit_date,
      //   "deleted_at": doc.deleted_at,
      //   "purchase_date":{
      //   "date": doc.purchase_date.date,
      //   "formatted": doc.purchase_date.formatted
      //   },
      //   "last_checkout": doc.last_checkout,
      //   "expected_checkin": doc.expected_checkin,
      //   "purchase_cost": doc.purchase_cost,
      //   "checkin_counter": doc.checkin_counter,
      //   "checkout_counter": doc.checkout_counter,
      //   "requests_counter": doc.requests_counter,
      //   "user_can_checkout": user_can_checkout,
      //   "available_actions":{
      //   "checkout": doc.available_actions.checkout,
      //   "checkin": doc.available_actions.checkin,
      //   "clone": doc.available_actions.clone,
      //   "restore": doc.available_actions.restore,
      //   "update": doc.available_actions.update,
      //   "delete": doc.available_actions.delete
      //   }
      // }
      // hardwareList.push(item)
      // })
      // commit('setHardware', hardwareList)
    },
  },
  fetchUsers({ commit }, classId) {
    firebase
      .firestore()
      .collection('status')
      .get()
      .then(querySnapshot => {
        var users = []
        querySnapshot.forEach(doc => {
          console.log(`${doc.id} => ${doc.data().username}`)
          var user = {
            username: doc.data().username,
            state: doc.data().state,
          }
          users.push(user)
        })
        commit('setUsers', users)
      })
  },
  // fetchStudents({ commit }, classId) {
  //   firebase
  //     .database()
  //     .ref('Classrooms/' + classId + '/Students')
  //     .on('value', function(data) {
  //       const obj = data.val()
  //       const students = Object.keys(obj || {}).map(key => ({
  //         id: key,
  //         StudentName: obj[key].DisplayName,
  //       }))
  //       commit('setStudents', students)
  //     })
  // },
  // fetchAssignments({ commit }, classId) {
  //   firebase
  //     .database()
  //     .ref('Assignments')
  //     .orderByChild('ClassId')
  //     .equalTo(classId)
  //     .once('value', function(data) {
  //       const obj = data.val()
  //       const assignments = Object.keys(obj || {}).map(key => ({
  //         id: key,
  //         Title: obj[key].Title,
  //         Text: obj[key].Text,
  //       }))
  //       commit('setAssignments', assignments)
  //     })
  // },
  // createClassroom({ dispatch }, payload) {
  //   return firebase
  //     .database()
  //     .ref('Classrooms')
  //     .push(payload)
  //     .then(data => {
  //       dispatch('fetchClassrooms')
  //     })
  // },
  // createAssignment({ dispatch }, payload) {
  //   return firebase
  //     .database()
  //     .ref('Assignments')
  //     .push(payload)
  //     .then(data => {
  //       dispatch('fetchAssignments', payload.ClassId)
  //     })
  // },
  // findUser({ commit }, payload) {
  //   return firebase
  //     .database()
  //     .ref('Users')
  //     .orderByChild('Email')
  //     .equalTo(payload.Email)
  //     .once('value', function(data) {
  //       if (data.val()) {
  //         const obj = data.val()
  //         const student = Object.keys(obj || {}).map(key => ({
  //           id: key,
  //           DisplayName: obj[key].DisplayName,
  //           Email: obj[key].Email,
  //         }))
  //         commit('setStudent', student[0])
  //       } else {
  //         commit('setMessage', "Sorry, we couldn't find this student")
  //       }
  //     })
  // },
  // updateUser({ dispatch }, payload) {
  //   return firebase
  //     .database()
  //     .ref('Users/' + payload.id)
  //     .update(payload)
  //     .then(data => {
  //       dispatch('fetchStudents')
  //     })
  // },
  // associateClassToStudent(context, payload) {
  //   return firebase
  //     .database()
  //     .ref('Users/' + payload.studentId + '/Classes/' + payload.classId)
  //     .update({
  //       ClassName: payload.className,
  //     })
  // },
  // associateStudentToClass({ commit, dispatch }, payload) {
  //   return firebase
  //     .database()
  //     .ref('Classrooms/' + payload.classId + '/Students/' + payload.studentId)
  //     .update({
  //       DisplayName: payload.studentName,
  //     })
  //     .then(commit('clearStudent'))
  //     .then(dispatch('fetchStudents', payload.classId))
  // },
  // addAssignmentToClass(context, payload) {
  //   return firebase
  //     .database()
  //     .ref('Classrooms/' + payload.classId + '/Assignments')
  //     .update({
  //       AssignmentName: payload.assignmentName,
  //       AssignmentContent: payload.assignmentContent,
  //     })
  // },
})
