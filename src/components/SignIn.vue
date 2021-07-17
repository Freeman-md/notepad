<template>
  <Form @submitted="signin" :data="data" />
</template>

<script>
import Form from './Form.vue'
export default {
  components: { Form },
  methods: {
    signin(payload) {
      this.$store.dispatch('signIn', payload);
    }
  },
  data: () => ({
    data: {
      title: 'Sign In',
      action: 'signIn'
    }
  })
}
</script>