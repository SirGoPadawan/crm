import Api from "../Api";

export default {
  actions: {
    async actionIndex(ctx) {
      const url = "http://localhost:8080/records";
      const token = JSON.parse(window.localStorage.getItem("token"));
      let promise = await new Api(token).fetch(url);
      if (!Array.isArray(promise)) {
        alert(promise.reason);
        promise = [];
        ctx.commit("setRecords", promise);
      }
      ctx.commit("setRecords", promise);
    },
    async updateAction(ctx, item) {
      const url = `http://localhost:8080/records/${item.id}`;
      const token = JSON.parse(window.localStorage.getItem("token"));
      const params = {
        method: "PUT",
        body: JSON.stringify(item),
        headers: { "Content-Type": "application/json" },
      };
      const promise = await new Api(token).fetch(url, params);
      ctx.commit("updateRecords", promise);
    },
    async createAction(ctx, item) {
      const token = JSON.parse(window.localStorage.getItem("token"));
      const params = {
        method: "POST",
        body: JSON.stringify(item),
        headers: { "Content-Type": "application/json" },
      };
      const url = "http://localhost:8080/records";
      const promise = await new Api(token).fetch(url, params);
      ctx.commit("createRecords", promise);
    },
    async deleteAction(ctx, id) {
      const token = JSON.parse(window.localStorage.getItem("token"));
      const params = {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      };
      const url = `http://localhost:8080/records/${id}`;
      await new Api(token).fetch(url, params);
      ctx.commit("deleteRecords", id);
    },
  },
  state: () => ({
    records: [],
  }),
  mutations: {
    setRecords(state, promise) {
      state.records = promise;
    },
    updateRecords(state, promise) {
      let id = state.records.findIndex(
        (elem) => Number(elem.id) === Number(promise[0].id)
      );
      state.records.splice(id, 1);
      state.records.push(promise[0]);
    },
    createRecords(state, promise) {
      state.records.push(promise);
      console.log(state.records);
    },
    deleteRecords(state, id) {
      const index = state.records.findIndex(
        (elem) => Number(elem.id) === Number(id)
      );
      state.records.splice(index, 1);
    },
  },
};
