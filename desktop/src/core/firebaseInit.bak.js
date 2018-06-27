import Firebase from 'firebase/app'
// import 'firebase/firestore'

const firebaseApp = Firebase.initializeApp({
  // apiKey: 'AIzaSyCZ0gFo1BUNmjgK4WcEWT1lANWFVAJCy-w',
  // authDomain: 'vue-commerce.firebaseapp.com',
  // databaseURL: 'https://vue-commerce.firebaseio.com',
  // projectId: 'vue-commerce',
  // storageBucket: 'vue-commerce.appspot.com',
  // messagingSenderId: '535877719979',
  // const config = {
  apiKey: 'AIzaSyD-BsWzPHYrXvuQsh0NeXF9u9T82JYzbQA',
  authDomain: 'opol6-dev.firebaseapp.com',
  databaseURL: 'https://opol6-dev.firebaseio.com',
  projectId: 'opol6-dev',
  storageBucket: 'opol6-dev.appspot.com',
  messagingSenderId: '258468941701',
  //   };
  //   firebase.initializeApp(config);
})
const _firestore = firebaseApp.firestore()
const settings = { /* your settings... */ timestampsInSnapshots: true }
_firestore.settings(settings)
// Export the database for components to use.
// If you want to get fancy, use mixins or provide / inject to avoid redundant imports.
export default firebaseApp
// export const firestore = _firestore
// export const products = firebase.firestore().collection('products')
// export const stats = firebase.firestore().collection('stats')
// export const status = firebase.firestore().collection('status')
