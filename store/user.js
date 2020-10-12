import Api from "../Api";

export default {
  actions: {
    async updateImg(ctx, file) {
      const token = JSON.parse(window.localStorage.getItem("token")).token;
      const formData = new FormData();
      formData.append("image", file);
      formData.append("userPhone", "89999999989");
      const params = {
        method: "POST",
        body: formData,
      };
      const url = "http://localhost:8080/uploadimg";
      await new Api(token).fetch(url, params).then((res) => console.log(res));
    },
  },
};
