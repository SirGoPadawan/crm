<template>
  <v-app id="inspire" class="overflow-hidden" style="position: relative">
    <v-header :setDrawer="setDrawer" />
    <v-main fluid>
      <v-nav-bar :drawer="drawer" />
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>
<script>
export default {
  data() {
    return {
      drawer: null,
    };
  },
  components: {
    "v-header": () => import("../components/VHeader"),
    "v-nav-bar": () => import("../components/VNavBar"),
  },
  methods: {
    setDrawer() {
      this.drawer = !this.drawer;
    },
  },
};
</script>
<style scoped></style>
