<template>
  <div>
    <h4>Edit Product</h4>
    <form-hardware :product="selectedProduct" @save="onSave($event)" @cancel="onCancel"></form-hardware>
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
      selectedProduct: 'hardware/selectedProduct',
    }),
  },
  created() {
    this.selectProduct(this.$route.params.id)
  },
  methods: {
    ...mapActions({
      update: 'hardware/update',
      find: 'hardware/find',
      showMessage: 'common/showMessage',
      selectProduct: 'hardware/selectProduct',
    }),
    onSave(product) {
      this.update(product).then(() => {
        this.showMessage({
          text: 'Product has been saved',
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
