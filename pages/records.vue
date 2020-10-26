<template>
  <v-data-table :headers="headers" :items="records" class="elevation-1">
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title> Записи </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="amber darken-3" dark v-bind="attrs" v-on="on">
              Новая запись
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>
            <v-card-text>
              <v-text-field
                v-model="editedItem.client_id"
                label="Идентификатор клиента"
              ></v-text-field>
              <v-text-field
                v-model="editedItem.employee_id"
                label="Идентификатор сотрудника"
              ></v-text-field>
              <v-text-field
                v-model="editedItem.service_id"
                label="Идентификатор услуги"
              ></v-text-field>
              <v-text-field
                v-model="editedItem.date_recording"
                label="Время записи"
              ></v-text-field>
              <v-text-field
                v-model="editedItem.duration"
                label="Продолжительность сеанса"
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
      <v-icon small class="mr-2" @click="editRecord(item)">
        mdi-pencil
      </v-icon>
      <v-icon small class="mr-2" @click="deleteRecord(item)">
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
          text: "Идентификатор клиента",
          align: "center",
          value: "client_id",
          sortable: false,
        },
        {
          text: "Идентификатор услуги",
          align: "center",
          value: "service_id",
          sortable: false,
        },
        {
          text: "Идентификатор сотрудника",
          align: "center",
          value: "employee_id",
          sortable: false,
        },
        {
          text: "Время записи",
          align: "center",
          value: "date_recording",
          sortable: false,
        },
        {
          text: "Продолжительность сеанса",
          align: "center",
          value: "duration",
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
        client_id: 0,
        service_id: 0,
        employee_id: 0,
        duration: 0,
        date_recording: 0,
        id: 0,
      },
      defaultItem: {
        client_id: 0,
        service_id: 0,
        employee_id: 0,
        duration: 0,
        date_recording: 0,
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
    ...mapState({ records: (state) => state.records.records }),
    formTitle() {
      return this.editedIndex < 0 ? "Новая запись" : "Редактирование записи";
    },
  },
  mounted() {
    this.actionIndex();
  },
  methods: {
    ...mapActions({
      actionIndex: "records/actionIndex",
      updateAction: "records/updateAction",
      deleteAction: "records/deleteAction",
      createAction: "records/createAction",
    }),
    deleteRecord(item) {
      confirm("Вы действительно хотите удалить запись?") &&
        this.deleteAction(item.id);
    },
    editRecord(item) {
      this.editedIndex = this.records.indexOf(item);
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
