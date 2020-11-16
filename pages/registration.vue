<template>
  <v-card dark min-width="400" class="pa-4">
    <v-card-title>Регистрация</v-card-title>
    <v-text-field
      v-model="first_name"
      :rules="[rules.required]"
      label="Имя"
      type="text"
    />
    <v-text-field
      v-model="last_name"
      :rules="[rules.required]"
      label="Фамилия"
      type="text"
    />
    <v-text-field
      v-model="patronymic"
      :rules="[rules.required]"
      label="Отчество"
      type="text"
    />
    <v-text-field
      v-model="email"
      :rules="[rules.required]"
      label="E-mail"
      type="email"
    />
    <v-text-field
      v-model="phone"
      :rules="[rules.required]"
      label="Телефон"
      type="tel"
    />
    <v-text-field
      :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
      v-model="password"
      :rules="[rules.required, rules.minPassSymb]"
      label="Пароль"
      :type="show ? 'text' : 'password'"
    />
    <v-dialog v-model="dialog" width="400">
      <template v-slot:activator="{ on }">
        <v-text-field v-on="on" label="Дата рождения" v-model="birthday" />
      </template>
      <v-card>
        <v-date-picker
          header-color="black"
          v-model="birthday"
          locale="ru"
          class="mt-5"
        />
        <v-spacer />
        <div class="mb-5">
          <v-btn @click="closeDate()">Закрыть</v-btn>
          <v-btn @click="dialog = false">Сохранить</v-btn>
        </div>
      </v-card>
    </v-dialog>
    <v-btn
      class="mb-3"
      color="primary"
      :disabled="disabledSingUp"
      @click="regUser()"
      >Зарегистрироваться
    </v-btn>
    <span>
      Уже есть учетная запись?
      <nuxt-link to="/">Войти</nuxt-link>
    </span>
  </v-card>
</template>
<script>
import { mapActions } from "vuex";
import dayjs from "dayjs";

export default {
  layout: "noAuth",
  data() {
    return {
      dialog: false,
      show: false,
      first_name: "",
      last_name: "",
      patronymic: "",
      email: "",
      phone: "",
      password: "",
      birthday: null,
      minLengthPass: 8,
      minLengthPhone: 11,
      defaultDate: dayjs().format("YYYY-MM-DD"),
      rules: {
        required: (value) => !!value || "Обязательно для заполнения",
        minPassSymb: (v) =>
          v.length >= 8 || "Пароль должен быть больше 8 символов",
      },
    };
  },
  computed: {
    disabledSingUp() {
      return !(
        this.first_name &&
        this.last_name &&
        this.patronymic &&
        this.email &&
        this.phone.length >= this.minLengthPhone &&
        this.password.length >= this.minLengthPass &&
        this.birthday
      );
    },
  },
  methods: {
    ...mapActions({ registrationAction: "users/registrationAction" }),
    regUser() {
      const user = {
        first_name: this.first_name,
        last_name: this.last_name,
        patronymic: this.patronymic,
        email: this.email,
        phone: this.phone,
        password: this.password,
        birthday: this.birthday,
      };
      this.registrationAction(user);
    },
    closeDate() {
      this.birthday = null;
      this.dialog = false;
    },
  },
};
</script>
<style scoped>
.v-btn__content {
  font-size: 0.75rem;
}
.v-input {
  width: 100%;
}
.v-card__title {
  width: max-content;
}
</style>
