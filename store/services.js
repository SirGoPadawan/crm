import Api from "../Api";

export default {
  actions: {
    async actionIndex(ctx) {
      const url = "http://localhost:8080/services";
      const token = JSON.parse(window.localStorage.getItem("token"));
      let promise = await new Api(token).fetch(url);
      if (!Array.isArray(res)) {
        alert(promise.reason);
        promise = [];
        ctx.commit("setServices", promise);
      }
      ctx.commit("setServices", promise);
    },
    async updateAction(ctx, item) {
      const url = `http://localhost:8080/services/${item.id}`;
      const token = JSON.parse(window.localStorage.getItem("token"));
      const params = {
        method: "PUT",
        body: JSON.stringify(item),
        headers: { "Content-Type": "application/json" },
      };
      const promise = await new Api(token).fetch(url, params);
      ctx.commit("updateService", promise);
    },
    async createAction(ctx, item) {
      const token = JSON.parse(window.localStorage.getItem("token"));
      const params = {
        method: "POST",
        body: JSON.stringify(item),
        headers: { "Content-Type": "application/json" },
      };
      const url = "http://localhost:8080/services";
      const promise = await new Api(token).fetch(url, params);
      ctx.commit("createService", promise);
    },
    async deleteAction(ctx, id) {
      const token = JSON.parse(window.localStorage.getItem("token"));
      const params = {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      };
      const url = `http://localhost:8080/services/${id}`;
      await new Api(token).fetch(url, params);
      ctx.commit("deleteService", id);
    },
  },
  state: () => ({
    services: [],
  }),
  mutations: {
    setServices(state, res) {
      state.services = res;
    },
    updateService(state, promise) {
      let id = state.services.findIndex(
        (elem) => Number(elem.id) === Number(promise[0].id)
      );
      state.services.splice(id, 1);
      state.services.push(promise[0]);
    },
    createService(state, promise) {
      state.services.push(promise);
    },
    deleteService(state, id) {
      const index = state.services.findIndex(
        (elem) => Number(elem.id) === Number(id)
      );
      state.services.splice(index, 1);
    },
  },
};
