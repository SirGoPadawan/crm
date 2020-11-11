export default {
  actions: {
    async reg(ctx, user) {
      const params = {
        method: "POST",
        body: JSON.stringify(user),
      };
      const url = "http://localhost:8080/login";
      const response = await this.$api.fetch(url, params);
      localStorage.setItem("token", JSON.stringify(response.token));
      localStorage.setItem(
        "refreshToken",
        JSON.stringify(response.refreshToken)
      );
    },
  },
};
