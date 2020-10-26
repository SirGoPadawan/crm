<template>
  <v-data-table :headers="headers" :items="branches" class="elevation-1">
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title> Филиалы </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="amber darken-3" dark v-bind="attrs" v-on="on">
              Новый филиал
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>
            <v-card-text>
              <v-text-field
                v-model="editedItem.branch_name"
                label="Название филиала"
              ></v-text-field>
              <v-text-field
                v-model="editedItem.company_id"
                label="Идентификатор компании"
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
      <v-icon small class="mr-2" @click="editBranch(item)">
        mdi-pencil
      </v-icon>
      <v-icon small class="mr-2" @click="deleteBranch(item)">
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
          text: "Наименование филиала",
          align: "center",
          value: "branch_name",
          sortable: false,
        },
        {
          text: "Идентификатор компании",
          align: "center",
          value: "company_id",
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
        branch_name: "",
        company_id: 0,
        id: 0,
      },
      defaultItem: {
        branch_name: "",
        company_id: 0,
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
    ...mapState({ branches: (state) => state.branches.branches }),
    formTitle() {
      return this.editedIndex < 0 ? "Новый филиал" : "Редактирование филиала";
    },
  },
  mounted() {
    this.actionIndex();
  },
  methods: {
    ...mapActions({
      actionIndex: "branches/actionIndex",
      updateAction: "branches/updateAction",
      deleteAction: "branches/deleteAction",
      createAction: "branches/createAction",
    }),
    deleteBranch(item) {
      confirm("Вы действительно хотите удалить филиал?") &&
        this.deleteAction(item.id);
    },
    editBranch(item) {
      this.editedIndex = this.branches.indexOf(item);
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
