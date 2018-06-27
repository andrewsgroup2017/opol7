<template>
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
</template>
<script>
export default {
  data: () => ({
    valid: false,
    name: '',
    doc: {},
  }),
  created() {
    this.doc = {
      location: 'Flooring Store',
      company: 'Andrews Group',
      warranty_months: '12',
      user_can_checkout: true,
      available_actions: {
        checkout: true,
        checkin: true,
        clone: true,
        restore: false,
        update: true,
        delete: true,
      },
    }
  },
  methods: {
    submitDocument() {
      var setDoc = db
        .collection('cities')
        .doc('LA')
        .set(data)
    },
  },
}
</script>
