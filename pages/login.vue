<template>
  <v-card min-width="400" dark class="pa-4">
    <v-card-title>Авторизация</v-card-title>
    <v-text-field
      type="tel"
      :rules="[rules.required]"
      append-icon="mdi-phone"
      label="Номер телефона"
      v-model="phone"
    >
    </v-text-field>
    <v-text-field
      :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
      :rules="[rules.required, rules.min]"
      :type="show ? 'text' : 'password'"
      label="Введите пароль"
      hint="Пароль должен содержать больше 8 символов"
      v-model="password"
      @click:append="show = !show"
    >
    </v-text-field>
    <v-btn
      class="mt-5 mb-5 btn-sing-in"
      color="primary"
      :disabled="disabledSingIn"
      @click="singIn()"
    >
      Войти
    </v-btn>
    <span>
      Нет учетной записи?
      <nuxt-link to="/registration">Создать</nuxt-link>
    </span>
  </v-card>
</template>
<script>
import Api from "../Api";
export default {
  layout: "noAuth",
  data() {
    return {
      phone: "",
      password: "",
      show: false,
      /* regExp: new RegExp(/[^A-Za-z_]|[A - Za - z]|[А - Яа - я]/), !this.regExp.test(this.tel) && */
      rules: {
        required: (value) => !!value || "Обязательно для заполнения",
        min: (v) => v.length >= 8 || "Минимум 8 символов",
      },
    };
  },
  computed: {
    disabledSingIn() {
      return !(this.phone && this.password.length >= 8);
    },
  },
  methods: {
    singIn() {
      const params = {
        method: "POST",
        body: JSON.stringify({
          phone: this.phone,
          password: this.password,
        }),
      };
      new Api().fetch("http://localhost:8080/login", params).then((res) => {
        console.log(res), localStorage.setItem("token", JSON.stringify(res));
      });
    },
  },
};
</script>
<style>
.v-btn__content {
  font-size: 0.75rem;
}
.v-input {
  width: 100%;
}
.v-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}
</style>
