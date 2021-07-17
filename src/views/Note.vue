<template>
  <v-container>
    <v-row>
      <v-col md="6" offset-md="3" sm="8" offset-sm="2" v-if="$store.state.loading" class="justify-center d-flex">
        <EllipsisLoader color="#1976d2" />
      </v-col>
      <v-col md="6" offset-md="3" sm="8" offset-sm="2" v-else>
        <v-btn icon @click="home">
          <v-icon>
            mdi-arrow-left
          </v-icon>
        </v-btn>
        <v-btn text>
          {{ date }}
        </v-btn>
        
        <v-text-field @keydown.enter="saveNote" @blur="saveNote" v-model="note.title" solo placeholder="Title" class="text-h6">
        </v-text-field>
        
        <v-textarea @blur="saveNote" v-model="note.details" solo placeholder="Note something down">
        </v-textarea>
        
        <Todos/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import Todos from '../components/Todos.vue'
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
import moment from 'moment'
import {mapState} from 'vuex'

export default Vue.extend({
  name: 'Note',
  components: {Todos, PulseLoader},
  mounted(){
    this.getNote()
  },
  methods: {
    getNote() {
      if (this.$route.params.id) {
        // Fetch Note
        this.$store.dispatch('getNote', {id: this.$route.params.id});
      }
    },
    saveNote() {
      const note = {
        id: this.id,
        note: {
          title: this.note.title,
          details: this.note.details
        }
      }
      this.$store.dispatch('saveNote', {...note});
    },
    home() {
      this.$router.push({name: 'Notes'})
    }
  },
  computed: {
    date(): String {
      return this.$store.state.note ? moment(this.$store.state.note.date).format('MMMM Do YYYY, h:mm a') : moment().format('MMMM Do YYYY, h:mm a')
    },
    ...mapState([
      'note', 
      'id'
    ])
  }
})
</script>