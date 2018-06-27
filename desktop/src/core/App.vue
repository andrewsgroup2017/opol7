<template>
  <v-app id="root" dark>
    <div v-if="isLoggedIn">
      <notifications position="bottom right" group="all" />
      <sidenav />
      <v-content>
        <router-view></router-view>
      </v-content>
      <v-snackbar
        :timeout="6000"
        :color="message.color"
        :bottom="true"
        v-model="message.visible"
      >
        <v-icon dark class="mr-2">{{ message.icon }}</v-icon>
        {{ message.text }}
        <v-btn dark flat @click.native="message.visible = false">
          <v-icon dark right>close</v-icon>
        </v-btn>
      </v-snackbar>
      <afooter />
    </div>
    <div v-else>
      <router-view></router-view>
    </div>
  </v-app>
</template>
  <script>
    import SideNav from "./layout/SideNav"
    //  import ComsPanel from "./layout/ComsPanel";
    import AFooter from "./layout/AFooter"
    import StatusWidget from "./layout/StatusWidget"
    import { mapGetters } from 'vuex'
    //remove
    export default {
    name: "App",
    components: {
    "sidenav": SideNav,
    "afooter": AFooter,
    "statuswidget": StatusWidget,
    // "comspanel": GuestLayout
    // "fab": Fab
    },
    data() {
    return {
    direction: "left",
    fab: false,
    fixed: true,
    fling: true,
    hover: true,
    tabs: null,
    top: false,
    right: true,
    bottom: true,
    left: false,
    transition: "slide-y-reverse-transition"
    }
    },
    computed: {
    ...mapGetters({
    message: 'common/message',
    user: 'common/user',
    isLoggedIn: 'common/isLoggedIn'
    }),

    },
    mounted () {
    console.log(this.isLoggedIn)
    },
    methods: {

    async logOutUser() {
    try {
    const data = await Auth.signOut()
    console.log(data)
    this.$store.dispatch("auth/end", null)
    // this.$store.dispatch("auth/setUser", null);
    // this.$store.dispatch("auth/setUserId", null);
    // this.$store.dispatch("profile/setProfile", null)
    // this.$store.dispatch('timeclocks/setClocks', null)
    this.$router.replace("/auth/signIn")
    } catch (err) {
    console.log(err)
    console.log(err)
    this.fireNotify(this.error)
    }
    },

    alert() {
    // alert('Clicked on alert icon');
    }
    }
    }
  </script>

  <style lang="stylus" scoped>
  .speed-dial--bottom:not(.speed-dial--absolute) {
    bottom: 40%;
    right: 5px;
  }

  .fab {
    bottom: 24px;
    right: 5px;
  }

  .vue-notification {
    padding: 10px;
    margin: 0 5px 5px;
    width: 100%;
    font-size: 14px;
    color: #ffffff;
    background: #44a4fc;
    border-left: 5px solid #187fe7;

    &.warn {
      background: #ffb648;
      border-left-color: #f48a06;
    }

    &.error {
      background: #e54d42;
      border-left-color: #b82e24;
    }

    &.success {
      background: #68cd86;
      border-left-color: #42a85f;
    }
  }

  .fab {
    bottom: 24px;
    right: 5px;
  }

  .v-container {
    background-color: #f8f8f8;
  }

  .app {
    font-size: 16px;
  }
</style>
