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
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'App',

  data: () => ({
    //
  }),
});
</script>
