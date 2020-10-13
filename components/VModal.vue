<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" dark v-bind="attrs" v-on="on">
          Редактировать
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Редактировние профиля</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-text-field
              label="Фамилия"
              :value="user.last_name"
              required
            ></v-text-field>
            <v-text-field
              label="Имя"
              :value="user.first_name"
              required
            ></v-text-field>
            <v-text-field
              label="Отчество"
              :value="user.first_name"
              required
            ></v-text-field>
            <v-text-field
              label="Email"
              :value="user.email"
              required
            ></v-text-field>
            <v-text-field
              label="Телефон"
              :value="user.phone"
              required
            ></v-text-field>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">
            Закрыть
          </v-btn>
          <v-btn color="blue darken-1" text @click="dialog = false">
            Сохранить
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
    };
  },
};
</script>
