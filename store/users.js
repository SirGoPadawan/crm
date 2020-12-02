export default {
  actions: {
    async actionIndex(ctx) {
      const url = "/users";
      const response = await this.$api.actionIndex(url);
      ctx.commit("setUsers", response);
    },
    async createAction(ctx, item) {
      const url = "/users";
      const response = await this.$api.actionCreate(url, item);
      ctx.commit("createUser", response);
    },
    async updateAction(ctx, item) {
      const url = `/users/${item.id}`;
      const response = await this.$api.actionUpdate(url, params);
      ctx.commit("updateUser", response);
    },
    async deleteAction(ctx, id) {
      const url = `/users/${id}`;
      await this.$api.actionDelete(url);
      ctx.commit("deleteUser", id);
    },
    async uploadImg(ctx, { img, id }) {
      const url = `/users/${id}/uploadimg`;
      const params = {
        method: "POST",
        body: img,
      };
      const response = await this.$api.fetch(url, params);
      ctx.commit("updateUser", response);
    },
    async registrationAction(ctx, user) {
      const url = "/users/registration";
      const params = {
        method: "POST",
        body: JSON.stringify(user),
        headers: { "Content-Type": "application/json" },
      };
      await this.$api.fetch(url, params);
    },
    async actionLogin(ctx, user) {
      const params = {
        method: "POST",
        body: JSON.stringify(user),
        headers: { "Content-Type": "application/json" },
      };
      const url = "/users/login";
      const response = await this.$api.fetch(url, params);
      localStorage.setItem("token", JSON.stringify(response.token));
      localStorage.setItem(
        "refreshToken",
        JSON.stringify(response.refreshToken)
      );
    },
  },
  state: () => ({
    users: [],
  }),
  mutations: {
    setUsers(state, response) {
      state.users = response;
    },
    createUser(state, response) {
      state.users.push(response);
    },
    updateUser(state, response) {
      const index = state.users.findIndex(
        (elem) => Number(elem.id) === Number(response[0].id)
      );
      state.users.splice(index, 1);
      state.users.push(response);
    },
    deleteUser(state, id) {
      const index = state.users.findIndex(
        (elem) => Number(elem.id) === Number(id)
      );
      state.users.splice(index, 1);
    },
  },
  getters: {
    getUser: (state) => (id) =>
      state.users.find((elem) => Number(elem.id) === Number(id)),
  },
};
