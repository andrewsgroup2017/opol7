
<template>
  <v-container mt-0>
    <button @click="$root.$signOut()">logout</button>
    <button @click="test">test</button>
    <v-layout row wrap v-for="_user in currentUsers" :key="_user.uid" class="mb-2">
      <v-flex xs12 sm10 md8 offset-sm1 offset-md2>
        <v-card class="info">
          <v-container fluid>
            <v-layout row>
              <v-flex xs7 sm8 md9>
                <v-card-title primary-title>
                  <div>
                    <h5 class="white--text mb-0">{{ _user.name }}</h5>

                  </div>
                </v-card-title>

              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
// import PostService from "../services/PostService";

export default {
  firestore() {
    return {
      currentUsers: this.$fireStore('currentUsers'),
    }
  },
  methods: {
    test() {
      console.log(user.uid)
      console.log(this.$root.timestamp)
      this.$fireDB('logs/' + user.uid).push({
        eventType: 'login',
        time: this.$root.timestamp,
      })
    },
    signOut() {
      window.firebase
        .auth()
        .signOut()
        .then(this.$router.replace('home'))
    },
  },
  created() {},
}
</script>
