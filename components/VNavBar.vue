<template>
  <v-sheet>
    <v-navigation-drawer v-model="draw" absolute temporary width="350">
      <v-list min-width="">
        <v-list-group
          color="amber darken-3"
          mandatory
          no-action
          sub-group
          v-for="(item, index) in items"
          :key="index"
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item
            v-for="(subitem, index) in item.sublist"
            :key="index"
            link
          >
            <v-list-item-title>{{ subitem.title }}</v-list-item-title>
            <!-- <v-list-item-icon>
              <v-icon v-text="icon"></v-icon>
            </v-list-item-icon> -->
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
  </v-sheet>
</template>
<script>
export default {
  props: ["drawer"],
  data() {
    return {
      draw: this.drawer,
      items: [
        {
          title: "Отчеты",
          sublist: [
            { title: "Статистика администратора" },
            { title: "Финансовый отчет" },
            { title: "Сертификаты" },
          ],
        },
        {
          title: "Справочники",
          sublist: [
            { title: "Пользователи" },
            { title: "Услуги" },
            { title: "Компании" },
          ],
        },
        { title: "Календарь", icon: "mdi-calendar" },
        {
          title: "Администрирование",
          sublist: [{ title: "Разрешения" }],
        },
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
