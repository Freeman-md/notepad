<template>
  <div>

    <!-- Search bar -->
    <v-container>
      <v-row>

        <v-col md="6" offset-md="3" sm="8" offset-sm="2">
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
          
          <transition mode="out-in" name="switch">
            <div v-if="filteredNotes">
              <transition-group name="list" appear tag="div">
                <Note :note="note" v-for="(note, index) in filteredNotes" :key="index"/>
              </transition-group>
            </div>
            <div class="justify-center d-flex" v-else>
              <EllipsisLoader color="#1976d2" />
            </div>
          </transition>
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
  </div>
</template>

<script>
  import Note from '@/components/Note.vue'
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
        Note
    },
    computed: {
      filteredNotes() {
        if (this.$store.state.notes.length > 0) {
          if (this.searchText) {
            return this.$store.state.notes.filter((note) => {
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

<style scoped>
  .list-enter-from {
    opacity: 0;
    transform: scale(0.6)
  }
  .list-enter-to {
    opacity: 1;
    transform: scale(1)
  }
  .list-enter-active {
    transition: all 0.4s ease;
  }
  .list-leave-from{
    opacity: 1;
    transform: scale(1)
  }
  .list-leave-to{
    opacity: 0;
    transform: scale(0.6)
  }
  .list-leave-active{
    transition: all 0.4s ease;
    position: absolute;
  }
  .list-move {
    transition: all 0.3s ease;
  }

  /* switch transitions */
  .switch-enter-from,
  .switch-leave-to {
    opacity: 0;
    transform: translateY(20px)
  }

  .switch-enter-active,
  .switch-leave-active {
    transition: all 0.5s ease;
  }
</style>
