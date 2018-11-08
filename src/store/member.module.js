import _ from 'lodash'

import firebase from '../firebase'
import router from '../router'

import { objectToArray } from '../util'

const MEMBER_HEADERS = [
  { text: 'Japanese Name', value: 'jpName', align: 'center', width: '150px' },
  { text: 'English Name', value: 'enName', align: 'center', width: '150px' },
  { text: 'Group', value: 'group', align: 'center', width: '150px' },
  { text: 'Nickname', value: 'nickname', align: 'center', width: '150px' },
  { text: 'Birthdate', value: 'birthdate', align: 'center', width: '150px' },
  { text: 'Birthplace', value: 'birthplace', align: 'center', width: '150px' },
  { text: 'Actions', value: 'actions', align: 'center', width: '150px' }
]

const members = {
  namespaced: true,
  state: {
    members: [],
    groups: [],
    processingMembers: false,
    showDialog: false,
    headers: MEMBER_HEADERS
  },
  getters: {
    members: (state) => {
      return state.members
    },
    headers: (state) => {
      return state.headers
    },
    processingMembers: (state) => {
      return state.processingMembers
    },
    showDialog: (state) => {
      return state.showDialog
    },
    groupNames: (state) => {
      //console.log(state.groups)
      return _.map(state.groups, (group) => { return { name: group.enName, id: group.key } })
    }
  },
  mutations: {
    members: (state, payload) => {
      state.members = payload.members
    },
    groups: (state, payload) => {
      state.groups = payload.groups
    }
  },
  actions: {
    closeDialog ({ state }) {
      state.showDialog = false
      router.push('/manage/members')
    },
    addMember ({ dispatch, state }, member) {
      state.processingGroups = true
      state.showDialog = false

      let newMember = member
      let groupsOfMember = {}
      for (let group of member.group) {
        groupsOfMember[group] = true
      }
      newMember['group'] = groupsOfMember
      newMember['timestamp'] = Date.now()

      let newMemberKey = firebase.database().ref().child('members').push().key

      var updates = {}
      updates['/members/' + newMemberKey] = newMember
      firebase.database().ref().update(updates, function (error) {
        if (error) {
          //console.error(error)
          state.processingGroups = false
        } else {
          //console.log('Addition Successful')
          dispatch('closeDialog')
          dispatch('getMembers')
          router.push('/manage/members')
        }
      })
    },
    getMembers ({ commit, state }) {
      state.processingMembers = true
      firebase.database().ref('members').once('value').then(function (mSnapshot) {
        let membersData = objectToArray(mSnapshot.val())
        firebase.database().ref('groups').once('value').then(function (gSnapshot) {
          let groupsData = objectToArray(gSnapshot.val())
          for (let member of membersData) {
            let mappedGroups = []
            for (let groupKey in member.group) {
              let foundGroup = _.find(groupsData, (group) => { return group.key === groupKey })
              mappedGroups.push(foundGroup)
            }
            member.group = mappedGroups
          }
          state.processingMembers = false
          state.showDialog = true
          commit({ type: 'members', members: membersData })
          commit({ type: 'groups', groups: groupsData })
        })
      })
    }
  }
}

export default members
