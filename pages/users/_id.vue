<template>
  <v-card class="user pa-4">
    <section class="img-container">
      <v-img :src="user.path_img" aspect-ratio="1" alt="тут кооотик" />
    </section>
    <section class="user__about pa-2 pl-10">
      <v-text-field :value="user.last_name" label="Фамилия" disabled>
      </v-text-field>
      <v-text-field :value="user.first_name" label="Имя" disabled>
      </v-text-field>
      <v-text-field :value="user.patronymic" label="Отчество" disabled>
      </v-text-field>
      <v-text-field :value="user.email" label="Email" disabled></v-text-field>
      <v-text-field :value="user.phone" label="Телефон" disabled>
      </v-text-field>
    </section>
    <section class="edit-menu">
      <v-edit-user :user="user" />
      <v-edit-user-img :id="idUser" />
      <v-btn color="amber darken-3" dark text @click="deleteUser()">
        <v-icon>
          mdi-delete
        </v-icon>
      </v-btn>
    </section>
  </v-card>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  layout: "default",
  components: {
    "v-edit-user": () => import("../../components/VEditUser"),
    "v-edit-user-img": () => import("../../components/EditImgUser"),
  },
  data() {
    return {
      file: null,
      idUser: this.$route.params.id,
      user: null,
    };
  },
  computed: {
    ...mapGetters({ getUser: "users/getUser" }),
  },
  created() {
    this.user = this.getUser(this.idUser);
  },
  methods: {
    ...mapActions({ deleteAction: "users/deleteAction" }),
    deleteUser() {
      confirm("Вы действительно хотите удалить запись?") &&
        this.deleteAction(this.idUser);
      this.$router.push({ path: "/users/" });
    },
  },
};
</script>
<style scoped>
.edit-menu {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100px;
  padding: 5px;
}
.v-image {
  width: 208px;
  height: 208px;
  border-radius: 50%;
}
.img-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 100%;
}
.user {
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  max-width: 50%;
}
.user__about {
  width: 50%;
  height: inherit;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>
