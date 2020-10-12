<template>
  <v-data-table :headers="headers" :items="services" class="elevation-1">
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title> Услуги </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark v-bind="attrs" v-on="on">
              Новая услуга
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.name"
                      label="Услуга"
                    ></v-text-field>
                  </v-col>
                </v-row>
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
      <v-icon small class="mr-2" @click="editService(item)">
        mdi-pencil
      </v-icon>
      <v-icon small @click="deleteService(item)"> mdi-delete </v-icon>
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
          value: "name",
          sortable: false,
        },

        {
          text: "Действия с услугами",
          align: "center",
          value: "actions",
          sortable: false,
        },
      ],
      editedIndex: -1,
      editedItem: {
        name: "",
        ID: 0,
      },
      defaultItem: {
        name: "",
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
    formTitle() {
      return this.editedIndex === -1 ? "Новая услуга" : "Переименовать";
    },
    ...mapState({ services: (state) => state.services.services }),
  },
  mounted() {
    this.getServices();
  },
  methods: {
    ...mapActions({
      getServices: "services/getServices",
      fetchApi: "services/fetchApi",
    }),
    deleteService(item) {
      confirm("Вы действительно хотите удалить запись?") &&
        this.fetchApi({ item, method: "DELETE" });
    },
    showModal() {
      this.dialog = true;
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
        this.fetchApi({
          item: this.editedItem,
          method: "PUT",
        });
      } else {
        this.fetchApi({
          item: this.editedItem,
          method: "POST",
        });
      }
      this.close();
    },
  },
};
</script>
