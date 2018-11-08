<template>
  <main class="group-main">
    GROUPS
    MEMBERS
  </main>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters('groups', [
      'groups'
    ])
  },
  created: function () {
    this.getGroups()
  },
  methods: {
    ...mapActions('groups', [
      'getGroups'
    ])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
