<template>
  <v-app id="inspire">
    <v-container fluid class="main">
      <v-btn
        class="ma-2 btn-main"
        outlined
        color="blue"
        @click="goToRegistration()"
        >Форма регистрации</v-btn
      >
      <v-btn class="ma-2 btn-main" outlined color="blue" @click="goToLogin()"
        >Форма авторизации</v-btn
      >
      <v-btn class="ma-2 btn-main" outlined color="blue" @click="goToUsers()"
        >Пользователи</v-btn
      >
      <v-btn class="ma-2 btn-main" outlined color="blue" @click="goToServices()"
        >Услуги</v-btn
      >
    </v-container>
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
    goToUsers: function() {
      this.$router.push("users");
    },
    goToServices: function() {
      this.$router.push("services");
    },
  },
};
</script>
<style scoped>
.main {
  max-width: 1366px;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.btn-main {
  flex: 1 0 300px;
}
</style>
