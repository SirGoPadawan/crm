<template>
  <v-dialog v-model="dialog" max-width="600px">
    <template v-slot:activator="{ on }">
      <v-btn color="amber darken-3" dark v-on="on">
        <v-icon>mdi-image-frame</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        Смена изображения профиля
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-file-input
            accept="image/png, image/jpeg, image/bmp"
            placeholder="Выберите аватар"
            prepend-icon="mdi-camera"
            label="Аватар"
            @change="getImg"
          >
          </v-file-input>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="amber darken-3" text @click="uploadImg()">
          Загрузить
        </v-btn>
        <v-btn color="amber darken-3" text @click="close()">
          Закрыть
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import { mapActions } from "vuex";
export default {
  props: ["userPhone"],
  data() {
    return {
      dialog: false,
      file: null,
    };
  },
  methods: {
    ...mapActions({ fetchApi: "users/fetchApi" }),
    close() {
      this.dialog = false;
    },
    getImg(file) {
      this.file = file;
    },
    uploadImg() {
      console.log(!!this.file);
      if (this.file) {
        const formData = new FormData();
        formData.append("image", this.file);
        formData.append("userPhone", `${this.userPhone}`);
        this.fetchApi({
          item: formData,
          method: "POST",
          url: "http://localhost:8080/users/uploadimg",
        });
        this.dialog = false;
      } else {
        alert("Прикрепите изображение");
      }
    },
  },
};
</script>
