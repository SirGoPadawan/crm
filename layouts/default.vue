<template>
  <v-app id="inspire" class="overflow-hidden" style="position: relative">
    <v-app-bar color="amber darken-3" fixed max-height="64px">
      <v-app-bar-nav-icon @click.stop="setDrawer()"></v-app-bar-nav-icon>
      <v-spacer />
      <v-select
        prepend-icon="mdi-map"
        placeholder="Ваш город..."
        color="amber darken-3"
        :items="items"
        v-model="city"
        class="mt-7 col-2"
        solo
        @change="setCity(city)"
      />
    </v-app-bar>
    <v-main fluid>
      <v-nav-bar :drawer="drawer" />
      <v-container class="mt-15">
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>
<script>
import { mapActions, mapState, mapMutations } from "vuex";

export default {
  data() {
    return {
      drawer: false,
      city: null,
    };
  },
  components: {
    "v-nav-bar": () => import("../components/VNavBar"),
  },
  methods: {
    ...mapActions({ actionIndex: "cities/actionIndex" }),
    ...mapMutations({ setCity: "conf/setCity" }),
    setDrawer() {
      this.drawer = !this.drawer;
    },
  },
  computed: {
    ...mapState({ cities: (state) => state.cities.cities }),
    items() {
      return this.cities.map((elem) => {
        return elem.city;
      });
    },
  },
  mounted() {
    this.actionIndex();
  },
};
</script>
