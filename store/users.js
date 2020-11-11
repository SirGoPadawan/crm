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
      ctx.commit("updateUser", promise);
    },
    async deleteAction(ctx, id) {
      const url = `/users/${id}`;
      await this.$api.actionDelete(url);
      ctx.commit("deleteUser", id);
    },
    async uploadImg(ctx, { img, id }) {
      const url = `http://localhost:8080/users/${id}/uploadimg`;
      const params = {
        method: "POST",
        body: img,
      };
      const response = await this.$api.fetch(url, params);
      ctx.commit("updateUser", response);
    },
  },
  state: () => ({
    users: [],
    errMessage: "",
  }),
  mutations: {
    setUsers(state, res) {
      state.users = res;
    },
    createUser(state, promise) {
      state.users.push(promise);
    },
    updateUser(state, promise) {
      const index = state.users.findIndex(
        (elem) => Number(elem.id) === Number(promise[0].id)
      );
      state.users.splice(index, 1);
      state.users.push(promise);
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
