<template>
  <v-flex xs12>
    <v-data-table
      :headers="headers"
      :items="groups"
      hide-actions
      :loading="processingGroups"
      class="elevation-1"
    >
      <v-progress-linear slot="progress" color="red" indeterminate></v-progress-linear>
      <template slot="headerCell" slot-scope="props">
        <v-tooltip bottom>
          <span slot="activator">
            {{ props.header.text }}
          </span>
          <span>
            {{ props.header.text }}
          </span>
        </v-tooltip>
      </template>
      <template slot="items" slot-scope="props">
        <td class="text-xs-right">{{ props.item.jpName }}</td>
        <td class="text-xs-right">{{ props.item.enName }}</td>
        <td class="text-xs-right">{{ props.item.agency }}</td>
        <td class="text-xs-right">{{ props.item.label }}</td>
        <td class="text-xs-right">
          <a :href="props.item.fanclubWebsite !== 'N/A' ? props.item.fanclubWebsite : ''" target="_blank">
            {{ props.item.fanclub !== 'N/A' ? props.item.fanclub : 'N/A' }}
          </a>
        </td>
        <td class="text-xs-right">{{ props.item.yearsActive }}</td>
        <td>
          <a :href="props.item.website" target="_blank">
            <v-icon
            >
            fas fa-link
            </v-icon>
          </a>
        </td>
        <td>
          <a :href="props.item.twitter" target="_blank">
            <v-icon
            >
            fab fa-twitter
            </v-icon>
          </a>
        </td>
        <td>
          <a :href="props.item.youtube" target="_blank">
            <v-icon
            >
            fab fa-youtube
            </v-icon>
          </a>
        </td>
        <td class="justify-center layout px-0">
          <v-icon
            @click="editGroup(props.item.key)"
          >
            edit
          </v-icon>
          <v-icon
            @click="deleteGroup(props.item.key)"
          >
            delete
          </v-icon>
        </td>
      </template>
      <template slot="footer">
        <td colspan="100%">
          <v-btn small color="primary" @click="addGroup">
            <v-icon>
              add
            </v-icon>
            Add Group
          </v-btn>
        </td>
      </template>
    </v-data-table>
    <router-view></router-view>
  </v-flex>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import router from '../../../router'

export default {
  name: 'GroupMain',
  computed: {
    ...mapGetters('groups', [
      'groups',
      'headers',
      'processingGroups'
    ])
  },
  created: function () {
    this.getGroups()
  },
  methods: {
    ...mapActions('groups', [
      'getGroups',
      'deleteGroup'
    ]),
    editGroup: function (key) {
      router.push('/manage/groups/edit/' + key)
    },
    addGroup: function () {
      router.push('/manage/groups/add')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
