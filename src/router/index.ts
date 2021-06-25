import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Notes from '../views/Notes.vue'
import Note from '../views/Note.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Notes',
    component: Notes
  },
  {
    path: '/notes/:id?',
    name: 'Note',
    component: Note
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
