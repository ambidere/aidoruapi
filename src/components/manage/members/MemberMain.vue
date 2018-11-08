<template>
  <v-flex xs12>
    <v-data-table
      :headers="headers"
      :items="members"
      hide-actions
      :loading="processingMembers"
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
        <td class="text-xs-right">{{ getGroupNames(props.item.group) }}</td>
        <td class="text-xs-right">{{ props.item.nickname }}</td>
        <td class="text-xs-right">{{ toReadableDate(props.item.birthdate) }}</td>
        <td class="text-xs-right">{{ props.item.birthplace }}</td>
        <td class="justify-center layout px-0">
          <v-icon>
            edit
          </v-icon>
          <v-icon>
            delete
          </v-icon>
        </td>
      </template>
      <template slot="footer">
        <td colspan="100%">
          <v-btn small color="primary" @click="addMember">
            <v-icon>
              add
            </v-icon>
            Add Member
          </v-btn>
        </td>
      </template>
    </v-data-table>
    <router-view></router-view>
  </v-flex>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import moment from 'moment'
import _ from 'lodash'
import router from '../../../router'

export default {
  name: 'MemberMain',
  computed: {
    ...mapGetters('members', [
      'members',
      'headers',
      'processingMembers'
    ])
  },
  created () {
    this.$store.dispatch('members/getMembers')
  },
  methods: {
    ...mapActions('members', [
      'getMembers'
    ]),
    toReadableDate: (date) => {
      return moment(date, 'YYYY-MM-DD').format('MMMM DD, YYYY')
    },
    getGroupNames: (groups) => {
      let groupNames = _.map(groups, (group) => { return group.enName })
      return _.join(groupNames, ',')
    },
    addMember: function () {
      router.push('/manage/members/add')
    }
  }
}
</script>

<style scoped>

</style>
