import Api from "../Api";

export default {
  actions: {
    async actionIndex(ctx) {
      const url = "http://localhost:8080/cities";
      const token = JSON.parse(window.localStorage.getItem("token"));
      let promise = await new Api(token).fetch(url);
      if (!Array.isArray(promise)) {
        alert(promise.reason);
        promise = [];
        ctx.commit("setCities", promise);
      }
      ctx.commit("setCities", promise);
    },
    async updateAction(ctx, item) {
      const url = `http://localhost:8080/cities/${item.id}`;
      const token = JSON.parse(window.localStorage.getItem("token"));
      const params = {
        method: "PUT",
        body: JSON.stringify(item),
        headers: { "Content-Type": "application/json" },
      };
      const promise = await new Api(token).fetch(url, params);
      ctx.commit("updateCity", promise);
    },
    async createAction(ctx, item) {
      const token = JSON.parse(window.localStorage.getItem("token"));
      const params = {
        method: "POST",
        body: JSON.stringify(item),
        headers: { "Content-Type": "application/json" },
      };
      const url = "http://localhost:8080/cities";
      const promise = await new Api(token).fetch(url, params);
      ctx.commit("createCity", promise);
    },
    async deleteAction(ctx, id) {
      const token = JSON.parse(window.localStorage.getItem("token"));
      const params = {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      };
      const url = `http://localhost:8080/cities/${id}`;
      await new Api(token).fetch(url, params);
      ctx.commit("deleteCity", id);
    },
  },
  state: () => ({
    cities: [],
  }),
  mutations: {
    setCities(state, res) {
      state.cities = res;
    },
    updateCity(state, promise) {
      let id = state.cities.findIndex(
        (elem) => Number(elem.id) === Number(promise[0].id)
      );
      state.cities.splice(id, 1);
      state.cities.push(promise[0]);
    },
    createCity(state, promise) {
      state.cities.push(promise);
    },
    deleteCity(state, id) {
      const index = state.cities.findIndex(
        (elem) => Number(elem.id) === Number(id)
      );
      state.cities.splice(index, 1);
    },
  },
};
