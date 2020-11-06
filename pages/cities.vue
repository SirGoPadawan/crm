<template>
  <v-data-table :headers="headers" :items="cities" class="elevation-1">
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title> Города </v-toolbar-title>
        <v-spacer />
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="amber darken-3" dark v-bind="attrs" v-on="on">
              Новый город
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>
            <v-card-text>
              <v-text-field
                v-model="editedItem.city"
                label="Название"
              ></v-text-field>
            </v-card-text>
            <v-card-actions>
              <v-spacer />
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
      <v-icon small class="mr-2" @click="editCity(item)">
        mdi-pencil
      </v-icon>
      <v-icon small class="mr-2" @click="deleteCity(item)">
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
          text: "Наименование города",
          align: "center",
          value: "city",
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
        city: "",
        id: 0,
      },
      defaultItem: {
        city: "",
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
    ...mapState({ cities: (state) => state.cities.cities }),
    formTitle() {
      return this.editedIndex < 0 ? "Новый город" : "Редактирование";
    },
  },
  mounted() {
    this.actionIndex();
  },
  methods: {
    ...mapActions({
      actionIndex: "cities/actionIndex",
      updateAction: "cities/updateAction",
      deleteAction: "cities/deleteAction",
      createAction: "cities/createAction",
    }),
    deleteCity(item) {
      confirm("Вы действительно хотите удалить город?") &&
        this.deleteAction(item.id);
    },
    editCity(item) {
      this.editedIndex = this.cities.indexOf(item);
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
