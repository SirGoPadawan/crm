export default {
  actions: {
    async setUser(ctx, user) {
      const params = {
        method: "POST",
        body: user,
      };
      const url = "http://localhost:8080/registration";
      const response = await this.$api.fetch(url, params);
      console.log(response);
    },
  },
};
