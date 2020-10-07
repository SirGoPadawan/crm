<template>
  <v-card>
    <v-card-title>
      Пользователи
      <v-spacer></v-spacer>
      <v-btn color="primary" @click="setUsers()">
        Загрузить список пользователей
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
import { mapGetters, mapActions } from "vuex";
export default {
  layout: "default",
  data() {
    return {
      loading: false,
      headers: [
        { text: "Фамилия", value: "lastName" },
        { text: "Имя", value: "firstName" },
        { text: "Отчество", value: "patronymic" },
        { text: "Номер телефона", value: "phone" },
        { text: "Email", value: "email" },
      ],
    };
  },
  methods: {
    ...mapActions({ getTableUsers: "users/getTableUsers" }),
    setUsers() {
      this.loading = true;
      this.getTableUsers();
      this.loading = false;
    },
  },
  computed: {
    ...mapGetters({ users: "users/getUsers" }),
  },
};
</script>
