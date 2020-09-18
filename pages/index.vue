<template>
  <v-app class="main">
    <v-btn class="ma-2" outlined color="blue" @click="goToRegistration()"
      >Форма регистрации</v-btn
    >
    <v-btn class="ma-2" outlined color="blue" @click="goToLogin()"
      >Форма авторизации</v-btn
    >
  </v-app>
</template>
<script>
export default {
  methods: {
    goToRegistration: function() {
      this.$router.push("registration");
    },
    goToLogin: function() {
      this.$router.push("login");
    },
  },
};
</script>
<style>
.main {
  max-width: 200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
}
</style>
