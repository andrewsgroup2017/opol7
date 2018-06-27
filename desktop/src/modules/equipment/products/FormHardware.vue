<!--<template>
  <div id="id">
    <h3>New Hardware</h3>
    <v-form v-model="valid">
      <v-text-field
        v-model="doc.name"
        :counter="10"
        label="Name"
        required
      ></v-text-field>
      <v-text-field
        v-model="doc.asset_tag"
        label="Asset Tag"
        required
      ></v-text-field>
      <v-select :items="[{ 'id': 1, 'name': 'Asus Zenpad Z8'}]" v-model="doc.model" label="Select" single-line></v-select>
      <v-text-field v-model="doc.serial" label="Serial Number" single-line>x</v-text-field>
      <v-select :items="[{'id': 1, 'name': 'Reaady to Deploy', 'status_meta': 'deployable'}]" v-model="doc.status_label" label="Select" single-line></v-select>
      <v-select :items="[{'id': 1, 'name': 'Tablets'}]" v-model="doc.category" label="Select" single-line></v-select>
      <v-select :items="['Verizon']" v-model="doc.supplier" label="Select" single-line></v-select>
      <v-text-field v-model="doc.notes" label="Notes" multi-line></v-text-field>
      <v-text-field v-model="doc.order_number" label="Order Number"></v-text-field>
      <v-text-field v-model="doc.image" label="Image Url"></v-text-field>
    </v-form>
  </div>
</template>-->

<template>
  <v-layout
    row

  >
    <!-- <v-flex xs12 sm6 offset-sm3> -->
    <v-flex
      xs12
      sm8
      offset-sm2>
      <v-form ref="form" v-model="valid" lazy-validation>

        <v-text-field
          v-model="product.title"
          :rules="titleRules"
          label="Title"
          required
        ></v-text-field>

        <v-text-field
          v-model="product.description"
          :rules="descriptionRules"
          label="Description"
          multi-line
          required
        ></v-text-field>

        <v-text-field
          v-model="product.shortDescription"
          :rules="shortDescriptionRules"
          label="Short description"
          required
        ></v-text-field>

        <v-text-field
          v-model="product.price"
          :rules="priceRules"
          label="Price"
          prefix="$"
          required
        ></v-text-field>

        <v-btn :disabled="!valid" color="primary" @click="submit">Save
          <v-icon dark right>check_circle</v-icon>
        </v-btn>

        <v-btn color="red" dark @click="clear">Cancel
          <v-icon dark right>block</v-icon>
        </v-btn>

      </v-form>
    </v-flex>
  </v-layout>
</template>
<script>
export default {
  props: {
    product: {
      type: Object,
      default: () => {
        return {
          title: '',
          description: '',
          shortDescription: '',
          price: '',
        }
      },
    },
  },
  data: () => ({
    valid: true,
    titleRules: [v => !!v || 'Title is required'],
    descriptionRules: [v => !!v || 'Description is required'],
    shortDescriptionRules: [v => !!v || 'Short description is required'],
    priceRules: [
      v => !!v || 'Price is required',
      v => !isNaN(v) || 'Price must be a number',
      v => parseFloat(v) < 10000000 || 'Price must lower than 10.000.000',
    ],
  }),
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.$emit('save', this.product)
      }
    },
    clear() {
      this.$emit('cancel')
    },
  },
}

// export default {
//   data: () => ({
//     valid: false,
//     name: '',
//     doc: {},
//   }),
//   created() {
//     this.doc = {
//       location: 'Flooring Store',
//       company: 'Andrews Group',
//       warranty_months: '12',
//       user_can_checkout: true,
//       available_actions: {
//         checkout: true,
//         checkin: true,
//         clone: true,
//         restore: false,
//         update: true,
//         delete: true,
//       },
//     }
//   },
//   methods: {
//     submitDocument() {
//       var setDoc = db
//         .collection('cities')
//         .doc('LA')
//         .set(data)
//     },
//   },
// }
</script>
