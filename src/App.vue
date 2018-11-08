<template>
  <v-app id="app" dark>
    <router-view></router-view>
  </v-app>
</template>

<script>
import store from './store'
import router from './router'
import { mapGetters } from 'vuex'

export default {
  name: 'App',
  store,
  router,
  computed: {
    ...mapGetters('accounts', [
      'loggedIn'
    ])
  },
  created: function () {
    store.dispatch('accounts/loadCurrentUser')
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  font-size: 12px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
