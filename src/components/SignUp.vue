<template>
  <Form @submitted="signup" :data="data" class="mt-3" />
</template>

<script>
import Form from './Form.vue'
export default {
  components: { Form },
  methods: {
    signup(payload) {
      this.$store.dispatch('signUp', payload)
    }
  },
  data: () => ({
    data: {
      title: 'Sign Up',
      action: 'signUp'
    }
  })
}
</script>