<template>
  <div>

    <h4>List Hardwares</h4>

    <v-data-table
      :headers="headers"
      :items="hardwares"
      :pagination.sync="pagination"
      :total-items="totalNumberOfHardwares"
      :loading="loading"
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">
        <!-- <td>
          <v-checkbox v-model="props.selected" primary hide-details></v-checkbox>
        </td> -->

        <td>{{ props.item.asset_tag }}</td>
        <td class="text-xs-right">{{ props.item.category.name }}</td>
        <td class="text-xs-right">{{ props.item.model.name }}</td>
        <td class="text-xs-right">{{ props.item.status_label.name }}</td>
        <td class="text-xs-right">{{ props.item.location.name }}</td>
        <td v-if="props.item.assigned_to" class="text-xs-right">{{ props.item.assigned_to.name }}</td>
        <td v-else class="text-xs-right"> </td>

        <!-- <td class="text-xs-right">{{ props.item.location.name }}</td> -->
        <td class="justify-center layout px-0">
          <v-btn v-if="props.item.status_label.status_meta == 'deployable'" color="primary" small @click="checkHardware(props.item, 0)">
            CheckOut
          </v-btn>
          <v-btn v-if="props.item.status_label.status_meta != 'deployable'" color="secondary" small @click="checkHardware(props.item, 1)">
            CheckIn
          </v-btn>
          <v-btn :to="`hardware/${props.item.id}/edit`" flat icon color="light-blue darken-1">
            <v-icon>mode_edit</v-icon>
          </v-btn>

          <v-btn flat icon color="red darken-1" @click.native.stop="confirmDeleteHardware(props.item.id)">
            <v-icon>delete</v-icon>
          </v-btn>

        </td>
      </template>
    </v-data-table>

    <v-btn
      :to="{path: 'hardware/new'}"
      fab
      bottom
      right
      color="pink"
      dark
      fixed
    >
      <v-icon>add</v-icon>
    </v-btn>

    <v-dialog v-if="selectedHardware" v-model="deleteHardwareDialog" max-width="290" persistent>
      <v-card>
        <v-card-title class="headline">Delete Hardware</v-card-title>
        <v-card-text>Are you sure you want to delete this hardware? <strong>{{ selectedHardware.asset_tag }}</strong></v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="light-blue darken-1" flat @click="cancelDeleteHardware()">Cancel</v-btn>
          <v-btn color="red darken-1" flat @click="deleteHardware()">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </div>

</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
export default {
  data() {
    return {
      deleteHardwareDialog: false,
      pagination: {
        rowsPerPage: 5,
        page: 1,
      },
      headers: [
        // {
        //   visible: false,
        //   // text: 'id',
        //   value: 'id',
        //   sortable: false,
        // },
        {
          text: 'Asset',
          value: 'asset_tag',
          align: 'left',
        },
        {
          text: 'Category',
          align: 'right',
          value: 'category',
        },
        {
          text: 'Model',
          align: 'right',
          value: 'model',
        },
        {
          text: 'Status',
          align: 'right',
          value: 'status_label',
        },
        {
          text: 'Location',
          align: 'right',
          value: 'location',
        },
      ],
    }
  },
  computed: {
    //asdf
    ...mapGetters({
      hardwares: 'hardware/hardwares',
      totalNumberOfHardwares: 'hardware/totalNumberOfHardwares',
      loading: 'hardware/loading',
      selectedHardware: 'hardware/selectedHardware',
      user: 'common/user',
    }),
  },
  watch: {
    pagination: {
      handler(after, before) {
        this.updatePagination(after)
        let navigation = after.page - before.page
        if (after.rowsPerPage !== before.rowsPerPage) navigation = 0
        switch (navigation) {
          case 0:
            this.find()
            break
          case 1:
            this.findNext()
            break
          case -1:
            this.findPrevious()
            break
        }
      },
      deep: true,
    },
  },
  methods: {
    ...mapActions({
      find: 'hardware/find',
      findNext: 'hardware/findNext',
      findPrevious: 'hardware/findPrevious',
      selectHardware: 'hardware/selectHardware',
      delete: 'hardware/delete',
      update: 'hardware/update',
      showMessage: 'common/showMessage',
    }),
    ...mapMutations({
      updatePagination: 'hardware/UPDATE_PAGINATION_DATA',
    }),
    confirmDeleteHardware(hardwareId) {
      this.selectHardware(hardwareId)
      this.deleteHardwareDialog = true
    },
    checkHardware(hardware, type) {
      switch (type) {
        case 0: {
          /* eslint-disable-next-line */
          hardware.assigned_to = {
            uid: this.user.uid,
            name: this.user.displayName,
          }
          /* eslint-disable-next-line */
          hardware.status_label = {
            id: 2,
            name: 'Out',
            status_meta: 'checkedOut',
          }
          break
        }
        case 1: {
          /* eslint-disable-next-line */
          hardware.assigned_to = {
            id: '',
            name: '',
          }
          /* eslint-disable-next-line */
          hardware.status_label = {
            id: 1,
            name: 'Ready to Deploy',
            status_meta: 'deployable',
          }
          break
        }
        default: {
          //statements;
          break
        }
      }
      this.update(hardware).then(() => {
        this.showMessage({
          text: 'Hardware has been checkedout',
          icon: 'info_outline',
          color: 'green',
        })
      })
      this.pagination.page = 1
      this.find()
      // this.deleteHardwareDialog = false
      // this.delete(this.selectedHardware).then(() => {
      //   this.showMessage({
      //     text: 'Hardware has been deleted',
      //     icon: 'info_outline',
      //     color: 'green',
      //   })
      //   this.pagination.page = 1
      //   this.find()
      // })
    },
    deleteHardware() {
      this.deleteHardwareDialog = false
      this.delete(this.selectedHardware).then(() => {
        this.showMessage({
          text: 'Hardware has been deleted',
          icon: 'info_outline',
          color: 'green',
        })
        this.pagination.page = 1
        this.find()
      })
    },
    cancelDeleteHardware() {
      this.deleteHardwareDialog = false
    },
  },
}
</script>
