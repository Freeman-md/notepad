<template>
  <v-snackbar
    v-model="snackbar.show"
  >
    {{ snackbar.text }}

    <template v-slot:action="{ attrs }">
      <v-btn
        color="primary"
        text
        v-bind="attrs"
        @click="reset"
      >
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script lang="ts">
import Vue from 'vue'
import {mapState} from 'vuex'
export default Vue.extend({
  methods: {
    reset() {
      this.$store.commit('resetSnackbar')
    }
  },
  computed: {
    ...mapState([
      'snackbar'
    ])
  }
})
</script>