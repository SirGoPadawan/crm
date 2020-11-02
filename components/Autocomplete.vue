<template>
  <div>
    <v-autocomplete
      v-model="model"
      clearable
      solo
      placeholder="Placeholder..."
      :items="items"
      item-value="id"
      item-text="fullname"
    ></v-autocomplete>
    <v-expand-transition>
      <v-list v-if="model">
        <v-list-item-title class="mb-10 pa-2">
          <v-btn @click="saveChanges(fields)">Сохранить</v-btn>
        </v-list-item-title>
        <v-list-item v-for="(field, i) in fields" :key="i">
          <v-list-item-content class="d-flex justify-space-between">
            <v-text-field
              label="Фамилия"
              v-model="field.last_name"
              outlined
              class="mr-1"
            />
            <v-text-field
              label="Имя"
              v-model="field.first_name"
              outlined
              class="mr-1"
            />
            <v-text-field
              label="Отчество"
              v-model="field.patronymic"
              outlined
              class="mr-1"
            />
            <v-text-field
              label="Email"
              v-model="field.email"
              outlined
              class="mr-1"
            />
            <v-text-field label="Телефон" v-model="field.phone" outlined />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-expand-transition>
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";

export default {
  data() {
    return {
      model: null,
      isDisabled: true,
    };
  },
  computed: {
    ...mapState({ entries: (state) => state.users.entries }),
    items() {
      return this.entries.map((item) => {
        const fullname = `${item.last_name +
          " " +
          item.first_name +
          " " +
          item.patronymic}`;

        return { ...item, fullname };
      });
    },
    fields() {
      if (!this.model) return [];
      return [{ ...this.entries.find((elem) => elem.id === this.model) }];
    },
  },
  mounted() {
    this.actionGetUsers();
  },
  methods: {
    ...mapActions({
      actionGetUsers: "users/actionGetUsers",
      updateAction: "users/updateAction",
    }),

    saveChanges(fields) {
      this.updateAction(fields[0]);
    },
  },
};
</script>
