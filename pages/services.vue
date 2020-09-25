<template>
  <v-app id="inspire">
    <v-container>
      <v-card-title>
        Услуги
        <v-spacer></v-spacer>
        <v-btn class="ma-2" outlined color="blue" @click="getServices()"
          >Список услуг</v-btn
        >
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="services"
        class="elevation-1"
        :loading="loading"
        hide-default-footer
      >
      </v-data-table>
    </v-container>
  </v-app>
</template>
<script>
export default {
  data() {
    return {
      loading: false,
      services: [],
      headers: [
        { text: "ID", align: "center", value: "id", sortable: false },
        {
          text: "Название услуги",
          align: "center",
          value: "name",
          sortable: false,
        },
      ],
    };
  },
  computed: {},
  methods: {
    getServices: async function() {
      this.loading = true;
      const url = "http://localhost:8080/services";
      const token = JSON.parse(localStorage.getItem("token"));
      async function services(url) {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            Authentication: token.token,
          },
        });
        return await response.json();
      }
      services(url).then((res) => {
        if (Array.isArray(res)) {
          this.services = res;
        } else {
          console.log(res);
        }
      });
      this.loading = false;
    },
  },
};
</script>
<style scoped>
.v-data-table,
.v-card__title {
  max-width: 600px;
  margin: 0 auto;
}
</style>
