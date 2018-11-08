import Vue from 'vue'
import Vuex from 'vuex'

import accounts from './account.module'
import groups from './group.module'
import members from './member.module'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    accounts: accounts,
    groups: groups,
    members: members
  }
})

export default store
