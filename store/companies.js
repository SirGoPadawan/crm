export default {
  actions: {
    async actionIndex(ctx) {
      const url = "/companies";
      const response = await this.$api.actionIndex(url);
      ctx.commit("setCompanies", response);
    },
    async updateAction(ctx, item) {
      const url = `/companies/${item.id}`;
      const response = await this.$api.actionUpdate(url, params);
      ctx.commit("updateCompanies", response);
    },
    async createAction(ctx, item) {
      const url = "/companies";
      const response = await this.$api.actionCreate(url, item);
      ctx.commit("createCompanies", response);
    },
    async deleteAction(ctx, id) {
      const url = `/companies/${id}`;
      await this.$api.actionDelete(url);
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
