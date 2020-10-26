import Api from "../Api";

export default {
  actions: {
    async actionIndex(ctx) {
      const token = JSON.parse(window.localStorage.getItem("token"));
      const url = "http://localhost:8080/users";
      let promise = await new Api(token).fetch(url);
      if (!Array.isArray(promise)) {
        const textNoData = promise.reason;
        promise = [];
        ctx.commit("setError", textNoData);
        ctx.commit("setUsers", promise);
      }
      ctx.commit("setUsers", promise);
    },
    async createAction(ctx, item) {
      const token = JSON.parse(window.localStorage.getItem("token"));
      const url = "http://localhost:8080/users";
      const params = {
        method: "POST",
        body: JSON.stringify(item),
        headers: { "Content-Type": "application/json" },
      };
      const promise = await new Api(token).fetch(url, params);
      ctx.commit("createUser", promise);
    },
    async deleteAction(ctx, id) {
      const url = `http://localhost:8080/users/${id}`;
      const token = JSON.parse(window.localStorage.getItem("token"));
      const params = {
        method: "DELETE",
      };
      await new Api(token).fetch(url, params);
      ctx.commit("deleteUser", id);
    },
    async updateAction(ctx, item) {
      const url = `http://localhost:8080/users/${item.id}`;
      const token = JSON.parse(window.localStorage.getItem("token"));
      const params = {
        method: "PUT",
        body: JSON.stringify(item),
        headers: { "Content-Type": "application/json" },
      };
      const promise = await new Api(token).fetch(url, params);
      ctx.commit("updateUser", promise);
    },
    async uploadImg(ctx, { img, id }) {
      const token = JSON.parse(window.localStorage.getItem("token"));
      const url = `http://localhost:8080/users/${id}/uploadimg`;
      const params = {
        method: "POST",
        body: img,
      };
      const promise = await new Api(token).fetch(url, params);
      ctx.commit("updateUser", promise);
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
    setError(state, textNoData) {
      state.errMessage = textNoData;
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
