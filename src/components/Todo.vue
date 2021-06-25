<template>
  <div class="d-flex align-center justify-space-between">
    <div class="d-flex align-center">
      <v-checkbox @change="saveTodo" v-model="completed" color="primary"></v-checkbox>
      <v-text-field @keydown.enter="saveTodo" @blur="saveTodo" autofocus ref="input" v-model="text" v-if="editing"></v-text-field>
      <span v-else @click.prevent="setEditing(true)">{{todo.text}}</span>
    </div>
    <div class="d-flex align-center">
      <v-btn icon color="success" @click="saveTodo" v-if="editing">
        <v-icon>mdi-check</v-icon>
      </v-btn>
      <v-btn icon color="primary" v-else @click.prevent="setEditing(true)">
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
      <v-btn icon color="red" @click="deleteTodo">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: ['todo'],
  data() {
    return {
      editing: false,
      text: this.todo.text,
      completed: this.todo.completed
    }
  },
  methods: {
    setEditing(value: boolean) {
      this.editing = value
    }, 
    saveTodo() {
      this.setEditing(false)
      const todo = this.todo
      todo.text = this.text
      todo.completed = this.completed

      this.$store.dispatch('saveTodo', {...todo})
    },
    deleteTodo() {
      this.$store.dispatch('deleteTodo', {...this.todo})
    },
    changeTodo() {
      const todo = this.todo
      todo.completed = this.completed
      
      this.$store.dispatch('setCompleted', {...this.todo})
    }
  }
})
</script>