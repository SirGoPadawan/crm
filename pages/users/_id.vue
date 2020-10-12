<template>
  <v-card class="user pa-4">
    <div class="img-container">
      <v-img :src="user.path_img" aspect-ratio="1" alt="тут кооотик" />
      <v-file-input
        accept="image/png, image/jpeg, image/bmp"
        placeholder="Выберите аватар"
        prepend-icon="mdi-camera"
        label="Аватар"
        @change="getImg"
      ></v-file-input>
      <v-btn outlined color="blue" @click="uploadImg()"
        >Загрузить фотографию</v-btn
      >
    </div>
    <div class="user__about pa-2 pl-10">
      <v-input disabled>{{ user.last_name }}</v-input>
      <v-input disabled>{{ user.first_name }}</v-input>
      <v-input disabled>{{ user.patronymic }}</v-input>
      <v-input disabled>{{ user.email }}</v-input>
      <v-input disabled>{{ user.phone }}</v-input>
    </div>
  </v-card>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  layout: "default",
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
  methods: {
    ...mapActions({ fetchApi: "users/fetchApi" }),
    getImg(file) {
      this.file = file;
    },
    uploadImg() {
      if (this.file) {
        const formData = new FormData();
        formData.append("image", this.file);
        formData.append("userPhone", `${this.user.phone}`);
        this.fetchApi({
          item: formData,
          headers: {},
          method: "POST",
          url: "http://localhost:8080/uploadimg",
        });
      } else {
        console.log("Прикрепите изображение");
      }
    },
  },
  created() {
    this.user = this.getUser(this.idUser);
    console.log(this.user);
  },
};
</script>
<style scoped>
.img-upload-input {
  display: none;
}
.img-input-label {
  border: 1px solid #18a0fb;
  border-radius: 5px;
  cursor: pointer;
  padding: 5px 20px;
  color: #2196f3;
  font-size: 1.1rem;
  text-align: center;
  letter-spacing: 0.8px;
}
.img-input-label:hover {
  background-color: #f5fbff;
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
.v-input {
  flex: 0 0 auto;
}
</style>
