import Vue from 'vue'
import Vuex from 'vuex'
import {db} from '../main'
import moment from 'moment'
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    notes: [],
    note: {},
    todos: {},
    id: '',
    loading: {
      notes: false,
      note: false,
      todos: false,
      todo: false
    },
    snackbar: {
      show: false,
      text: ''
    }
  },
  getters: {
    note(state) {
      return state.note
    },
    id(state) {
      return state.id
    }
  },
  mutations: {
    setNote: (state, payload) => {
      state.note = payload.note
      state.id = payload.id
    },
    resetNote: (state, payload) => {
      state.note = {},
      state.id = ''
    },
    setNotes: (state, payload) => {
      state.notes = payload.notes
    },
    setTodos: (state, payload) => {
      state.todos = payload.todos
    },
    setLoading: (state, payload) => {
      state.loading[payload.name] = payload.value
    },
    showSnackbar: (state, payload) => {
      state.snackbar.show = true
      state.snackbar.text = payload.text
    },
    resetSnackbar: (state) => {
      state.snackbar.show = false
      state.snackbar.text = ''
    }
  },
  actions: {
    getNotes: async({commit, dispatch}) => {
      let snapshot = await db.collection('notes').orderBy('date', 'desc').get()
      let notes: Array<Object> = []
      snapshot.forEach(doc => {
        let appData = doc.data()
        appData.id = doc.id
        notes.push(appData)
      }),
      commit('setNotes', {notes: notes})
    },
    getNote: async ({commit, dispatch}, payload) => {
      commit('setLoading', {name: 'note', value: true})
      let snapshot = await db
        .collection('notes')
        .doc(payload.id)
        .get()

      if (!snapshot.exists) {
       alert('Note does not exist')
       router.push({name: 'Notes'})
      } else {
        // Get todos
        dispatch('getTodos', {id: payload.id})

        const note = await snapshot.data()

        const id = payload.id
        commit('setNote', {note: note, id: id})
      }
    },
    saveNote: async({commit, dispatch}, payload) => {
      if (payload.note.title) {
        if(payload.note.title.length >= 1) {
          console.log(payload.note.title)
          payload.note.title.trim()
        } 
      }

      if (payload.note.details) {
        if(payload.note.details.length >= 1) {
          console.log(payload.note.details)
          payload.note.details.trim()
        } 
      }

      if ((payload.note.title || payload.note.details) && (payload.note.title.length >= 1 || payload.note.details.length >= 1)) {
        if (payload.id) {

          if (!payload.note.title && !payload.note.details) {
            const todos = await dispatch('getNoteTodos', {id: payload.note.id})
            if (todos.length > 0) {
              await dispatch('deleteNote', {id: payload.id})
              router.push({name: 'Notes'})
            }
          }
          await db
          .collection('notes')
          .doc(payload.id)
          .update({
            ...payload.note,
            date: moment().valueOf()
          })
        } else {
          if (!payload.note.title) {
            payload.note.title = ''
          }  

          if (!payload.note.details) {
            payload.note.details = ''
          }  

          const data = {
            title: payload.note.title,
            details: payload.note.details,
            date: moment().valueOf()
          }
          const snapshot = await db
          .collection('notes')
          .add({
            ...data
          })
          
          await dispatch('getNote', {id: snapshot.id})
          router.push({name: 'Note', params: {id: snapshot.id}})
        }

        dispatch('getNotes')
        commit('showSnackbar', {text: 'Note saved successfully'})

        setTimeout(() => {
          commit('resetSnackbar')
        }, 3000);
      }
    },
    deleteNote: async({commit, dispatch}, payload) => {
      await db.collection('notes').doc(payload.id).delete()
      dispatch('getNotes')

      commit('showSnackbar', {text: 'Note deleted successfully'})

      setTimeout(() => {
        commit('resetSnackbar')
      }, 3000);
    },
    getTodos: async({commit, dispatch}, payload) => {

      const todos = await dispatch('getNoteTodos', {...payload})

      commit('setTodos', {todos: todos})
      commit('setLoading', {name: 'note', value: false})
    },
    getNoteTodos: async(context, payload) => {
      let snapshot = await db
        .collection('todos')
        .where('note_id', '==', payload.id)
        .get()

      let todos: Array<Object> = []
      snapshot.docs.forEach(doc => {
        let appData = doc.data()
        appData.id = doc.id
        todos.push(appData)
      })
      
      return todos
    },

    addTodo: async(context, payload) => {
      context.commit('setLoading', {name: 'todo', value: true})

      db.collection('todos').add({
        text: '',
        completed: false,
        note_id: context.state.id,
        date: moment().valueOf()
      })

      context.dispatch('saveNote', {id: context.state.id, note: context.state.note})
      context.dispatch('getTodos', {id: context.state.id})
    },
    saveTodo: async(context, payload) => {
      if (payload.text) {
          await db
          .collection('todos')
          .doc(payload.id)
          .update({
            ...payload
          })

          context.dispatch('saveNote', {id: context.state.id, note: context.state.note})
          context.dispatch('getTodos', {id: payload.note_id})
      } else {
        context.dispatch('deleteTodo', {...payload})
      }

    },
    deleteTodo: async({dispatch}, payload) => {
      await db
        .collection('todos')
        .doc(payload.id)
        .delete()

      dispatch('getTodos', {id: payload.note_id})
    }

  },
  modules: {
  }
})
