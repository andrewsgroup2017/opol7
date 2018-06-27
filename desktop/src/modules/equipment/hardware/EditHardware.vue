<template>
  <div>
    <h4>Edit Hardware</h4>
    <form-hardware :hardware="selectedHardware" @save="onSave($event)" @cancel="onCancel"></form-hardware>
  </div>
</template>

<script>
import FormHardware from './FormHardware'
import { mapGetters, mapActions } from 'vuex'
export default {
  components: {
    FormHardware,
  },

  data: () => ({}),
  computed: {
    ...mapGetters({
      selectedHardware: 'hardware/selectedHardware',
    }),
  },
  created() {
    this.selectHardware(this.$route.params.id)
  },
  methods: {
    ...mapActions({
      update: 'hardware/update',
      find: 'hardware/find',
      showMessage: 'common/showMessage',
      selectHardware: 'hardware/selectHardware',
    }),
    onSave(hardware) {
      this.update(hardware).then(() => {
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
