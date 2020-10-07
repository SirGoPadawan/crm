import Api from "../Api";

export default {
  actions: {
    async reg(ctx, user) {
      const params = {
        method: "POST",
        body: user,
      };
      const url = "http://localhost:8080/login";
      await new Api().fetch(url, params).then((res) => {
        console.log(res), localStorage.setItem("token", JSON.stringify(res));
      });
    },
  },
};
