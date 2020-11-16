<template>
  <v-app id="inspire" class="overflow-hidden" style="position: relative">
    <v-app-bar
      color="amber darken-3"
      elevate-on-scroll
      scroll-target="#scrolling-techniques-7"
      max-height="64px"
    >
      <v-app-bar-nav-icon @click.stop="setDrawer()"></v-app-bar-nav-icon>
      <v-spacer></v-spacer>
    </v-app-bar>
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
      drawer: false,
    };
  },
  components: {
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
