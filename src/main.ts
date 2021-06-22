import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import firebase from 'firebase/app'
import 'firebase/firestore'

Vue.config.productionTip = false

firebase.initializeApp({
    apiKey: "AIzaSyAMz4Uh6UDn1bi5G87P-Nls8kj17VBR8ks",
    authDomain: "notepad-192e7.firebaseapp.com",
    projectId: "notepad-192e7",
    storageBucket: "notepad-192e7.appspot.com",
    messagingSenderId: "733111826588",
    appId: "1:733111826588:web:164951ba830b36031e9559",
    measurementId: "G-T4PSGX618Y"
})

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
