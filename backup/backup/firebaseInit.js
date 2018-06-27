import Firebase from 'firebase/app'

const firebaseApp = Firebase.initializeApp({
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
const firestore = firebaseApp.firestore()
const settings = { /* your settings... */ timestampsInSnapshots: true }
firestore.settings(settings)
// Export the database for components to use.
// If you want to get fancy, use mixins or provide / inject to avoid redundant imports.
export const firebase = firebaseApp
