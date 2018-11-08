<template>
  <v-navigation-drawer permanent fixed app>
    <v-toolbar flat>
      <v-list>
        <v-list-tile>
          <v-list-tile-title class="title">
            Aidoru API
          </v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-toolbar>
    <v-divider></v-divider>
    <v-list dense>
      <router-link tag="v-list-tile" to="/manage">
        <v-list-tile-content>
          <v-list-tile-title>Dashboard</v-list-tile-title>
        </v-list-tile-content>
      </router-link>
      <router-link tag="v-list-tile" to="/manage/groups">
        <v-list-tile-content>
          <v-list-tile-title>Groups</v-list-tile-title>
        </v-list-tile-content>
      </router-link>
      <router-link tag="v-list-tile" to="/manage/members">
        <v-list-tile-content>
          <v-list-tile-title>Members</v-list-tile-title>
        </v-list-tile-content>
      </router-link>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Sidebar',
  methods: {
    ...mapActions('accounts', [
      'logout'
    ])
  }
}
</script>

<style scoped>
aside.sidebar {
  position: absolute;
  left: 0;
  width: 20%;
  height: 100%;
  background-color: #0f0f0f;
}

ul {
  list-style-type: none;
  padding-left: 0;
}

li a {
  color: #fff;
}

</style>
