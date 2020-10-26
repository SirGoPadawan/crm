import Api from "../Api";

export default {
  actions: {
    async actionIndex(ctx) {
      const url = "http://localhost:8080/companies";
      const token = JSON.parse(window.localStorage.getItem("token"));
      let promise = await new Api(token).fetch(url);
      if (!Array.isArray(promise)) {
        alert(promise.reason);
        promise = [];
        ctx.commit("setCompanies", promise);
      }
      ctx.commit("setCompanies", promise);
    },
    async updateAction(ctx, item) {
      const url = `http://localhost:8080/companies/${item.id}`;
      const token = JSON.parse(window.localStorage.getItem("token"));
      const params = {
        method: "PUT",
        body: JSON.stringify(item),
        headers: { "Content-Type": "application/json" },
      };
      const promise = await new Api(token).fetch(url, params);
      ctx.commit("updateCompanies", promise);
    },
    async createAction(ctx, item) {
      const token = JSON.parse(window.localStorage.getItem("token"));
      const params = {
        method: "POST",
        body: JSON.stringify(item),
        headers: { "Content-Type": "application/json" },
      };
      const url = "http://localhost:8080/companies";
      const promise = await new Api(token).fetch(url, params);
      ctx.commit("createCompanies", promise);
    },
    async deleteAction(ctx, id) {
      const token = JSON.parse(window.localStorage.getItem("token"));
      const params = {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      };
      const url = `http://localhost:8080/companies/${id}`;
      await new Api(token).fetch(url, params);
      ctx.commit("deleteCompanies", id);
    },
  },
  state: () => ({
    companies: [],
  }),
  mutations: {
    setCompanies(state, res) {
      state.companies = res;
    },
    updateCompanies(state, promise) {
      let id = state.companies.findIndex(
        (elem) => Number(elem.id) === Number(promise[0].id)
      );
      state.companies.splice(id, 1);
      state.companies.push(promise[0]);
    },
    createCompanies(state, promise) {
      state.companies.push(promise);
    },
    deleteCompanies(state, id) {
      const index = state.companies.findIndex(
        (elem) => Number(elem.id) === Number(id)
      );
      state.companies.splice(index, 1);
    },
  },
};
