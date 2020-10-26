<template>
  <v-data-table :headers="headers" :items="companies" class="elevation-1">
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title> Компании </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="amber darken-3" dark v-bind="attrs" v-on="on">
              Новая компания
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>
            <v-card-text>
              <v-text-field
                v-model="editedItem.fullname"
                label="Название компании"
              ></v-text-field>
              <v-text-field
                v-model="editedItem.shortname"
                label="Сокращение"
              ></v-text-field>
              <v-text-field
                v-model="editedItem.leader_id"
                label="Идентификатор руководителя"
              ></v-text-field>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="amber darken-3" text @click="close()">
                Отмена
              </v-btn>
              <v-btn color="amber darken-3" text @click="save()">
                Сохранить
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon small class="mr-2" @click="editCompany(item)">
        mdi-pencil
      </v-icon>
      <v-icon small class="mr-2" @click="deleteCompany(item)">
        mdi-delete
      </v-icon>
    </template>
  </v-data-table>
</template>
<script>
import { mapActions, mapState } from "vuex";
export default {
  layout: "default",
  data() {
    return {
      headers: [
        {
          text: "Наименование компании",
          align: "center",
          value: "fullname",
          sortable: false,
        },
        {
          text: "Сокращение",
          align: "center",
          value: "shortname",
          sortable: false,
        },
        {
          text: "Идентификатор руководителя",
          align: "center",
          value: "leader_id",
          sortable: false,
        },
        {
          text: "Редактирование",
          align: "center",
          value: "actions",
          sortable: false,
        },
      ],
      editedIndex: -1,
      editedItem: {
        fullname: "",
        shortname: "",
        leader_id: 0,
        id: 0,
      },
      defaultItem: {
        fullname: "",
        shortname: "",
        leader_id: 0,
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
  computed: {
    ...mapState({ companies: (state) => state.companies.companies }),
    formTitle() {
      return this.editedIndex < 0
        ? "Новая компания"
        : "Редактирование компании";
    },
  },
  mounted() {
    this.actionIndex();
  },
  methods: {
    ...mapActions({
      actionIndex: "companies/actionIndex",
      updateAction: "companies/updateAction",
      deleteAction: "companies/deleteAction",
      createAction: "companies/createAction",
    }),
    deleteCompany(item) {
      confirm("Вы действительно хотите удалить компанию?") &&
        this.deleteAction(item.id);
    },
    editCompany(item) {
      this.editedIndex = this.companies.indexOf(item);
      this.editedItem = { ...item };
      this.dialog = true;
    },
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = { ...this.defaultItem };
        this.editedIndex = -1;
      });
    },
    save() {
      if (this.editedIndex > -1) {
        this.updateAction(this.editedItem);
      } else {
        this.createAction(this.editedItem);
      }
      this.close();
    },
  },
};
</script>
