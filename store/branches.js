import Api from "../Api";

export default {
  actions: {
    async actionIndex(ctx) {
      const url = "http://localhost:8080/branches";
      const token = JSON.parse(window.localStorage.getItem("token"));
      let promise = await new Api(token).fetch(url);
      if (!Array.isArray(promise)) {
        alert(promise.reason);
        promise = [];
        ctx.commit("setBranches", promise);
      }
      ctx.commit("setBranches", promise);
    },
    async updateAction(ctx, item) {
      const url = `http://localhost:8080/branches/${item.id}`;
      const token = JSON.parse(window.localStorage.getItem("token"));
      const params = {
        method: "PUT",
        body: JSON.stringify(item),
        headers: { "Content-Type": "application/json" },
      };
      const promise = await new Api(token).fetch(url, params);
      ctx.commit("updateBranches", promise);
    },
    async createAction(ctx, item) {
      const token = JSON.parse(window.localStorage.getItem("token"));
      const params = {
        method: "POST",
        body: JSON.stringify(item),
        headers: { "Content-Type": "application/json" },
      };
      const url = "http://localhost:8080/branches";
      const promise = await new Api(token).fetch(url, params);
      ctx.commit("createBranches", promise);
    },
    async deleteAction(ctx, id) {
      const token = JSON.parse(window.localStorage.getItem("token"));
      const params = {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      };
      const url = `http://localhost:8080/branches/${id}`;
      await new Api(token).fetch(url, params);
      ctx.commit("deleteBranches", id);
    },
  },
  state: () => ({
    branches: [],
  }),
  mutations: {
    setBranches(state, res) {
      state.branches = res;
    },
    updateBranches(state, promise) {
      let id = state.branches.findIndex(
        (elem) => Number(elem.id) === Number(promise[0].id)
      );
      state.branches.splice(id, 1);
      state.branches.push(promise[0]);
    },
    createBranches(state, promise) {
      state.branches.push(promise);
    },
    deleteBranches(state, id) {
      const index = state.branches.findIndex(
        (elem) => Number(elem.id) === Number(id)
      );
      state.branches.splice(index, 1);
    },
  },
};
