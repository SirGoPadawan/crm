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
        @click:time-category="createEvent"
        locale="ru"
      />
      <v-dialog v-model="isOpenNewRecord" :activator="selectedNewElement">
        <v-card class="pa-5">
          <v-card-title class="pa-0 ma-0">
            Запись на {{ newRecord.date }} к
            {{ newRecord.category }}
          </v-card-title>
          <v-divider />
          <v-card-text>
            <div class="mt-5">
              <v-card-title>К кому записываемся</v-card-title>
              <div class="d-flex ">
                <v-text-field
                  label="Фамилия"
                  v-model="newRecord.last_name"
                  outlined
                  class="mr-1"
                />
                <v-text-field
                  label="Имя"
                  v-model="newRecord.first_name"
                  outlined
                  class="mr-1"
                />
                <v-text-field
                  label="Отчество"
                  v-model="newRecord.patronymic"
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
                placeholder="Выберите клиента"
                :items="clients"
                item-value="id"
                item-text="fullname"
              />
              <v-expand-transition>
                <v-list v-if="model">
                  <v-list-item
                    v-for="(field, index) in fields"
                    :key="index"
                    class="ma-0 pa-0"
                  >
                    <v-list-item-content
                      class="d-flex justify-space-between align-center"
                    >
                      <v-text-field
                        label="Фамилия"
                        v-model="field.last_name"
                        outlined
                        class="mb-0 mr-5"
                      />
                      <v-text-field
                        label="Имя"
                        v-model="field.first_name"
                        outlined
                        class="mb-0 mr-5"
                      />
                      <v-text-field
                        label="Отчество"
                        v-model="field.patronymic"
                        outlined
                        class="mb-0 mr-5"
                      />
                      <v-text-field
                        label="Email"
                        v-model="field.email"
                        outlined
                        class="mb-0 mr-5"
                      />
                      <v-text-field
                        label="Телефон"
                        v-model="field.phone"
                        outlined
                        class="mb-0 mr-5"
                      />
                      <v-time
                        label="Начало сеанса"
                        v-model="timeStart"
                        :className="`mr-5 mb-0`"
                      />
                      <v-time
                        label="Конец сеанса"
                        v-model="timeEnd"
                        :min="timeStart"
                      />
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-expand-transition>
              <v-card-title>Услуга</v-card-title>
              <v-autocomplete
                deletable-chips
                small-chips
                multiple
                v-model="modelService"
                clearable
                solo
                placeholder="Выберите услугу"
                :items="services"
                item-value="id"
                item-text="service"
              />
            </div>
          </v-card-text>
          <v-divider class="mb-10" />
          <v-btn text color="amber darken-3" @click="saveEvent">
            Сохранить
          </v-btn>
          <v-btn text color="amber darken-3" @click="isOpenNewRecord = false">
            Отмена
          </v-btn>
        </v-card>
      </v-dialog>
      <v-dialog
        v-model="isOpenSelected"
        :activator="selectedElement"
        width="500"
      >
        <v-card>
          <v-card-title class="mb-5 pa-2">
            {{ selectedRecord.name }}
          </v-card-title>
          <v-card-text
            class="pa-2"
            v-for="(item, index) in selectedRecord.details"
            :key="index"
          >
            <v-text-field
              disabled
              v-model="item.value"
              :label="item.label"
              outlined
            />
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text color="amber darken-3" @click="isOpenSelected = false">
              Закрыть
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-sheet>
  </v-card>
</template>
<script>
import { mapActions, mapState } from "vuex";
import dayjs from "dayjs";

export default {
  components: {
    "v-time": () => import("../components/VTime"), //@todo алиасы в вебпаке есть на папку components? тогда через алиас обращайся а не через ../
    // если компоненты будешь переносить / разбивать и тд. не прийдется переписывать пути тогда
  },
  layout: "default",
  data: () => ({
    focus: "",
    timeStart: null,
    timeEnd: null,
    selectedRecord: {},
    newRecord: {},
    selectedElement: null,
    selectedNewElement: null,
    isOpenSelected: false,
    isOpenNewRecord: false, //@todo в компоненте есть событие по его закрытии / так вынеси событие функцию и используй ее а не везде присваивай true / false. Разделение ответсвенности будет более явно
    model: null,
    modelService: null,
  }),
  computed: {
    ...mapState({
      users: (state) => state.users.users,
      services: (state) => state.services.services,
      records: (state) => state.records.records,
    }),
    categories() {
      return this.users.map((elem) => this.getFullName(elem));
    },
    clients() {
      return this.users.map((elem) => {
        return { ...elem, fullname: this.getFullName(elem) };
      });
    },
    fields() {
      if (!this.model) return [];
      return [{ ...this.users.find((elem) => elem.id === this.model) }];
    },
    events() {
      let preEvents = [];
      this.records.map((elem) => {
        const findedEmployee = this.getElemById(this.users, elem.employee_id);
        const findedClient = this.getElemById(this.users, elem.client_id);
        const details = [
          {
            label: "Клиент",
            value: this.getFullName(findedClient),
          },
          { label: "Начало сеанса", value: elem.start_record },
          { label: "Конец сеанса", value: elem.end_record },
          { label: "Продолжительность", value: elem.duration },
        ];
        const obj = {
          start: this.getDateTime(elem.date_recording, elem.start_record),
          end: this.getDateTime(elem.date_recording, elem.end_record),
          category: this.getFullName(findedEmployee),
          name: this.getTitle(elem.strServices, elem.start_record),
          details,
        };
        preEvents.push(obj);
      });
      if (this.records.length === 0) return [];
      return preEvents;
    },
  },
  mounted() {
    this.$refs.calendar.checkChange();
    this.actionIndex();
    this.actionGetServices();
  },
  methods: {
    ...mapActions({
      actionIndex: "users/actionIndex",
      actionGetServices: "services/actionIndex",
      actionCreateEvent: "records/createAction",
      /*  actionIndexRecords: "records/actionIndex" */
    }),
    //вспомогательные функции
    getTitle(str, time) {
      return `${str.trim().substring(0, str.length - 2) + " на " + time}`;
    },
    getElemById(array, id) {
      return array.find((el) => Number(el.id) === Number(id));
    },
    getFullName(elem) {
      return `${elem.last_name +
        " " +
        elem.first_name +
        " " +
        elem.patronymic}`;
    },
    getDateTime(date, time) {
      return dayjs(`${date}`).format("YYYY-MM-DD") + " " + time;
    },
    viewDay({ date }) {
      this.focus = date;
    },
    //закончились вспомогательные функции
    createEvent(event) {
      this.isOpenNewRecord = !this.isOpenNewRecord;
      const name = event.category.split(" ");
      const { last_name, first_name, patronymic, id } = this.clients.find(
        (elem) => elem.first_name === name[1]
      );
      this.newRecord = {
        category: event.category,
        last_name,
        first_name,
        patronymic,
        id,
      };
    },
    setToday() {
      this.focus = "";
    },
    saveEvent() {
      const timeArr = this.timeStart.split(":");
      const duration = dayjs(`0000-00-00 ${this.timeEnd}`)
        .subtract(timeArr[0], "hour")
        .subtract(timeArr[1], "minute")
        .format("HH:mm:ss");
      const item = {
        employee_id: this.newRecord.id,
        client_id: this.fields[0].id,
        services_id: this.modelService,
        date_recording: dayjs(this.newRecord.date).format("YYYY-MM-DD"),
        start_record: `${this.timeStart}:00`,
        end_record: `${this.timeEnd}:00`,
        duration,
      };
      this.actionCreateEvent(item);
      this.isOpenNewRecord = false;
      this.newRecord = {};
    },
    prev() {
      this.$refs.calendar.prev();
    },
    next() {
      this.$refs.calendar.next();
    },
    showEvent({ nativeEvent, event }) {
      const open = () => {
        this.selectedRecord = event;
        this.selectedElement = nativeEvent.target;
        this.isOpenSelected = true;
      };
      this.isOpenSelected = !this.isOpenSelected;
      open();
      nativeEvent.stopPropagation();
    },
  },
};
</script>
