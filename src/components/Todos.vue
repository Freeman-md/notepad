<template>
  <div>
    <div v-if="$store.state.todos">
      <Todo v-for="(todo, index) in $store.state.todos" :key="index" :todo="todo" />
    </div>
    <div v-if="$store.state.id" class="d-flex justify-space-between">
      <v-btn color="primary" depressed @click.prevent="addTodo">Add Todo</v-btn>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Todo from './Todo.vue'
export default Vue.extend({
  name: 'Todos',
  components: {Todo},
  methods: {
    addTodo() {
      this.$store.dispatch('addTodo')
    }
  }
})
</script>