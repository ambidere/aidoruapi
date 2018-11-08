<template>
  <div class="login">
    Aidoru API
    <form id="login-form" @submit.prevent="login(credentials)">
        <ul v-if="!errors.length == 0">
          The following errors occurred:
          <li v-for="(index, value) in errors" :key="index">{{value}}</li>
        </ul>
        <div class="input-panel">
            <label for="email">E-mail: </label>
            <input type="email" v-model="credentials.email" id="email"/>
        </div>
        <div class="input-panel">
            <label for="password">Password: </label>
            <input type="password" v-model="credentials.password" id="password"/>
        </div>
        <div class="input-panel">
          <input type="submit" value="Login"/>
        </div>
    </form>
  </div>
</template>

<script>

import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Login',
  data () {
    return {
      credentials: {
        email: null,
        password: null
      }
    }
  },
  computed: {
    ...mapGetters('accounts', [
      'errors'
    ])
  },
  methods: {
    ...mapActions('accounts', [
      'login'
    ])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
