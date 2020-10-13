<template>
  <v-card>
    <v-data-table :headers="headers" :items="users" class="elevation-1">
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title> Пользователи </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="650">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark v-bind="attrs" v-on="on">
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
      -->
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon small class="mr-2" @click="goToAboutUser(item)">
          mdi-pencil
        </v-icon>
        <v-icon small class="mr-2" @click="deleteUser(item)">
          mdi-delete
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
      getUsers: "users/getUsers",
      fetchApi: "users/fetchApi",
    }),
    goToAboutUser(item) {
      this.$router.push({ path: "/users/" + item.id });
    },
    deleteUser(item) {
      const url = "http://localhost:8080/users"
      confirm("Вы действительно хотите удалить запись?") &&
        this.fetchApi({ item: JSON.stringify(item), method: "DELETE", headers:{"Content-Type": "application/json"}, url});
    }, 
    /* editUser(item) {
      this.editedIndex = this.users.indexOf(item);
      this.editedItem = { ...item };
      this.dialog = true;
    }, */
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = { ...this.defaultItem };
        this.editedIndex = -1;
      });
    },
    save() {
      this.fetchApi({
        item: JSON.stringify(this.editedItem),
        method: "POST",
        headers: { "Content-Type": "application/json" },
        url: "http://localhost:8080/users",
      });
      this.close();
    },
  },
  computed: {
    ...mapState({ users: (state) => state.users.users }),
  },
  mounted() {
    this.getUsers();
  },
};
</script>
