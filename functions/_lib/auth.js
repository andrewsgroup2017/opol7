'use strict';

const functions = require('firebase-functions');
const cors = require('cors');
const express = require('express');

/* Express */
const app1 = express();
app1.get('*', (request, response) => {
  response.send('Hello from Express on Firebase!');
});

const api1 = functions.https.onRequest(app1);

/* Express with CORS */
const app2 = express();
app2.use(cors({ origin: true }));
app2.get('*', (request, response) => {
  response.send('Hello from Express on Firebase with CORS!');
});

const api2 = functions.https.onRequest(app2);

/* Express with CORS & automatic trailing '/' solution */
const app3 = express();
app3.use(cors({ origin: true }));
app3.get('*', (request, response) => {
  response.send("Hello from Express on Firebase with CORS! No trailing '/' required!");
});

// not as clean, but a better endpoint to consume
const api3 = functions.https.onRequest((request, response) => {
  if (!request.path) {
    request.url = `/${request.url}`; // prepend '/' to keep query params if any
  }
  return app3(request, response);
});

module.exports = {
  api1,
  api2,
  api3
  // 'use strict'

  // const functions = require('firebase-functions')
  // const admin = require('firebase-admin')
  // var serviceAccount = require('../opol7dev-firebase-adminsdk-d6b0s-8f229e4395.json')
  // admin.initializeApp({
  //   credential: admin.credential.cert(serviceAccount),
  //   databaseURL: 'https://opol7dev.firebaseio.com',
  // })
  // const firestore = admin.firestore()
  // exports.customLogin = functions.database
  //   .ref('/logs/{uid}')
  //   .onCreate((snapshot, context) => {
  //     return true
  //     // const original = snapshot.val()
  //     // console.log('Uppercasing', context.params.uid, original)
  //     // var item = {
  //     //   uid: context.params.user.uid,
  //     //   username: context.params.user.username,
  //     //   serial: context.params.serial,
  //     // }
  //     // console.log(item)
  //     // var item2 = {
  //     //   uid: 'user.uid',
  //     //   username: 'user.username',
  //     //   serial: 'serial',
  //     // }
  //     // return new Promise((resolve, reject) => {
  //     //   firestore
  //     //     .collection(`currentLoggedInUsers`)
  //     //     .add({
  //     //       item2,
  //     //     })
  //     //     .then(function(docRef) {
  //     //       console.log(' userList  ', docRef)
  //     //       return resolve(docRef)
  //     //     })
  //     //     .catch(function(error) {
  //     //       console.error('Error adding document: ', error)
  //     //       return reject(error)
  //     //     })
  //     //   // if(!userList) userList = []
  //     //   return reject(error)
  //     // })
  //   })

  // // exports.login = functions.https.onCall((data, context) => {

  // //     const handleError = (username, error) => {
  // //       console.error(
  // //         {
  // //           User: username,
  // //         },
  // //         error
  // //       )
  // //       return error
  // //     }
  // //     const handleResponse = (username, status, body) => {
  // //       console.log(
  // //         {
  // //           User: username,
  // //         },
  // //         {
  // //           Response: {
  // //             Status: status,
  // //             Body: body,
  // //           },
  // //         }
  // //       )
  // //       if (body) {
  // //         return { username: username, body: body }
  // //       }
  // //       return { username: username, status: status }
  // //     }
  // //     let username = ''
  // //     username = data.user.username
  // //     if (!username) {
  // //       return handleResponse(username, 400)
  // //     }
  // //     // const password = req.body.password
  // //     const serial = data.serial
  // //     if (!serial) {
  // //       return handleResponse(username, 400)
  // //     }
  // //     // TODO(DEVELOPER): In production you'll need to update the `authenticate` function so that it authenticates with your own credentials system.
  // //     return authenticate(data.user, serial)
  // //       .then(userList => {
  // //         if (!userList) {
  // //           return handleResponse(username, 401) // Invalid username/password
  // //         }
  // //         // On success return the Firebase Custom Auth Token.
  // //         //return admin.auth().createCustomToken(username)
  // //         return userList
  // //       })
  // //       .then(userList => {
  // //         return handleResponse(username, 200, {
  // //           userList: userList,
  // //         })
  // //       })
  // //       .catch(error => {
  // //         return handleError(username, error)
  // //       })
  // //     return null
  // //   })
  // //   /**
  // //    * Authenticate the provided credentials.
  // //    * TODO(DEVELOPER): In production you'll need to update this function so that it authenticates with your own credentials system.
  // //    * @returns {Promise<boolean>} success or failure.
  // //    */
  // //   function authenticate(user, serial) {
  // //     console.log(serial)
  // //     var item = {
  // //       uid: user.uid,
  // //       username: user.username,
  // //       serial: serial,
  // //     }
  // //     return new Promise((resolve, reject) => {
  // //       firestore
  // //         .collection(`currentLoggedInUsers`)
  // //         .add({
  // //           item,
  // //         })
  // //         .then(function(docRef) {
  // //           console.log(' userList  ', docRef)
  // //           return resolve(docRef)
  // //         })
  // //         .catch(function(error) {
  // //           console.error('Error adding document: ', error)
  // //           return reject(error)
  // //         })
  // //       // if(!userList) userList = []
  // //       return reject(error)
  // //     })
  // //   return new Promise((resolve, reject) => {
  // //     basicAuthRequest(authEndpoint, creds, (error, response, body) => {
  // //       if (error) {
  // //         return reject(error)
  // //       }
  // //       const statusCode = response ? response.statusCode : 0
  // //       if (statusCode === 401) {
  // //         // Invalid username/password
  // //         return resolve(false)
  // //       }
  // //       if (statusCode !== 200) {
  // //         return reject(
  // //           Error(
  // //             'invalid response returned from ',
  // //             authEndpoint,
  // //             ' status code ',
  // //             statusCode
  // //           )
  // //         )
  // //       }
  // //       return resolve(true)
  // //     })
  // //   })
  // // })

};