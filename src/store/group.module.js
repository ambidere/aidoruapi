import firebase from '../firebase'
import router from '../router'
import { objectToArray } from '../util'

const GROUP_HEADERS = [
  { text: 'Japanese Name', value: 'jpName', align: 'center', width: '150px' },
  { text: 'English Name', value: 'enName', align: 'center', width: '150px' },
  { text: 'Agency', value: 'agency', align: 'center', width: '150px' },
  { text: 'Label', value: 'label', align: 'center', width: '150px' },
  { text: 'Fanclub', value: 'fanclub', align: 'center', width: '150px' },
  { text: 'Years Active', value: 'yearsActive', align: 'center', width: '50px' },
  { text: 'Website', value: 'website', align: 'center', width: '25px' },
  { text: 'Twitter', value: 'twitter', align: 'center', width: '25px' },
  { text: 'Youtube', value: 'youtube', align: 'center', width: '25px' },
  { text: 'Actions', value: 'edit', align: 'center', width: '50px' }
]

const groups = {
  namespaced: true,
  state: {
    processingGroups: false,
    groups: [],
    groupForEdit: null,
    showDialog: false,
    headers: GROUP_HEADERS
  },
  getters: {
    groups: (state) => {
      return state.groups
    },
    groupForEdit: (state) => {
      return state.groupForEdit
    },
    processingGroups: (state) => {
      return state.processingGroups
    },
    headers: (state) => {
      return state.headers
    },
    showDialog: (state) => {
      return state.showDialog
    }
  },
  mutations: {
    groups (state, payload) {
      state.groups = objectToArray(payload.groups)
    },
    groupForEdit (state, payload) {
      state.groupForEdit = payload.group
    }
  },
  actions: {
    closeDialog ({ state }) {
      state.showDialog = false
      router.push('/manage/groups')
    },
    getGroups ({ commit, state }) {
      state.processingGroups = true
      firebase.database().ref('groups').once('value').then(function (snapshot) {
        //console.log(snapshot.val())
        state.processingGroups = false
        state.showDialog = true
        commit({
          type: 'groups',
          groups: snapshot.val()
        })
      })
    },
    addGroup ({ dispatch, state }, group) {
      state.processingGroups = true
      state.showDialog = false
      var newGroupKey = firebase.database().ref().child('groups').push().key
      var updates = {}
      var newGroup = group
      newGroup['timestamp'] = Date.now()
      updates['/groups/' + newGroupKey] = newGroup

      firebase.database().ref().update(updates, function (error) {
        if (error) {
          //console.error(error)
          state.processingGroups = false
        } else {
          //console.log('Addition Successful')
          dispatch('closeDialog')
          dispatch('getGroups')
          router.push('/manage/groups')
        }
      })
    },
    getGroup ({ commit, state }, group) {
      //console.log(group)
      state.processingGroups = true
      state.showDialog = false
      firebase.database().ref('groups/' + group).once('value').then(function (snapshot) {
        //console.log(snapshot.val())
        state.processingGroups = false
        state.showDialog = true
        commit({
          type: 'groupForEdit',
          group: snapshot.val()
        })
      })
    },
    editGroup ({ state }, payload) {
      state.processingGroups = true
      state.showDialog = false

      var updates = {}
      var newGroup = payload.group
      newGroup['timestamp'] = Date.now()
      updates['/groups/' + payload.groupId] = newGroup

      firebase.database().ref().update(updates, function (error) {
        if (error) {
          //console.error(error)
          state.processingGroups = false
        } else {
          //console.log('Update Successful')
          state.processingGroups = false
        }
      })
    },
    deleteGroup ({ dispatch, state }, groupId) {
      state.processingGroups = true
      var updates = {}
      updates['/groups/' + groupId] = null
      router.push('groups')
      dispatch('closeDialog')
      firebase.database().ref().update(updates, function (error) {
        if (error) {
          //console.error(error)
          state.processingGroups = false
        } else {
          //console.log('Delete Successful')
          dispatch('getGroups')
          state.processingGroups = false
        }
      })
    }
  }
}

export default groups
