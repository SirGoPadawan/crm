<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="amber darken-3" dark v-bind="attrs" v-on="on">
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
          >
          </v-file-input>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="amber darken-3" text @click="dialog = false">
          Загрузить
        </v-btn>
        <v-btn color="amber darken-3" text @click="dialog = false">
          Закрыть
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  data() {
    return {
      dialog: false,
    };
  },
};
</script>
