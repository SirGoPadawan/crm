<template>
  <v-app id="inspire">
    <v-container>
      <v-card-title>
        Пользователи
        <v-spacer></v-spacer>
        <v-btn class="ma-2" outlined color="blue" @click="getUsers()"
          >Загрузить список пользователей</v-btn
        >
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="users"
        class="elevation-1"
        :loading="loading"
        hide-default-footer
      >
      </v-data-table>
    </v-container>
  </v-app>
</template>
<script>
export default {
  data() {
    return {
      loading: false,
      users: [],
      headers: [
        { text: "Фамилия", align: "center", value: "lastName" },
        { text: "Имя", align: "center", value: "firstName" },
        { text: "Отчество", align: "center", value: "patronymic" },
        { text: "Номер телефона", align: "center", value: "phone" },
        { text: "Email", align: "center", value: "email" },
      ],
    };
  },
  computed: {},
  methods: {
    getUsers() {
      this.loading = true;
      const url = "http://localhost:8080/users";
      const token = JSON.parse(localStorage.getItem("token"));
      fetch(url, {
        method: "GET",
        headers: {
          Authentication: token.token,
        },
      })
        .then((res) => res.json())
        .then((res) => {
          if (Array.isArray(res)) {
            this.users = res;
          } else {
            console.log(res);
          }
        });
      this.loading = false;
    },
  },
};
</script>
