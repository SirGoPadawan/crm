<template>
  <v-card>
    <v-card-title>
      Пользователи
      <v-spacer></v-spacer>
      <v-btn color="primary" @click="getUsers()"
        >Загрузить список пользователей
      </v-btn>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="users"
      class="elevation-1"
      :loading="loading"
    >
    </v-data-table>
  </v-card>
</template>
<script>
import Api from "../Api";
export default {
  layout: "default",
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
      new Api().fetch("http://localhost:8080/users").then((res) => {
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
