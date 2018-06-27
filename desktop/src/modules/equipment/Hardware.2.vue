<template>
  <div>
    <v-data-table :headers="headers" :items="items" v-model="selected" hide-actions class="elevation-1">
      <template slot="headers" slot-scope="props">
        <tr>
          <th v-for="header in props.headers" :key="header.text" :class="['column sortable', pagination.descending ? 'desc' : 'asc', header.value === pagination.sortBy ? 'active' : '']" @click="changeSort(header.value)">
            <v-icon small>arrow_upward</v-icon>
            {{ header.text }}
          </th>
        </tr>
      </template>
      <template slot="items" slot-scope="props">
        <tr :active="props.selected" @click="props.selected = !props.selected">
          <td>
            <v-checkbox v-model="props.selected" primary hide-details></v-checkbox>
          </td>

          <td>{{ props.item.asset_tag }}</td>
          <td class="text-xs-right">{{ props.item.category.name }}</td>
          <td class="text-xs-right">{{ props.item.model.name }}</td>
          <td class="text-xs-right">{{ props.item.status_label.name }}</td>

          <td v-if="props.item.assigned_to" class="text-xs-right">{{ props.item.assigned_to.name }}</td>
          <td v-else class="text-xs-right"> </td>

          <td class="text-xs-right">{{ props.item.location.name }}</td>
          <td class="justify-center layout px-0">
            <v-btn v-if="props.item.status_label.status_meta == 'deployable'" color="primary" small outline @click="checkOut(props.item, props.assigned_to)">
                            <!-- <v-icon color="success">edit</v-icon>
             -->CheckOut
            </v-btn>
            <v-btn v-if="props.item.status_label.status_meta != 'deployable'" color="warning" small outline @click="checkIn(props.item)">
              <!-- <v-icon color="warning">edit</v-icon> -->
              CheckIn
            </v-btn>

          </td>
        </tr>
      </template>
      <template slot="no-data">
        <v-progress-circular v-show="loading" :size="100" indeterminate color="primary" />
      </template>
    </v-data-table>
  </div>
</template>
<script>
import Vue from "vue"
// import { mapGetters } from "vuex"
export default {
  data: () => ({
    active: null,
    pagination: {
      sortBy: "name"
    },
    loading: false,
    overlay: "",
    selected: [],
    serverPagination: {
      page: 1
    },
    headers: [
      {
        visible: false,
        // text: 'id',
        value: "id",
        sortable: false
      },
      {
        text: "Asset",
        value: "asset_tag",
        align: "center"
      },
      {
        text: "Category",
        align: "right",
        value: "category"
      },
      {
        text: "Model",
        align: "right",
        value: "model"
      },
      {
        text: "Status",
        align: "right",
        value: "status_label"
      },
      {
        text: "Assigned To",
        align: "right",
        value: "assigned_to"
      },
      {
        text: "Location",
        align: "right",
        value: "location"
      },
      {
        text: "Actions",
        sortable: false,
        align: "center",
        value: "name"
      },
      {
        // text: 'asdf',
        visible: false,
        align: "right",
        sortable: false,
        value: "checky"
      }
    ]
  }),
  computed: {
    ...mapGetters("assets", {
      items: "getHardwareList"
    })
  },

  methods: {
    async checkIn(asset, assigned_to) {
      this.$store.dispatch("assets/checkInHardware", asset.id)
    },
    async checkOut(asset, assigned_to) {
      this.loading = true
      console.log(asset.id)
      console.log(this.$store.state.auth.user.snipeId)
      this.$store.dispatch("assets/checkOutHardware", {
        assetId: asset.id,
        userId: this.$store.state.auth.user.snipeId
      })
     this.$nextTick(function() {
      this.clocks = this.getClocks()
      this.loading = false
      })
    },
    toggleAll() {
      if (this.selected.length) this.selected = []
      else this.selected = this.items.slice()
    },
    changeSort(column) {
      if (this.pagination.sortBy === column) {
        this.pagination.descending = !this.pagination.descending
      } else {
        this.pagination.sortBy = column
        this.pagination.descending = false
      }
    }
  }
}
</script>
<style scoped>
