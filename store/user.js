import Api from "../Api";

let token = null;
if (process.browser) {
  token = JSON.parse(window.localStorage.getItem("token")).token;
}

export default {
  actions: {
    async updateImg(ctx, file) {
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
