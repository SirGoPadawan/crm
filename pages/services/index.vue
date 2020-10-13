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
              <span class="headline">Новая услуга</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.service"
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
      <v-icon small class="mr-2" @click="goToService(item)">
        mdi-pencil
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
  },
  mounted() {
    this.getServices();
  },
  methods: {
    ...mapActions({
      getServices: "services/getServices",
      fetchApi: "services/fetchApi",
    }),
    /* deleteService(item) {
      confirm("Вы действительно хотите удалить запись?") &&
        this.fetchApi({
          item: JSON.stringify(item),
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        });
    }, */
    goToService(item) {
      console.log(item);
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
          item: JSON.stringify(this.editedItem),
          method: "PUT",
          headers: { "Content-Type": "application/json" },
        });
      } else {
        this.fetchApi({
          item: JSON.stringify(this.editedItem),
          method: "POST",
          headers: { "Content-Type": "application/json" },
        });
      }
      this.close();
    },
  },
};
</script>
