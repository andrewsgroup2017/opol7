// import * as db from '../../../core/firebaseInit'
import _ from 'lodash'
// import db from '../../../main'
import * as db from '../../../firebase'
export const RECEIVE_HARDWARES = 'RECEIVE_HARDWARES'
export const LOADING_HARDWARES = 'LOADING_HARDWARES'
export const SELECT_HARDWARES = 'SELECT_HARDWARES'
export const SET_TOTAL_NUMBER_OF_HARDWARES = 'SET_TOTAL_NUMBER_OF_HARDWARES'
export const SET_PAGINATION_FIRST_HARDWARES = 'SET_PAGINATION_FIRST_HARDWARES'
export const SET_PAGINATION_LAST_HARDWARES = 'SET_PAGINATION_LAST_HARDWARES'
export const UPDATE_PAGINATION_DATA = 'UPDATE_PAGINATION_DATA'
// initial state
// var hardwares = db.collection('hardwares')
// var stats = db.collection('stats')

const state = {
  loading: false,
  hardwares: {},
  totalNumberOfHardwares: 0,
  selectedHardware: undefined,
  pagination: {
    rowsPerPage: 5,
    page: 1,
    lastHardware: undefined,
    firstHardware: undefined,
  },
}

// getters
const getters = {
  hardwares: state => _.values(state.hardwares),
  totalNumberOfHardwares: state => state.totalNumberOfHardwares,
  loading: state => state.loading,
  selectedHardware: state => state.hardwares[state.selectedHardware],
}

// actions
const actions = {
  find(context) {
    let hardwaresQuery = db.hardwares
      .orderBy('asset_tag')
      .limit(context.state.pagination.rowsPerPage)
    findHardwares(context, hardwaresQuery)
  },

  findNext(context) {
    let hardwaresQuery = db.hardwares
      .orderBy('asset_tag')
      .limit(context.state.pagination.rowsPerPage)
      .startAfter(context.state.pagination.lastHardware)
    findHardwares(context, hardwaresQuery)
  },

  findPrevious(context) {
    let hardwaresQuery = db.hardwares
      .orderBy('asset_tag')
      .limit(context.state.pagination.rowsPerPage)
      .endBefore(context.state.pagination.firstHardware)
    // let hardwaresQuery = db.hardwares.orderBy('title').limit(context.state.pagination.rowsPerPage).endAt(context.state.pagination.lastHardware)
    findHardwares(context, hardwaresQuery)
  },

  selectHardware({ commit }, selectedHardware) {
    commit(SELECT_HARDWARES, selectedHardware)
  },

  insert({ commit, dispatch }, hardware) {
    return db.hardwares.add(hardware)
  },

  update({ commit, dispatch }, hardware) {
    return db.hardwares.doc(hardware.id).update({
      asset_tag: hardware.asset_tag,
      assigned_to: hardware.assigned_to,
      category: hardware.category,
      image: hardware.image,
      location: hardware.location,
      model: hardware.model,
      notes: hardware.notes,
      order_number: hardware.order_number,
      serial: hardware.serial,
      status_label: hardware.status_label,
      supplier: hardware.supplier,
    })
  },

  delete({ commit, dispatch }, hardware) {
    return db.hardwares.doc(hardware.id).delete()
  },
}

// mutations
const mutations = {
  [RECEIVE_HARDWARES](state, { hardwares }) {
    state.hardwares = hardwares
  },
  [SELECT_HARDWARES](state, selectedHardware) {
    state.selectedHardware = selectedHardware
  },
  [LOADING_HARDWARES](state, value) {
    state.loading = value
  },
  [SET_TOTAL_NUMBER_OF_HARDWARES](state, value) {
    state.totalNumberOfHardwares = value
  },
  [SET_PAGINATION_FIRST_HARDWARES](state, value) {
    state.pagination.firstHardware = value
  },
  [SET_PAGINATION_LAST_HARDWARES](state, value) {
    state.pagination.lastHardware = value
  },
  [UPDATE_PAGINATION_DATA](state, { rowsPerPage, page }) {
    state.pagination.rowsPerPage = rowsPerPage
    state.pagination.page = page
  },
}

// private helper functions
function getHardwaresFromSnapshot(snapshot) {
  let hardwares = {}
  snapshot.forEach(doc => {
    let hardware = doc.data()
    hardware.id = doc.id
    hardwares[hardware.id] = hardware
  })

  return hardwares
}

function findHardwares(context, hardwaresQuery) {
  let statsQuery = db.stats.doc('hardwares')

  context.commit(LOADING_HARDWARES, true)

  Promise.all([hardwaresQuery.get(), statsQuery.get()]).then(values => {
    console.log(values)
    let snapshotHardwares = values[0]
    let snapshotNumberOfHardwares = values[1]
    let hardwares = getHardwaresFromSnapshot(snapshotHardwares)
    setupPagination(context, snapshotHardwares, snapshotNumberOfHardwares)
    context.commit(RECEIVE_HARDWARES, { hardwares })
    context.commit(LOADING_HARDWARES, false)
  })
}

function setupPagination(
  context,
  snapshotHardwares,
  snapshotNumberOfHardwares
) {
  context.commit(SET_PAGINATION_FIRST_HARDWARES, snapshotHardwares.docs[0])
  context.commit(
    SET_PAGINATION_LAST_HARDWARES,
    snapshotHardwares.docs[snapshotHardwares.docs.length - 1]
  )
  context.commit(
    SET_TOTAL_NUMBER_OF_HARDWARES,
    snapshotNumberOfHardwares.data().count
  )
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
