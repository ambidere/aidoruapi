import firebase from '../firebase'
import router from '../router'

const accounts = {
  namespaced: true,
  state: {
    currentUser: null,
    loginErrors: []
  },
  getters: {
    loggedIn: (state) => {
      return state.currentUser != null
    },
    currentUser: (state) => {
      return state.currentUser
    },
    errors: (state) => {
      return state.loginErrors
    }
  },
  mutations: {
    login (state, payload) {
      if (payload.user) {
        state.currentUser = payload.user
        localStorage.setItem('user', JSON.stringify(payload.user))
      }
    },
    logout (state) {
      state.currentUser = null
      localStorage.removeItem('user')
    },
    loadCurrentUser (state) {
      let user = localStorage.getItem('user')
      state.currentUser = user != null ? JSON.parse(user) : user
    },
    addLoginErrors (state, payload) {
      state.loginErrors.push(payload.message)
    },
    clearLoginErrors (state) {
      state.loginErrors.length = 0
    }
  },
  actions: {
    login ({ commit }, credentials) {
      let emailAddress = credentials.email
      let password = credentials.password
      commit({type: 'clearLoginErrors'})
      firebase.auth().signInWithEmailAndPassword(emailAddress, password)
        .then(function (credential) {
          commit({
            type: 'login',
            user: credential.user
          })
          router.push('/')
        })
        .catch(function (error) {
          commit({type: 'addLoginErrors', message: error.message})
        })
    },
    logout ({ commit }) {
      commit({
        type: 'logout'
      })
      router.push('/login')
    },
    loadCurrentUser ({ commit }) {
      commit('loadCurrentUser')
    }
  }
}

export default accounts
