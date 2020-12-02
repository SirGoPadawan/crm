<template>
  <v-navigation-drawer v-model="draw" absolute temporary width="350">
    <v-list>
      <v-list-group
        color="amber darken-3"
        v-for="(item, index) in items"
        sub-group
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
          :nuxt="true"
          :to="subitem.link"
        >
          <v-list-item-title>
            {{ subitem.title }}
          </v-list-item-title>
        </v-list-item>
      </v-list-group>
    </v-list>
  </v-navigation-drawer>
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
            { title: "Пользователи", link: "/users" },
            { title: "Услуги", link: "/services" },
            { title: "Компании", link: "/companies" },
          ],
        },
        {
          title: "Календарь",
          sublist: [
            { title: "Календарь записей", link: "/calendar" },
            { title: "График работы", link: "/schedule" },
          ],
        },
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
