<template>
  <v-app id="inspire">
    <v-container>
      <div class="img-container">
        <v-img
          src="/cat.jpg"
          aspect-ratio="1"
          max-height="300"
          max-width="300"
        />
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
      <div class="list-unput">
        <v-input disabled>Айзербаджанов</v-input>
        <v-input disabled>Айзербаджан</v-input>
        <v-input disabled>Айзербаджанович</v-input>
      </div>
    </v-container>
  </v-app>
</template>
<script>
export default {
  data() {
    return {
      file: null,
    };
  },
  methods: {
    getImg(file) {
      this.file = file;
    },
    uploadImg() {
      if (this.file) {
        const url = "http://localhost:8080/uploadimg";
        const token = JSON.parse(localStorage.getItem("token"));
        let formData = new FormData();
        formData.append("image", this.file);
        formData.append("userPhone", "89999999989");
        fetch(url, {
          method: "POST",
          body: formData,
          headers: {
            Authentication: token.token,
          },
          content: "89999999989",
        })
          .then((res) => res.json())
          .then((res) => console.log(res));
        this.file = null;
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
  border-radius: 10px;
}
.container {
  display: flex;
  justify-content: space-between;
  max-width: 560px;
  margin: 0 auto;
  height: 400px;
  padding: 0;
  margin-top: 50px;
}
.list-unput {
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: baseline;
  border: 1px solid #18a0fb;
  border-radius: 10px;
  padding: 25px;
}
.img-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}
</style>
