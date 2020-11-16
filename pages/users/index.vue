<template>
  <v-card>
    <v-data-table
      :headers="headers"
      :items="users"
      :no-data-text="errMessage"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title> Пользователи </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="650">
            <template v-slot:activator="{ on }">
              <v-btn color="primary" dark v-on="on">
                Создать пользователя
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">Новый пользователь</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-text-field
                    v-model="editedItem.first_name"
                    label="Имя"
                  ></v-text-field>
                  <v-text-field
                    v-model="editedItem.last_name"
                    label="Фамилия"
                  ></v-text-field>
                  <v-text-field
                    v-model="editedItem.patronymic"
                    label="Отчество"
                  ></v-text-field>
                  <v-text-field
                    v-model="editedItem.email"
                    label="Email"
                  ></v-text-field>
                  <v-text-field
                    v-model="editedItem.phone"
                    label="Телефон"
                  ></v-text-field>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close()">
                  Отмена
                </v-btn>
                <v-btn color="blue darken-1" text @click="save()">
                  Сохранить
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon small class="mr-2" @click="goToUser(item)">
          mdi-pencil
        </v-icon>
      </template>
    </v-data-table>
  </v-card>
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
  layout: "default",
  data() {
    return {
      headers: [
        { text: "Фамилия", value: "last_name" },
        { text: "Имя", value: "first_name" },
        { text: "Отчество", value: "patronymic" },
        { text: "Номер телефона", value: "phone" },
        { text: "Email", value: "email" },
        {
          text: "Более подробно",
          align: "center",
          value: "actions",
          sortable: false,
        },
      ],
      editedIndex: -1,
      editedItem: {
        first_name: "",
        last_name: "",
        patronymic: "",
        email: "",
        phone: "",
        id: 0,
      },
      defaultItem: {
        first_name: "",
        last_name: "",
        patronymic: "",
        email: "",
        phone: "",
        id: 0,
      },
      dialog: false,
    };
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
  },
  methods: {
    ...mapActions({
      actionIndex: "users/actionIndex",
      createAction: "users/createAction",
    }),
    goToUser(item) {
      this.$router.push({ path: "/users/" + item.id });
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = { ...this.defaultItem };
        this.editedIndex = -1;
      });
    },
    save() {
      this.createAction(this.editedItem);
      this.close();
    },
  },
  computed: {
    ...mapState({
      users: (state) => state.users.users,
      errMessage: (state) => state.users.errMessage,
    }),
  },
  mounted() {
    this.actionIndex();
  },
};
</script>
