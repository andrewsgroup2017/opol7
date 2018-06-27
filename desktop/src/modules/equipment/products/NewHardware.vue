<template>
  <div>
    <h4>New Hardware</h4>
    <form-hardware @save="onSave($event)" @cancel="onCancel"></form-hardware>
  </div>
</template>

<script>
import FormHardware from './FormHardware'
import { mapActions } from 'vuex'
export default {
  components: {
    FormHardware,
  },
  data: () => ({}),
  methods: {
    ...mapActions({
      insert: 'hardware/insert',
      find: 'hardware/find',
      showMessage: 'common/showMessage',
    }),
    onSave(hardware) {
      this.insert(hardware).then(() => {
        this.showMessage({
          text: 'Hardware has been saved',
          icon: 'info_outline',
          color: 'green',
        })
        this.find()
        this.$router.push('/hardware')
      })
    },
    onCancel() {
      this.$router.go(-1)
    },
  },
}
</script>
