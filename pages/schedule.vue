<template>
  <v-card class="fill-height">
    <v-toolbar flat>
      <v-btn outlined class="mr-4" color="amber darken-3" @click="setToday">
        Сегодня
      </v-btn>
      <v-btn fab text small color="amber darken-3" @click="prev">
        <v-icon small>
          mdi-chevron-left
        </v-icon>
      </v-btn>
      <v-toolbar-title>
        {{ titleCalendar }}
      </v-toolbar-title>
      <v-btn fab text small color="amber darken-3" @click="next">
        <v-icon small>
          mdi-chevron-right
        </v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <v-menu bottom right>
        <template v-slot:activator="{ on }">
          <v-btn outlined color="amber darken-3" v-on="on">
            <span>{{ typeToLabel[type] }}</span>
            <v-icon right>
              mdi-menu-down
            </v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item @click="type = 'day'">
            <v-list-item-title>День</v-list-item-title>
          </v-list-item>
          <v-list-item @click="type = 'week'">
            <v-list-item-title>Неделя</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-toolbar>
    <v-calendar
      ref="calendar"
      v-model="focus"
      color="amber darken-3"
      :type="type"
      interval-count="32"
      interval-minutes="30"
      first-time="6"
      locale="ru"
      :short-intervals="false"
      :category-show-all="true"
      :weekdays="weekdays"
    />
    <v-menu v-model="selectedOpen" :activator="selectedElement" offset-x>
      <v-card color="amber darken-3" min-width="350px" flat>
        <v-toolbar dark>
          <v-toolbar-title></v-toolbar-title>
        </v-toolbar>
        <v-card-actions>
          <v-btn text color="secondary" @click="selectedOpen = false">
            Закрыть
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-menu>
  </v-card>
</template>
<script>
export default {
  data: () => ({
    titleCalendar: "",
    defaultTitle: "",
    focus: "",
    type: "week",
    typeToLabel: {
      week: "Неделя",
      day: "День",
    },
    weekdays: [1, 2, 3, 4, 5, 6, 0],
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false,
    countPrev: null,
  }),
  mounted() {
    this.$refs.calendar.checkChange();
    this.getTitleCalendar();
    this.defaultTitle = this.$refs.calendar.title;
  },
  methods: {
    getTitleCalendar() {
      this.titleCalendar = this.$refs.calendar.title;
    },
    viewDay({ date }) {
      this.focus = date;
      this.type = "week";
    },
    setToday() {
      this.focus = "";
      if (this.countPrev < 0) {
        this.countPrev = Math.abs(this.countPrev);
        this.$refs.calendar.next(this.countPrev);
      } else if (this.countPrev > 0) {
        this.$refs.calendar.prev(this.countPrev);
      }
      this.countPrev = null;
      this.titleCalendar = this.defaultTitle;
    },
    prev() {
      this.countPrev--;
      this.$refs.calendar.prev();
      this.getTitleCalendar();
    },
    next() {
      this.countPrev++;
      this.$refs.calendar.next();
      this.getTitleCalendar();
    },
  },
};
</script>
