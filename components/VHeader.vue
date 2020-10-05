<template>
  <v-app-bar
    color="amber darken-3"
    elevate-on-scroll
    scroll-target="#scrolling-techniques-7"
    max-height="64px"
  >
    <v-app-bar-nav-icon @click.stop="setDrawer()"></v-app-bar-nav-icon>
    <v-spacer></v-spacer>
    <v-btn icon>
      <v-icon>mdi-magnify</v-icon>
    </v-btn>
    <v-btn icon>
      <v-icon>mdi-dots-vertical</v-icon>
    </v-btn>
  </v-app-bar>
</template>
<script>
export default {
  props: ["setDrawer"],
};
</script>
