<template>
  <v-container>
    <v-row>
      <v-col lg="6" offset-lg="3" class="justify-center d-flex " v-if="$store.state.loading.note">
        <EllipsisLoader color="blue" />
      </v-col>
      <v-col lg="6" offset-lg="3" v-else>

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
    <Snackbar />
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import Todos from '../components/Todos.vue'
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
import moment from 'moment'
import {mapState} from 'vuex'
import Snackbar from '@/components/Snackbar.vue'

export default Vue.extend({
  name: 'Note',
  components: {Todos, PulseLoader, Snackbar},
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