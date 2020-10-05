<template>
  <v-sheet>
    <v-navigation-drawer v-model="draw" absolute temporary>
      <v-list>
        <v-list-item-group
          color="amber darken-3"
          mandatory
          v-model="model"
          :value="true"
          no-action
          sub-group
        >
          <v-list-item v-for="item in items" :key="item.title" link>
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item-content>
            </template>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </v-sheet>
</template>
<script>
export default {
  props: ["drawer"],
  data() {
    return {
      model: 1,
      draw: this.drawer,
      items: [
        { title: "Отчеты", icon: "mdi-file-chart" },
        { title: "Справочники", icon: "mdi-book" },
        { title: "Календарь", icon: "mdi-calendar" },
        { title: "Администрирование", icon: "mdi-security" },
      ],
    };
  },
  watch: {
    drawer: function(newVal, oldVal) {
      this.draw = true;
    },
  },
};
</script>
