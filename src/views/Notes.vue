<template>
  <div>

    <!-- Search bar -->
    <v-container>
      <v-row>

        <v-col md="6" offset-md="3" sm="8" offset-sm="2" v-if="filteredNotes">
          <v-text-field
            hide-details
            prepend-inner-icon="mdi-magnify"
            single-line
            filled
            rounded
            placeholder="Search Notes"
            v-model="searchText"
          ></v-text-field>

          <br>
          
          <Note :note="note" v-for="(note, index) in filteredNotes" :key="index"/>
        </v-col>

        <v-col md="6" offset-md="3" sm="8" offset-sm="2" class="justify-center align-center align-content-center d-flex flex-column" v-else>
          <span class="mb-2 h5">No notes avaliable</span>
          <router-link :to="{name: 'Note'}">
            <v-btn text color="primary">
              Add Note
            </v-btn>
          </router-link>
        </v-col>

      </v-row>
    </v-container>
    <v-fab-transition>
      <v-btn
        color="primary"
        dark
        fixed
        bottom
        right
        fab
        @click="addNote"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-fab-transition>

    <Snackbar />
  </div>
</template>

<script lang="ts">
  import Note from '@/components/Note.vue'
  import Snackbar from '@/components/Snackbar.vue'
  import Vue from 'vue'
  import NoteClass from '../note'

  export default Vue.extend({
    name: 'Home',
    data() {
      return {
        searchText: ''
      }
    },
    components: {
        Note, Snackbar
    },
    created() {
      this.$store.dispatch('getNotes')
    },
    computed: {
      filteredNotes() {
        if (this.$store.state.notes.length > 0) {
          if (this.searchText) {
            return this.$store.state.notes.filter((note: NoteClass) => {
              return note.title.toLowerCase().includes(this.searchText.toLowerCase())
            })
          } else {
            return this.$store.state.notes
          }
        }
      }
    },
    methods: {
      addNote() {
        this.$store.state.note = {}
        this.$store.state.id = ''
        this.$store.state.todos = []

        this.$router.push({name: 'Note'})
      }
    }
  })
</script>
