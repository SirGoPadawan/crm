<template>
  <v-row justify="center theme--light">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="amber darken-3" dark v-bind="attrs" v-on="on">
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
              :value="editUser.first_name"
              required
            ></v-text-field>
            <v-text-field
              label="Отчество"
              :value="editUser.first_name"
              required
            ></v-text-field>
            <v-text-field
              label="Email"
              :value="editUser.email"
              required
            ></v-text-field>
            <v-text-field
              label="Телефон"
              :value="editUser.phone"
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
  </v-row>
</template>
<script>
export default {
  props: ["user"],
  data() {
    return {
      dialog: false,
      editUser: { ...this.user },
    };
  },
  methods: {
    updateUser(editUser) {
      console.log(editUser);
      this.dialog = false;
    },
  },
};
</script>
