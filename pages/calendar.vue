<template>
  <v-card class="fill-height">
    <v-sheet height="64">
      <v-toolbar flat>
        <v-btn outlined class="mr-4" color="amber darken-3" @click="setToday">
          Сегодня
        </v-btn>
        <v-btn fab text small color="amber darken-3" @click="prev">
          <v-icon small>
            mdi-chevron-left
          </v-icon>
        </v-btn>
        <v-toolbar-title v-if="$refs.calendar">
          {{ $refs.calendar.title }}
        </v-toolbar-title>
        <v-btn fab text small color="amber darken-3" @click="next">
          <v-icon small>
            mdi-chevron-right
          </v-icon>
        </v-btn>
      </v-toolbar>
    </v-sheet>
    <v-sheet height="600">
      <v-calendar
        ref="calendar"
        v-model="focus"
        color="amber darken-3"
        :events="events"
        :categories="categories"
        interval-count="32"
        interval-minutes="30"
        first-time="6"
        type="category"
        :short-intervals="false"
        :category-show-all="true"
        @click:event="showEvent"
        @click:time-category="test"
        locale="ru"
      ></v-calendar>
      <v-dialog v-model="openNewEvent" :activator="selectedNewElement">
        <v-card class="pa-5">
          <v-card-title class="pa-0 ma-0">
            Запись на {{ selectedNewEvent.date }} к
            {{ selectedNewEvent.category }}
          </v-card-title>
          <v-divider />
          <v-card-text>
            <div class="mt-5">
              <v-card-title>К кому записываемся</v-card-title>
              <div class="d-flex ">
                <v-text-field
                  label="Фамилия"
                  v-model="selectedNewEvent.employeeLastName"
                  outlined
                  class="mr-1"
                />
                <v-text-field
                  label="Имя"
                  v-model="selectedNewEvent.employeeFirstName"
                  outlined
                  class="mr-1"
                />
                <v-text-field
                  label="Отчество"
                  v-model="selectedNewEvent.employeePatronymic"
                  outlined
                  class="mr-1"
                />
              </div>
            </div>
            <div>
              <v-card-title>Клиент</v-card-title>
              <v-autocomplete
                v-model="model"
                clearable
                solo
                placeholder="Placeholder..."
                :items="items"
                item-value="id"
                item-text="fullname"
              />
              <v-expand-transition>
                <v-list v-if="model">
                  <v-list-item
                    v-for="(field, i) in fields"
                    :key="i"
                    class=" ma-0 pa-0"
                  >
                    <v-list-item-content class="d-flex justify-space-between">
                      <v-text-field
                        label="Фамилия"
                        v-model="field.last_name"
                        outlined
                        class="mr-1"
                      />
                      <v-text-field
                        label="Имя"
                        v-model="field.first_name"
                        outlined
                        class="mr-1"
                      />
                      <v-text-field
                        label="Отчество"
                        v-model="field.patronymic"
                        outlined
                        class="mr-1"
                      />
                      <v-text-field
                        label="Email"
                        v-model="field.email"
                        outlined
                        class="mr-1"
                      />
                      <v-text-field
                        label="Телефон"
                        v-model="field.phone"
                        outlined
                      />
                      <v-text-field
                        type="time"
                        outlined
                        label="Начало сеанса"
                        :min="min"
                        max="22:00"
                      />
                      <v-text-field
                        type="time"
                        outlined
                        label="Конец сеанса"
                        :min="min"
                        max="22:00"
                      />
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-expand-transition>
            </div>
          </v-card-text>
        </v-card>
      </v-dialog>
      <v-dialog v-model="selectedOpen" :activator="selectedElement">
        <v-card>
          <v-toolbar :color="selectedEvent.color">
            <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
          </v-toolbar>
          <v-card-text class="pa-2"> </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text color="amber darken-3" @click="selectedOpen = false">
              Отмена
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-sheet>
  </v-card>
</template>
<script>
import { mapActions, mapState } from "vuex";

export default {
  layout: "default",
  data: () => ({
    focus: "",
    selectedEvent: {},
    selectedNewEvent: {},
    selectedElement: null,
    selectedNewElement: null,
    selectedOpen: false,
    openNewEvent: false,
    model: null,
    min: "06:00",
    events: [
      {
        start: "2020-10-29 07:40",
        end: "2020-10-29 08:30",
        name: "Генадий Пучков",
        color: "amber darken-3",
        details: [{ value: "test", label: "test" }],
        category: "Зурабов Коля Колянович",
      },
      {
        start: "2020-10-29 08:40",
        end: "2020-10-29 09:30",
        name: "Косипоша",
        color: "amber darken-3",
        details: [{ value: "test", label: "test" }],
        category: "Хуектов Катя Котеевна",
      },
    ],
  }),
  computed: {
    ...mapState({
      employes: (state) => state.users.users,
      entries: (state) => state.users.entries,
    }),
    categories() {
      let arr = [];
      this.employes.map((elem) => {
        arr.push(
          `${elem.last_name + " " + elem.first_name + " " + elem.patronymic}`
        );
      });
      return arr;
    },
    items() {
      return this.entries.map((item) => {
        const fullname = `${item.last_name +
          " " +
          item.first_name +
          " " +
          item.patronymic}`;

        return { ...item, fullname };
      });
    },
    fields() {
      if (!this.model) return [];
      return [{ ...this.entries.find((elem) => elem.id === this.model) }];
    },
  },
  mounted() {
    this.$refs.calendar.checkChange();
    this.actionIndex();
    this.actionGetUsers();
  },
  methods: {
    ...mapActions({
      actionIndex: "users/actionIndex",
      actionGetUsers: "users/actionGetUsers",
    }),
    viewDay({ date }) {
      this.focus = date;
      this.type = "day";
    },
    test(event) {
      if (this.openNewEvent) {
        this.openNewEvent = false;
      } else {
        this.openNewEvent = true;
        this.selectedNewEvent = event;
        const fullnameArr = event.category.split(" ");
        (this.selectedNewEvent = {
          ...this.selectedNewEvent,
          employeeLastName: fullnameArr[0],
          employeeFirstName: fullnameArr[1],
          employeePatronymic: fullnameArr[2],
        }),
          this.events.push({
            start: `${event.date + " " + event.time}`,
            end: `${event.date + " " + event.time}`,
            name: "Косипоша",
            color: "amber darken-3",
            details: [{ value: "test", label: "test" }],
            category: event.category,
          });
      }
    },
    setToday() {
      this.focus = "";
    },
    prev() {
      this.$refs.calendar.prev();
    },
    next() {
      this.$refs.calendar.next();
    },
    showEvent({ nativeEvent, event }) {
      const open = () => {
        this.selectedEvent = event;
        this.selectedElement = nativeEvent.target;
        setTimeout(() => {
          this.selectedOpen = true;
        }, 10);
      };
      if (this.selectedOpen) {
        this.selectedOpen = false;
        setTimeout(open, 10);
      } else {
        open();
      }
      nativeEvent.stopPropagation();
    },
  },
};
</script>
