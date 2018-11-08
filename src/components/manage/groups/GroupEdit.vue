<template>
<v-dialog v-if="!processingGroups" v-model="showDialog" max-width="100em" persistent transition="dialog-bottom-transition" no-click-animation>
  <v-card>
    <v-card-title>
      <span class="headline">Edit Group - {{groupForEdit.enName}}</span>
    </v-card-title>
    <v-card-text>
      <v-form id="editgroup-form">
        <v-container v-if="!processingGroups">
          <v-layout row wrap>
            <v-flex xs12 sm12 md12>
              <v-text-field
                label="Agency"
                v-model="groupForEdit.agency"
              ></v-text-field>
            </v-flex>
            <v-flex xs12 sm12 md12>
              <v-text-field
                label="Country"
                v-model="groupForEdit.countryOfOrigin"
              ></v-text-field>
            </v-flex>
            <v-flex xs12 sm12 md12>
              <v-text-field
                label="English Name"
                v-model="groupForEdit.enName"
              ></v-text-field>
            </v-flex>
            <v-flex xs12 sm12 md12>
              <v-text-field
                label="Fanclub"
                v-model="groupForEdit.fanclub"
              ></v-text-field>
            </v-flex>
            <v-flex xs12 sm12 md12>
              <v-text-field
                label="Fanclub Website"
                v-model="groupForEdit.fanclubWebsite"
              ></v-text-field>
            </v-flex>
            <v-flex xs12 sm12 md12>
              <v-text-field
                label="Japanese Name"
                v-model="groupForEdit.jpName"
              ></v-text-field>
            </v-flex>
            <v-flex xs12 sm12 md12>
              <v-text-field
                label="Label"
                v-model="groupForEdit.label"
              ></v-text-field>
            </v-flex>
            <v-flex xs12 sm12 md12>
              <v-text-field
                label="Logo URL"
                v-model="groupForEdit.logoUrl"
              ></v-text-field>
            </v-flex>
            <v-flex xs12 sm12 md12>
              <v-text-field
                label="Twitter"
                v-model="groupForEdit.twitter"
              ></v-text-field>
            </v-flex>
            <v-flex xs12 sm12 md12>
              <v-text-field
                label="Website"
                v-model="groupForEdit.website"
              ></v-text-field>
            </v-flex>
            <v-flex xs12 sm12 md12>
              <v-text-field
                label="Years Active"
                v-model="groupForEdit.yearsActive"
              ></v-text-field>
            </v-flex>
            <v-flex xs12 sm12 md12>
              <v-text-field
                label="Youtube"
                v-model="groupForEdit.youtube"
              ></v-text-field>
            </v-flex>
          </v-layout>
        </v-container>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="blue darken-1" @click.native="closeDialog()">Close</v-btn>
      <v-btn color="blue darken-1" @click.native="editGroup({group: groupForEdit, groupId: groupId})">Save</v-btn>
    </v-card-actions>
  </v-card>
</v-dialog>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'GroupEdit',
  data () {
    return {
      dialog: true
    }
  },
  props: {
    groupId: String
  },
  created: function () {
    this.$store.dispatch('groups/getGroup', this.groupId)
  },
  computed: {
    ...mapGetters('groups', [
      'groupForEdit',
      'processingGroups',
      'showDialog'
    ])
  },
  methods: {
    ...mapActions('groups', [
      'editGroup',
      'closeDialog'
    ])
  },
  beforeRouteUpdate (to, from, next) {
    //console.log('ASDASDASD', this.groupId)
    this.$store.dispatch('groups/getGroup', this.groupId)
    next()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
