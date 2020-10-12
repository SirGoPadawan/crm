<template>
  <v-card>
    <v-card-title>
      Города
      <v-spacer></v-spacer>
      <v-btn color="primary" @click="setСities()">
        Загрузить список городов
      </v-btn>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="cities"
      class="elevation-1"
      :loading="loading"
    >
    </v-data-table>
  </v-card>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  layout: "default",
  data() {
    return {
      loading: false,
      headers: [
        { text: "ID", value: "id" },
        { text: "Название города", value: "city" },
      ],
    };
  },
  methods: {
    ...mapActions({ getCities: "cities/getCities" }),
    setСities() {
      this.loading = true;
      this.getCities();
      this.loading = false;
    },
  },
  computed: {
    ...mapGetters({ cities: "cities/getCities" }),
  },
};
</script>
