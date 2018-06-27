<template>
  <v-container grid-list-md text-xs-center>
    asfdsdfd
    <v-layout row wrap>
      <v-flex xs3>
        <!-- <a-photo-picker :defSrc="'/static/avatar.png'" :path="'avatars/' + userId" v-if="userId" /> -->
      </v-flex>
      <v-flex xs9>
        <a-simple-form v-if="userId" :path="'profiles/' + userId" :fields="fields" />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import SimpleForm from './SimpleForm'
// import PhotoPicker from "./PhotoPicker";

export default {
    name: 'Profile',
    components: {
        'a-simple-form': SimpleForm,
    // "a-photo-picker": PhotoPicker
    },
    data: function() {
        return {
            fields: [
                {
                    type: 'string',
                    name: 'firstName',
                    label: 'FirstName'
                },
                {
                    type: 'string',
                    name: 'lastName',
                    label: 'LastName'
                },
                {
                    type: 'lineBreak'
                },
                {
                    type: 'string',
                    name: 'nickname',
                    label: 'Nickname'
                }
            ]
        }
    },
    computed: {
        user: function() {
            return this.$store.state.auth.user
        },
        userId: function() {
            return this.$store.state.auth.user.username
        }
    }
}
</script>
<style scoped>
</style>
