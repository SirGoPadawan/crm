<template>
  <v-card class="user pa-4">
    <div class="img-container">
      <v-img src="/cat.jpg" aspect-ratio="1" alt="тут кооотик" />
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
      <v-input disabled>Айзербаджанов</v-input>
      <v-input disabled>Айзербаджан</v-input>
      <v-input disabled>Айзербаджанович</v-input>
    </div>
  </v-card>
</template>
<script>
import { mapActions } from "vuex";
export default {
  layout: "default",
  data() {
    return {
      file: null,
    };
  },
  methods: {
    ...mapActions({ updateImg: "user/updateImg" }),
    getImg(file) {
      this.file = file;
    },
    uploadImg() {
      if (this.file) {
        this.updateImg(this.file);
      } else {
        console.log("Прикрепите изображение");
      }
    },
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
