<template>
  <v-container grid-list-md text-xs-center>
    <v-layout column>
      <v-flex xs1 offset-xs11>
        <v-btn color="secondary" @click="logOut">Logout</v-btn>
      </v-flex>

      <h1 text-xs-center>Welcome {{ user.displayName }}</h1>

      <v-flex xs12>
        <v-card tile color="tile" class="pa-4">
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-layout row>
              <v-text-field
                v-model="classroomName"
                :rules="classroomNameRules"
                :counter="20"
                label="Classroom Name"
                required
              />
              <v-btn :disabled="!valid"
                     class="secondary"
                     @click="submit"
              >
                create a classroom
              </v-btn>
            </v-layout>
          </v-form>
        </v-card>
      </v-flex>
    </v-layout>
    <h3 v-if="users.length" class="pa-4">Users</h3>


    <v-layout row wrap color="tile">
      <v-flex v-for="item in users"
              :key="item.id"
              xs4
      >
        <v-card class="pa-2 info-card" color="accent">

          <router-link :to="{
            name: 'UserHome',
            params: { id: item.id }
          }" class="white-link">
            <h3 class="white-link">{{ item.username }}</h3>
          </router-link>

        </v-card>

      </v-flex>
    </v-layout>
    <h3 v-if="classrooms.length" class="pa-4">My Classrooms</h3>


    <v-layout row wrap color="tile">
      <v-flex v-for="item in classrooms"
              :key="item.id"
              xs4
      >
        <v-card class="pa-2 info-card" color="accent">

          <router-link :to="{
            name: 'ClassroomHome',
            params: { id: item.id }
          }" class="white-link">
            <h3 class="white-link">{{ item.ClassName }}</h3>
          </router-link>

        </v-card>

      </v-flex>
    </v-layout>

  </v-container>
</template>

<script>
import firebase from 'firebase/app'
import { mapState, mapActions } from 'vuex'

export default {
  computed: {
    ...mapState(['user', 'classrooms', 'users']),
  },
  data: () => ({
    valid: true,
    item: {},
    classroomName: '',
    classroomNameRules: [
      v => !!v || 'Classroom name is required',
      v => v.length <= 20 || 'Name must be fewer than 20 characters',
    ],
  }),
  created() {
    this.fetchClassrooms().then(this.updateUser())
    this.fetchUsers()
  },
  methods: {
    ...mapActions(['fetchClassrooms', 'fetchUsers']),
    logOut() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.replace('Auth')
        })
    },
    updateUser() {
      this.$store.dispatch('updateUser', {
        Email: this.user.email,
        DisplayName: this.user.displayName,
        id: this.user.uid,
      })
    },
    submit() {
      this.$store
        .dispatch('createClassroom', {
          ClassName: this.classroomName,
          TeacherId: this.user.uid,
        })
        .then(() => {
          // clear the form
          this.classroomName = ''
        })
    },
  },
}
</script>
