<template>
  <v-app id="inspire">
    <v-container fluid>
      <v-row>
        <v-col cols="1" sm="3">
          <v-btn class="ma-2" outlined color="blue" @click="goToRegistration()"
            >Форма регистрации</v-btn
          >
          <v-text-field
            type="tel"
            :rules="[rules.required]"
            append-icon="mdi-phone"
            label="Номер телефона"
            v-model="phone"
          ></v-text-field>
          <v-text-field
            :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required, rules.min]"
            :type="show ? 'text' : 'password'"
            label="Введите пароль"
            hint="At least 8 characters"
            v-model="password"
            @click:append="show = !show"
          ></v-text-field>
          <v-btn
            class="ma-2 btn-sing-in"
            outlined
            color="blue"
            :disabled="disabledSingIn"
            @click="singIn()"
            >Войти</v-btn
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
      phone: "",
      password: "",
      show: false,
      /* regExp: new RegExp(/[^A-Za-z_]|[A - Za - z]|[А - Яа - я]/), !this.regExp.test(this.tel) && */

      rules: {
        required: (value) => !!value || "Обязательно для заполнения",
        min: (v) => v.length >= 8 || "Min 8 characters",
      },
    };
  },
  computed: {
    disabledSingIn() {
      return !(this.phone && this.password.length >= 8);
    },
  },
  methods: {
    goToRegistration: function() {
      this.$router.push("registration");
    },
    singIn: function() {
      const loginUser = {
        phone: this.phone,
        password: this.password,
      };
      const url = "http://localhost:8080/login";
      async function userLogin(url = "", data = {}) {
        const response = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        return await response.json();
      }
      userLogin(url, loginUser).then((res) => {
        console.log(res), localStorage.setItem("token", JSON.stringify(res));
      });
    },
  },
};
</script>
<style>
.row {
  justify-content: center;
}

.v-btn__content {
  font-size: 0.55rem;
}
</style>
