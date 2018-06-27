const functions = require('firebase-functions')
const cors = require('cors')
const express = require('express')

/* Express */
const app1 = express()
app1.get('*', (request, response) => {
  response.send('Hello from Express on Firebase!')
})

const api1 = functions.https.onRequest(app1)

/* Express with CORS */
const app2 = express()
app2.use(cors({ origin: true }))
app2.get('*', (request, response) => {
  response.send('Hello from Express on Firebase with CORS!')
})

const api2 = functions.https.onRequest(app2)

/* Express with CORS & automatic trailing '/' solution */
const app3 = express()
app3.use(cors({ origin: true }))
app3.get('*', (request, response) => {
  response.send(
    "Hello from Express on Firebase with CORS! No trailing '/' required!"
  )
})

// not as clean, but a better endpoint to consume
const api3 = functions.https.onRequest((request, response) => {
  if (!request.path) {
    request.url = `/${request.url}` // prepend '/' to keep query params if any
  }
  return app3(request, response)
})

module.exports = {
  api1,
  api2,
  api3,
}




exports.makeUppercase = functions.database.ref('/logs/{uid}/original')
    .onCreate((snapshot, context) => {
      // Grab the current value of what was written to the Realtime Database.
      const original = snapshot.val();
      console.log('Uppercasing', context.params.uid, original);
      const uppercase = original.toUpperCase();
      // You must return a Promise when performing asynchronous tasks inside a Functions such as
      // writing to the Firebase Realtime Database.
      // Setting an "uppercase" sibling in the Realtime Database returns a Promise.
      // return snapshot.ref.parent.child('uppercase').set(uppercase);
      return true
  });

