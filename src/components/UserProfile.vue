<template>
  <v-card>
    <v-card-media :src="user.photoURL" height="300">
      <v-layout column class="media ma-0" v-show="!loading">
        <v-card-title>
          <div>
            <!-- <v-icon>chevron_left</v-icon> -->
          </div>
          <!-- <v-spacer></v-spacer> -->
          <!-- <v-btn dark icon class="mr-3">
            <v-icon>edit</v-icon>
          </v-btn> -->
          <v-spacer></v-spacer>
          <v-btn dark icon>
            <v-icon :color="user.clockedIn ? 'green' : 'orange'">schedule</v-icon>

          </v-btn>
        </v-card-title>
        <v-spacer></v-spacer>
        <v-card-title class="white--text pl-5 pt-5">
          <div class="display-1 pl-5 pt-5">{{user.name}}</div>
        </v-card-title>
      </v-layout>
    </v-card-media>
    <v-list two-line class="pa-0">
      <v-list-tile href="#">
        <v-list-tile-action>
          <v-icon color="indigo">phone</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>{{user.phone}}</v-list-tile-title>
          <v-list-tile-sub-title>Mobile</v-list-tile-sub-title>
        </v-list-tile-content>
        <v-list-tile-action>
          <v-icon>chat</v-icon>
        </v-list-tile-action>
      </v-list-tile>
      <!-- <v-list-tile href="#">
        <v-list-tile-action></v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>(903) 566-3068</v-list-tile-title>
          <v-list-tile-sub-title>Work</v-list-tile-sub-title>
        </v-list-tile-content>
        <v-list-tile-action>
          <v-icon>chat</v-icon>
        </v-list-tile-action>
      </v-list-tile> -->
      <v-divider inset></v-divider>
      <v-list-tile href="#">
        <v-list-tile-action>
          <v-icon color="indigo">mail</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>{{user.email}}</v-list-tile-title>
          <v-list-tile-sub-title>Work</v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile href="#">
        <v-list-tile-action>

          <v-btn v-if="!user.clockedIn" class="ml-4" block color="green" @click="clockIn()">Clock In</v-btn>
          <v-btn v-if="user.clockedIn" class="ml-4" block color="warning" @click="clockOut()">Clock Out</v-btn>

        </v-list-tile-action>
        <!-- <v-list-tile-action>
          <v-btn class="pa-3 " block color="primary" to="login">Add Member</v-btn>
        </v-list-tile-action> -->
      </v-list-tile>
      <!-- <v-divider inset></v-divider>
      <v-list-tile href="#">
        <v-list-tile-action>
          <v-icon color="indigo">location_on</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>1400 Main Street</v-list-tile-title>
          <v-list-tile-sub-title>Orlando, FL 79938</v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile> -->
    </v-list>
  </v-card>
</template>

<script>
export default {
  props: ['user'],
  data () {
    return {
      loading: false
    }
  },
  methods: {
    async clockIn () {
      console.log('clocking in ...')
      this.loading = true
      let itemclock_humanity = await this.axios.post('https://wt-4b2720bcf712029a2fa08942c7e9bd70-0.sandbox.auth0-extend.com/humanity_clockIn', { id: this.user.id })
      let itemclock = await this.$firestore.collection('timeclocks').add(itemclock_humanity)
      this.loading = false
      console.log('Document successfully updated!')
    },
    async  clockOut () {
      this.loading = true
      let otimeclock = await this.axios.post('https://wt-4b2720bcf712029a2fa08942c7e9bd70-0.sandbox.auth0-extend.com/humanity_clockIn', { id: this.user.id })
      console.log(otimeclock)
      let deviceInfo = window.localStorage.getItem('deviceInfo')
      let oclock = await this.$firestore.collection('users').doc(otimeclock).update({
        'location': { lat: deviceInfo.lat, lng: deviceInfo.lng },
        'fingerprint': deviceInfo.fingerprint,
        'out_servertime': this.$firestore.firestore.FieldValue.serverTimestamp(),
        'updatedAt': this.$firestore.firestore.FieldValue.serverTimestamp()
      })
      this.loading = false
      console.log('Document successfully updated!')


    },
  }
}
</script>
