<!--<template>

  <v-container fluid grid-list-sm>
    <v-layout row wrap>
      <v-flex d-flex xs12>
        <v-layout column>
          <v-flex d-flex>
            <v-card color="tile" class="pa-4">
              <v-avatar :tile="true" size="100"><img src="../assets/images/logo.png"></v-avatar>
              <h1 title>{{ msg }}</h1>
              <h2>Perfectx your spoken language skills with EloCute, a web site for teachers with a companion mobile app for their students.</h2>
            </v-card>
          </v-flex>
        </v-layout>
      </v-flex>

      <v-flex d-flex xs12 sm6 child-flex>
        <v-card color="primary" tile class="pa-4">
          <h3 text-xs-center>I'm a Teacher</h3>
          <h4 text-xs-center>Access your account</h4>
          <v-btn large color="secondary" @click="auth">Login</v-btn>
        </v-card>
      </v-flex>
      <v-flex d-flex xs12 sm6>
        <v-card color="accent" tile class="pa-4">
          <h3 text-xs-center>I'm a Student</h3>
          <h4 text-xs-center>Download the mobile apps</h4>
          <v-btn color="secondary" large>iOS</v-btn>
          <v-btn color="secondary" large>Android</v-btn>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    name: 'EloCute',
    data() {
      return {
        msg: 'Welcome to EloCute'
      }
    },
    methods: {
      auth() {
        this.$router.push('/auth')
      }
    }
  }
</script>-->
<template lang="html">
  <v-content>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <div id="firebaseui-auth-container" class="mt5" />
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>
<script>
import firebase from 'firebase/app'
import firebaseui from 'firebaseui'
console.log(process.env.NODE_ENV)
export default {
  name: 'Auth',
  mounted() {
    const uiConfig = {
      signInSuccessUrl: 'profile',
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
