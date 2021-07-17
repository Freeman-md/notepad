<template>
  <v-app>

    <div dense class="justify-center d-flex">
      
      <v-container>
        <v-row>
          <v-col class="d-flex justify-space-around" md="6" offset-md="3" sm="8" offset-sm="2">
            <img src="./assets/logo.png" width="50" height="50">
            <v-icon>mdi-plus</v-icon>
            <img src="./assets/typescript.png" width="50" height="50">
            <v-icon>mdi-plus</v-icon>
            <img src="./assets/vuetify.svg" width="50" height="50">
            <v-icon>mdi-plus</v-icon>
            <img src="./assets/firebase.svg" width="50" height="50">
          </v-col>
        </v-row>
      </v-container>
      

    </div>

    <v-container>
      <v-row>
        <v-col class="d-flex justify-space-around align-center" md="6" offset-md="3" sm="8" offset-sm="2" v-if="!authenticated">
          <SignUp />
          <SignIn />
        </v-col>
        <v-col class="d-flex justify-space-around align-center" md="6" offset-md="3" sm="8" offset-sm="2" v-else>
          <span>Welcome {{$store.state.user.email}}</span>
          <v-btn color="primary" @click="logout">Logout</v-btn>
        </v-col>
      </v-row>
    </v-container>

    <v-main>
      <router-view v-slot="{Component}" v-if="authenticated">
        <transition name="route" mode="out-in">
          <component :is="Component"></component>
        </transition>
      </router-view>
      <v-container v-else>
        <v-row>
          <v-col md="6" offset-md="3" sm="8" offset-sm="2">
            <v-alert
              border="top"
              colored-border
              type="info"
              elevation="2"
            >
              Login to view notes
            </v-alert>
          </v-col>
        </v-row>
      </v-container>
      <Snackbar />
    </v-main>

  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import {mapGetters} from 'vuex'

import SignIn from '@/components/SignIn.vue'
import SignUp from '@/components/SignUp.vue'
import Snackbar from '@/components/Snackbar.vue'

export default Vue.extend({
  name: 'App',
  components: { SignIn, SignUp, Snackbar },
  computed: {
    ...mapGetters([
      'authenticated'
    ])
  },
  methods: {
    logout() {
      this.$store.dispatch('logout')
    }
  },
  created() {
    this.$store.dispatch('listenForAuthChanges')
  }
});
</script>

<style scoped>
/* route transitions */
.route-enter-from {
  opacity: 0;
  transform: translate(100px);
}

.route-enter-active {
  transition: all 0.3s ease-out;
}

.route-leave-to {
  opacity: 0;
  transform: translate(-100px);
}

.route-leave-active {
  transition: all 0.3s ease-in;
}
</style>

