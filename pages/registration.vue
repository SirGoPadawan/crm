<template>
  <v-card dark min-width="400" class="pa-4">
    <v-card-title>Регистрация</v-card-title>
    <v-text-field
      v-model="first_name"
      :rules="[rules.required]"
      label="Имя"
      type="text"
    ></v-text-field>
    <v-text-field
      v-model="last_name"
      :rules="[rules.required]"
      label="Фамилия"
      type="text"
    ></v-text-field>
    <v-text-field
      v-model="patronymic"
      :rules="[rules.required]"
      label="Отчество"
      type="text"
    ></v-text-field>
    <v-text-field
      v-model="email"
      :rules="[rules.required]"
      label="E-mail"
      type="email"
    ></v-text-field>
    <v-text-field
      v-model="phone"
      :rules="[rules.required]"
      label="Телефон"
      type="tel"
    ></v-text-field>
    <v-text-field
      :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
      v-model="password"
      :rules="[rules.required, rules.minPassSymb]"
      label="Пароль"
      :type="show ? 'text' : 'password'"
    ></v-text-field>
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
export default {
  layout: "noAuth",
  data() {
    return {
      show: false,
      first_name: "",
      last_name: "",
      patronymic: "",
      email: "",
      phone: "",
      password: "",
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
        this.phone.length >= 11 &&
        this.password.length >= 8
      );
    },
  },
  methods: {
    ...mapActions({ setUser: "registration/setUser" }),
    regUser() {
      const user = JSON.stringify({
        first_name: this.firstname,
        last_name: this.lastname,
        patronymic: this.patronymic,
        email: this.email,
        phone: this.phone,
        password: this.password,
      });
      this.setUser(user);
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
