import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import vuetify from './plugins/vuetify'
import firebase from 'firebase/app'
import 'firebase/firestore'
import "firebase/auth";
import * as VueSpinnersCss from "vue-spinners-css";

firebase.initializeApp({
    apiKey: "AIzaSyAMz4Uh6UDn1bi5G87P-Nls8kj17VBR8ks",
    authDomain: "notepad-192e7.firebaseapp.com",
    projectId: "notepad-192e7",
    storageBucket: "notepad-192e7.appspot.com",
    messagingSenderId: "733111826588",
    appId: "1:733111826588:web:164951ba830b36031e9559",
    measurementId: "G-T4PSGX618Y"
})

export const db = firebase.firestore()
export const auth = firebase.auth()

Vue.filter('truncate', function (value: string, size: number) {
  if (!value) return '';
  value = value.toString();

  if (value.length <= size) {
    return value;
  }
  return value.substr(0, size) + '...';
});

Vue.use(VueSpinnersCss)

Vue.config.productionTip = false

var VueApp: any = Vue


VueApp.mixin({
  data: () => ({ aRandomMixinProperty: "John Doe" }),

  mounted()
  {
      (this as typeof VueApp).aRandomMixinProperty = "John Snow";
  }
});


new VueApp({
  router,
  store,
  vuetify,
  render: (h:Function) => h(App)
}).$mount('#app')
