<template>
  <v-data-table :headers="headers" :items="services" class="elevation-1">
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title> Услуги </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="amber darken-3" dark v-bind="attrs" v-on="on">
              Новая услуга
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>
            <v-card-text>
              <v-text-field
                v-model="editedItem.service"
                label="Наименование"
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
      <v-icon small class="mr-2" @click="editService(item)">
        mdi-pencil
      </v-icon>
      <v-icon small class="mr-2" @click="deleteService(item)">
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
          text: "Название услуги",
          align: "center",
          value: "service",
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
        service: "",
        ID: 0,
      },
      defaultItem: {
        service: "",
        ID: 0,
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
    ...mapState({ services: (state) => state.services.services }),
    formTitle() {
      return this.editedIndex < 0 ? "Новая услуга" : "Редактирование услуги";
    },
  },
  mounted() {
    this.actionIndex();
  },
  methods: {
    ...mapActions({
      actionIndex: "services/actionIndex",
      updateAction: "services/updateAction",
      deleteAction: "services/deleteAction",
      createAction: "services/createAction",
    }),
    deleteService(item) {
      confirm("Вы действительно хотите удалить запись?") &&
        this.deleteAction(item.id);
    },
    editService(item) {
      this.editedIndex = this.services.indexOf(item);
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
