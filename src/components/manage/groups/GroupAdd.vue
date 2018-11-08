<template>
  <v-dialog v-model="showDialog" max-width="100em" persistent transition="dialog-bottom-transition" no-click-animation>
    <v-card>
      <v-card-title>
        <span class="headline">Add Group</span>
      </v-card-title>
      <v-card-text>
        <v-form id="addgroup-form">
          <v-container v-if="!processingGroups">
            <v-layout row wrap>
              <v-flex xs12 sm12 md12>
                <v-text-field
                  label="Agency"
                  v-model="group.agency"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm12 md12>
                <v-text-field
                  label="Country"
                  v-model="group.countryOfOrigin"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm12 md12>
                <v-text-field
                  label="English Name"
                  v-model="group.enName"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm12 md12>
                <v-text-field
                  label="Fanclub"
                  v-model="group.fanclub"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm12 md12>
                <v-text-field
                  label="Fanclub Website"
                  v-model="group.fanclubWebsite"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm12 md12>
                <v-text-field
                  label="Japanese Name"
                  v-model="group.jpName"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm12 md12>
                <v-text-field
                  label="Label"
                  v-model="group.label"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm12 md12>
                <v-text-field
                  label="Logo URL"
                  v-model="group.logoUrl"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm12 md12>
                <v-text-field
                  label="Twitter"
                  v-model="group.twitter"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm12 md12>
                <v-text-field
                  label="Website"
                  v-model="group.website"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm12 md12>
                <v-text-field
                  label="Years Active"
                  v-model="group.yearsActive"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm12 md12>
                <v-text-field
                  label="Youtube"
                  v-model="group.youtube"
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" @click.native="closeDialog()">Close</v-btn>
        <v-btn color="blue darken-1" @click.native="addGroup(group)">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'GroupAdd',
  data () {
    return {
      group: {
        agency: '',
        countryOfOrigin: '',
        enName: '',
        fanclub: '',
        fanclubWebsite: '',
        jpName: '',
        label: '',
        logoUrl: '',
        twitter: '',
        website: '',
        yearsActive: '',
        youtube: ''
      }
    }
  },
  computed: {
    ...mapGetters('groups', [
      'processingGroups',
      'showDialog'
    ])
  },
  methods: {
    ...mapActions('groups', [
      'addGroup',
      'closeDialog'
    ])
  }
}
</script>

<style scoped>

</style>
