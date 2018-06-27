import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/firestore'

firebase.initializeApp({
  apiKey: 'AIzaSyD-BsWzPHYrXvuQsh0NeXF9u9T82JYzbQA',
  authDomain: 'opol6-dev.firebaseapp.com',
  databaseURL: 'https://opol6-dev.firebaseio.com',
  projectId: 'opol6-dev',
  storageBucket: 'opol6-dev.appspot.com',
  messagingSenderId: '258468941701',
})
console.log(firebase.database.ServerValue.TIMESTAMP)

// const firestore = firebase.firestore()
const settings = { timestampsInSnapshots: true }
firebase.firestore().settings(settings)

// export const products = firebaseApp.firestore().collection('products')
export const hardwares = firebase.firestore().collection('hardwares')
export const stats = firebase.firestore().collection('stats')

export const fb = firebase

// export const fs = firestore
