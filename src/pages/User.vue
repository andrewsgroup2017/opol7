<template>
  <v-app id="login" class="primary">
    <v-content>
      <v-container fluid fill-height>
        <v-layout v-show="!loading" align-center justify-center>
          <userprofile :user="user"></userprofile>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import UserProfile from '../components/UserProfile'
import { mapGetters } from 'vuex'

export default {
  name: 'User',
  components: {
    userprofile: UserProfile
  },
  data: () => ({
    loading: false,

  }),
  computed: {
    ...mapGetters({
      user: 'people/profile'
    }),
  },
  async created () {
    this.getTimeclockStatus()
  },
  methods: {


    async  getTimeclockStatus () {
      this.loading = true
      console.log(this.user.userUID)
      let clockedStatus = await this.axios.post('https://wt-4b2720bcf712029a2fa08942c7e9bd70-0.sandbox.auth0-extend.com/humanity', { id: this.user.userUID })
      console.log('cs ', clockedStatus)
      this.user.clockedIn = clockedStatus
      if (clockedStatus === 'out') {
        this.user.clockedIn = false
        this.loading = false
      } else {
        this.user.clockedIn = true
        this.loading = false

      }
    }
  },
}
</script>
<style scoped lang="css">
  #login {
    height: 50%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    content: "";
    z-index: 0;
  }
</style>
