<template>
  <v-dialog v-model="showDialog" max-width="100em" persistent transition="dialog-bottom-transition" no-click-animation>
    <v-card>
      <v-card-title>
        <span class="headline">Add Member</span>
      </v-card-title>
      <v-card-text>
          <v-form id="addgroup-form">
            <v-container v-if="!processingMembers">
                <v-layout row wrap>
                    <v-flex xs6 sm6 md6>
                        <v-text-field
                        label="Japanese Name"
                        v-model="member.jpName"
                        ></v-text-field>
                    </v-flex>
                    <v-flex xs6 sm6 md6>
                        <v-text-field
                        label="English Name"
                        v-model="member.enName"
                        ></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm12 md12>
                        <v-select
                            :items="groupNames"
                            v-model="member.group"
                            label="Select group"
                            item-text="name"
                            item-value="id"
                            multiple
                            chips
                            hint="What are the groups for this person?"
                            persistent-hint
                        ></v-select>
                    </v-flex>
                    <v-flex xs6 sm6 md6>
                        <v-text-field
                        label="Nickname"
                        v-model="member.nickname"
                        ></v-text-field>
                    </v-flex>
                    <v-flex xs3 sm3 md3>
                        <v-select
                        :items="bloodTypes"
                        v-model="member.bloodType"
                        label="Blood Type"
                        ></v-select>
                    </v-flex>
                    <v-flex xs3 sm3 md3>
                        <v-select
                        :items="zodiacSigns"
                        v-model="member.zodiacSign"
                        label="Zodiac Sign"
                        ></v-select>
                    </v-flex>
                    <v-flex xs6 sm6 md6>
                        <v-menu
                            :close-on-content-click="false"
                            v-model="datepick"
                            :nudge-right="40"
                            lazy
                            transition="scale-transition"
                            offset-y
                            full-width
                            min-width="290px">
                            <v-text-field
                            slot="activator"
                            v-model="member.birthdate"
                            label="Birth Date"
                            prepend-icon="event"
                            readonly
                            ></v-text-field>
                            <v-date-picker v-model="member.birthdate" @input="datepick = false"></v-date-picker>
                        </v-menu>
                    </v-flex>
                    <v-flex xs3 sm3 md3>
                        <v-switch
                            :label="`Active`"
                            v-model="member.active"
                        ></v-switch>
                    </v-flex>
                    <v-flex xs3 sm3 md3>
                        <v-switch
                            :label="`Announced Graduation`"
                            v-model="member.announcedGraduation"
                        ></v-switch>
                    </v-flex>
                    <v-flex xs6 sm6 md6>
                        <v-text-field
                        label="Birth Place"
                        v-model="member.birthplace"
                        ></v-text-field>
                    </v-flex>
                    <v-flex xs6 sm6 md6>
                    </v-flex>
                    <v-flex xs5 sm5 md5>
                        <v-text-field
                        label="Japanese Team"
                        v-model="member.jpTeam"
                        ></v-text-field>
                    </v-flex>
                    <v-flex xs5 sm5 md5>
                        <v-text-field
                        label="English Team"
                        v-model="member.enTeam"
                        ></v-text-field>
                    </v-flex>
                    <v-flex xs2 sm2 md2>
                        <v-menu
                            :close-on-content-click="false"
                            v-model="debutpick"
                            :nudge-right="40"
                            lazy
                            transition="scale-transition"
                            offset-y
                            full-width
                            min-width="290px">
                            <v-text-field
                            slot="activator"
                            v-model="member.debut"
                            label="Debut Month"
                            prepend-icon="event"
                            readonly
                            ></v-text-field>
                            <v-date-picker v-model="member.debut" type="month" @input="debutpick = false"></v-date-picker>
                        </v-menu>
                    </v-flex>
                    <v-flex xs4 sm4 md4>
                        <v-text-field
                        label="Agency"
                        v-model="member.agency"
                        ></v-text-field>
                    </v-flex>
                    <v-flex xs4 sm4 md4>
                        <v-text-field
                        label="Profile"
                        v-model="member.profileUrl"
                        ></v-text-field>
                    </v-flex>
                    <v-flex xs4 sm4 md4>
                        <v-text-field
                        label="Blog"
                        v-model="member.blog"
                        ></v-text-field>
                    </v-flex>
                    <v-flex xs6 sm6 md6>
                        <v-text-field
                        label="Livestream URL (Showroom, LINE, ameba)"
                        v-model="member.liveStreamUrl"
                        ></v-text-field>
                    </v-flex>
                    <v-flex xs6 sm6 md6>
                        <v-text-field
                        label="Livestream ID (Showroom, LINE, ameba)"
                        v-model="member.liveStreamId"
                        ></v-text-field>
                    </v-flex>
                    <v-flex xs6 sm6 md6>
                        <v-text-field
                        label="Photo URL"
                        v-model="member.photoUrl"
                        ></v-text-field>
                    </v-flex>
                </v-layout>
            </v-container>
            </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" @click.native="closeDialog()">Close</v-btn>
        <v-btn color="blue darken-1" @click.native="addMember(member)">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import { BloodTypes, ZodiacSigns } from '../../../util'

export default {
  name: 'MemberAdd',
  data () {
    return {
      datepick: false,
      debutpick: false,
      member: {
        active: false,
        agency: '',
        announcedGraduation: false,
        birthdate: new Date().toISOString().substr(0, 10),
        birthplace: '',
        blog: '',
        bloodType: '',
        debut: '',
        enName: '',
        enTeam: '',
        group: [],
        jpName: '',
        jpTeam: '',
        liveStreamId: '',
        liveStreamUrl: '',
        nickname: '',
        photoUrl: '',
        profileUrl: '',
        zodiacSign: ''
      }
    }
  },
  computed: {
    ...mapGetters('members', [
      'showDialog',
      'processingMembers',
      'groups',
      'groupNames'
    ]),
    bloodTypes: () => {
      return BloodTypes
    },
    zodiacSigns: () => {
      return ZodiacSigns
    }
  },
  methods: {
    ...mapActions('members', [
      'closeDialog',
      'addMember'
    ])
  }
}
</script>

<style scoped>

</style>
