export default {
  actions: {
    async actionIndex(ctx) {
      const url = "/services";
      const response = await this.$api.actionIndex(url);
      ctx.commit("setServices", response);
    },
    async updateAction(ctx, item) {
      const url = `/services/${item.id}`;
      const response = await this.$api.actionUpdate(url, params);
      ctx.commit("updateService", response);
    },
    async createAction(ctx, item) {
      const url = "/services";
      const response = await this.$api.actionCreate(url, params);
      ctx.commit("createService", promise);
    },
    async deleteAction(ctx, id) {
      const url = `/services/${id}`;
      await this.$api.actionDelete(url);
      ctx.commit("deleteService", id);
    },
  },
  state: () => ({
    services: [],
  }),
  mutations: {
    setServices(state, promise) {
      state.services = promise;
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
