<template>
  <v-dialog v-model="dialog" max-width="600px">
    <template v-slot:activator="{ on }">
      <v-btn color="amber darken-3" dark v-on="on">
        <v-icon>mdi-account-edit</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        Редактировние профиля
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-text-field
            label="Фамилия"
            v-model="editUser.last_name"
            required
          ></v-text-field>
          <v-text-field
            label="Имя"
            v-model="editUser.first_name"
            required
          ></v-text-field>
          <v-text-field
            label="Отчество"
            v-model="editUser.patronymic"
            required
          ></v-text-field>
          <v-text-field
            label="Email"
            v-model="editUser.email"
            required
          ></v-text-field>
          <v-text-field
            label="Телефон"
            v-model="editUser.phone"
            required
          ></v-text-field>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="amber darken-3" text @click="updateUser(editUser)">
          Сохранить
        </v-btn>
        <v-btn color="amber darken-3" text @click="dialog = false">
          Закрыть
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import { mapActions } from "vuex";
export default {
  props: ["user"],
  data() {
    return {
      dialog: false,
      editUser: { ...this.user },
    };
  },
  methods: {
    ...mapActions({ fetchApi: "users/fetchApi" }),
    updateUser(editUser) {
      this.dialog = false;
      this.fetchApi({
        item: JSON.stringify(editUser),
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        url: `http://localhost:8080/users/${this.user.id}`,
      });
    },
  },
};
</script>
