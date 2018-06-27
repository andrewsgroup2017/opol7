<template>
  <v-layout justify-center>
    <v-flex>
      <v-card ref="form">
        <v-card-text>
          <v-text-field ref="firstName" :disabled="disabled" v-model="profile.firstName" :rules="[() => !!profile.firstName || 'This field is required']"
                        :error-messages="errorMessages" label="First Name" placeholder="Ash" required></v-text-field>
          <v-text-field ref="lastName" :disabled="disabled" v-model="profile.lastName" :rules="[() => !!profile.lastName || 'This field is required']"
                        :error-messages="errorMessages" label="Downing" placeholder="Snowy Rock Pl" required></v-text-field>
          <v-text-field ref="address" :disabled="disabled" :rules="[
            () => !!profile.address || 'This field is required',
            () => !!profile.address && profile.address.length <= 25 || 'Address must be less than 25 characters',
            addressCheck
          ]" v-model="profile.address" label="Address Line" placeholder="123 Story ln" counter="25" required></v-text-field>
          <v-text-field ref="city" :disabled="disabled" :rules="[() => !!profile.city || 'This field is required', addressCheck]" v-model="profile.city"
                        label="City" placeholder="Tyler" required></v-text-field>
          <v-text-field ref="state" :disabled="disabled" v-model="profile.state" :rules="[() => !!profile.state || 'This field is required']"
                        label="State/Province/Region" required placeholder="TX"></v-text-field>
          <v-text-field ref="zip" :disabled="disabled" :rules="[() => !!profile.zip || 'This field is required']" v-model="profile.zip"
                        label="ZIP / Postal Code" required placeholder="75701"></v-text-field>
        </v-card-text>
        <v-divider class="mt-5"></v-divider>
        <v-card-actions>

          <v-spacer></v-spacer>
          <v-slide-x-reverse-transition>
            <v-tooltip v-if="formHasErrors" left>
              <v-btn slot="activator" icon class="my-0" @click="resetForm">
                <v-icon>refresh</v-icon>
              </v-btn>
              <span>Refresh form</span>
            </v-tooltip>
          </v-slide-x-reverse-transition>
          <v-btn v-if="disabled" color="primary" flat @click="changedDisabled()">Edit</v-btn>
          <v-btn v-if="!disabled" flat @click="changedDisabled()">Cancel</v-btn>
          <v-btn v-if="!disabled" color="primary" flat @click="save">Submit</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>

</template>

<script>
// import { Storage } from 'aws-amplify'
export default {
  name: 'SimpleForm',
  props: {
    path: {
      type: String,
      default: null,
    },
    fields: {
      type: Object,
      default: null,
    },
  },
  // props: [ 'path', 'fields' ],
  data: function() {
    return {
      disabled: true,
      profile: {},
      formHasErrors: false,
      errorMessages: [],
    }
  },
  computed: {
    userId: function() {
      return this.$store.state.auth.user.username
    },
  },

  created: function() {
    console.debug('simple form created...')
    this.load()
  },
  methods: {
    changedDisabled: function() {
      this.disabled = !this.disabled
    },
    addressCheck: function() {
      this.errorMessages =
        this.address && !this.name ? ["Hey! I'm required"] : []

      return true
    },
    resetForm: function() {
      this.errorMessages = []
      this.formHasErrors = false

      Object.keys(this.form).forEach(f => {
        this.$refs[f].reset()
      })
    },
    load: function() {
      Storage.get(this.path, {
        download: true,
      })
        .then(data => {
          const body = data.Body.toString('utf8')
          this.profile = JSON.parse(body)
        })
        .catch(err => {
          return console.error(err)
        })
    },
    save: function() {
      if (!this.userId) {
        return
      }
      const data = JSON.stringify(this.profile)
      Storage.put(this.path, data, {
        contentType: 'application/json',
      })
        .then(data => {
          return console.debug(data)
        })
        .catch(err => {
          return console.error(err)
        })
    },
  },
}
</script>
