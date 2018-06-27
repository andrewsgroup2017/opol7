
<template lang="html">
  <!-- <div id="firebaseui-auth-container"></div> -->
  <v-container fluid fill-heighy>
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
// import firebase from 'firebase'
// const firebase = require("firebase/app");
// require('firebase/auth')
// import firebaseui from "firebaseui";

export default {
  name: 'auth',
  data() {
    return {
      hidepw: true,
      password: 'asdfasdf',
      username: 'a@a.com',
    }
  },
  methods: {
    triggerSignIn() {
      var messageText = '1'
      var login = this.$funcs.httpsCallable('login')
      const vm = this
      login({ username: this.username, password: this.password }).then(function(
        result
      ) {
        // Read result of the Cloud Function.
        console.log(result)
        if (result.error) {
          console.log('ERROR RESPONSE: ' + result.message)
          return
        }
        if (result.data.body.token) {
          console.log(result.data.body.token)
          async function getUser(username, password) {
            // return (user = await firebase.auth().signInWithCustomToken(token))
            return firebase
              .auth()
              .signInWithEmailAndPassword(username, password)
              .catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code
                var errorMessage = error.message
                console.log(errorMessage)
                // ...
              })
          }
          // var user = firebase.auth().currentUser;
          var name, email, photoUrl, uid, emailVerified
          getUser(vm.username, vm.password).then(user => {
            // if (user != null) {
            //   console.log(user.user)
            //   console.log(user.user)
            //   user.user
            //     .updateProfile({
            //       displayName: 'Ash Downing',
            //       photoURL:
            //         'https://firebasestorage.googleapis.com/v0/b/opol7dev.appspot.com/o/profiles%2FpR0qGlp2PFhoPwEUCyCu81CKTjU2%2FpR0qGlp2PFhoPwEUCyCu81CKTjU2.jpg?alt=media&token=2ac77525-7c7e-4c40-ab0e-7a8a58d3c913',
            //     })
            //     .then(function() {
            //       // Update successful.
            //     })
            //     .catch(function(error) {
            //       // An error happened.
            //     })
            // }
          })
        } else {
          console.log('ERROR RESPONSE: ' + result.data.body.token)
        }
        // var sanitizedMessage = result.data.text
        // ...
      })
    },
  },
  mounted() {
    // const uiConfig = {
    //   signInSuccessUrl: "account",
    //   signInOptions: [firebase.auth.EmailAuthProvider.PROVIDER_ID],
    //   credentialHelper: firebaseui.auth.CredentialHelper.NONE
    // };
    // if (firebaseui.auth.AuthUI.getInstance()) {
    //   const ui = firebaseui.auth.AuthUI.getInstance();
    //   ui.start("#firebaseui-auth-container", uiConfig);
    // } else {
    //   const ui = new firebaseui.auth.AuthUI(firebase.auth());
    //   ui.start("#firebaseui-auth-container", uiConfig);
    // }
  },
}
</script>
