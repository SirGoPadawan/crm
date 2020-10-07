import Api from "../Api";

export default {
  actions: {
    async setUser(ctx, user) {
      const params = {
        method: "POST",
        body: user,
      };
      const url = "http://localhost:8080/registration";
      await new Api().fetch(url, params).then((res) => console.log(res));
    },
  },
};
