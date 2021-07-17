<template>
  <v-card
  class="mb-4"
  @click.prevent="editNote"
  >
    <div class="ml-4 text-overline">{{date}}</div>
    <v-card-title class="text-h5">
      {{ note.title | truncate(20) }}
    </v-card-title>

    <v-card-subtitle>
      <span>{{note.details | truncate(25)}}</span>
      <span :class="{'ml-4': note.details}" class="d-inline-flex justify-space-around blue--text align-center" v-if="todos.total">
        <v-icon size="small" color="primary" class="mr-1">mdi-clipboard-list</v-icon>
        <span>
          {{todos.completed}} / {{ todos.total }}
        </span>
      </span>
    </v-card-subtitle>
    

    <v-card-actions>
      <v-btn icon @click.prevent="deleteNote">
        <v-icon>
          mdi-delete
        </v-icon>
      </v-btn>
      <v-btn icon @click.prevent="editNote">
        <v-icon>
          mdi-pencil
        </v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import Vue from 'vue'
import moment from 'moment'
import Todo from '../todo'
export default Vue.extend({
  name: 'Note',
  props: ['note'],
  data() {
    return {
      todos: {
        completed: 0,
        total: 0
      }
    }
  },
  methods: {
    editNote() {
      this.$router.push({name: 'Note', params: 
        {id: this.$props.note.id}
      })
    },
    deleteNote() {
      this.$store.dispatch('deleteNote', {...this.$props.note})
    }
  },
  computed: {
    date() {
      return moment(this.note.date).format('MMMM Do YYYY, h:mm a')
    }
  },
  async created() {
    const todos = await this.$store.dispatch('getNoteTodos', {id: this.$props.note.id})

    this.todos.total = todos.length

    todos.forEach((todo) => {
      if (todo.completed) {
        this.todos.completed++
      }
    })
  }
})
</script>