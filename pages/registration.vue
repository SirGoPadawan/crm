<template>
  <v-app id="inspire">
    <v-container fluid>
      <v-row>
        <v-col cols="4" class="form-body">
          <v-btn class="ma-2" outlined color="blue" @click="goToLogin()"
            >Форма авторизации</v-btn
          >
          <v-text-field
            v-model="firstname"
            :rules="[rules.required]"
            label="Имя"
            type="text"
          ></v-text-field>
          <v-text-field
            v-model="lastname"
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
            class="ma-2"
            outlined
            color="blue"
            :disabled="disabledSingUp"
            @click="regUser()"
            >Зарегистрироваться</v-btn
          >
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>
<script>
export default {
  data() {
    return {
      show: false,
      firstname: "",
      lastname: "",
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
        this.firstname &&
        this.lastname &&
        this.patronymic &&
        this.email &&
        this.phone.length >= 11 &&
        this.password.length >= 8
      );
    },
  },
  methods: {
    goToLogin() {
      this.$router.push("login");
    },
    regUser() {
      //try catch
      const newUser = {
        firstname: this.firstname,
        lastname: this.lastname,
        patronymic: this.patronymic,
        email: this.email,
        phone: this.phone,
        password: this.password,
      };
      const url = "http://localhost:8080/registration";
      fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      })
        .then((res) => res.json())
        .then((res) => console.log(res));
    },
  },
};
</script>
<style>
.form-body {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.row {
  justify-content: center;
}
.v-btn__content {
  font-size: 0.55rem;
}
</style>
