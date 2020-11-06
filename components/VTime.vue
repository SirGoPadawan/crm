<template>
  <v-dialog v-model="modal" persistent width="290px">
    <template v-slot:activator="{ on }">
      <v-text-field
        :value="value"
        :label="label"
        append-icon="mdi-clock-time-four-outline"
        readonly
        outlined
        v-on="on"
        :class="className"
      />
    </template>
    <v-time-picker
      v-if="modal"
      v-model="isTime"
      full-width
      format="24hr"
      :min="minTime"
      max="22:00"
    >
      <v-spacer />
      <v-btn text color="amber darken-3" @click="modal = false">
        Отмена
      </v-btn>
      <v-btn text color="amber darken-3" @click="setVal">
        Сохранить
      </v-btn>
    </v-time-picker>
  </v-dialog>
</template>
<script>
import dayjs from "dayjs";
export default {
  props: ["label", "value", "className", "min"],
  data() {
    return {
      modal: false,
      isTime: null,
    };
  },
  computed: {
    minTime() {
      return this.min === void 0
        ? "06:30"
        : dayjs(`0000-00-00 ${this.min}:00`)
            .add(30, "minute")
            .format("HH:mm");
    },
  },
  methods: {
    setVal() {
      this.$emit("input", this.isTime);
      this.modal = false;
    },
  },
};
</script>
