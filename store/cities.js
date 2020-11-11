export default {
  actions: {
    async actionIndex(ctx) {
      const url = "/cities";
      const response = await this.$api.actionIndex(url);
      ctx.commit("setCities", response);
    },
    async updateAction(ctx, item) {
      const url = `/cities/${item.id}`;
      const response = await this.$api.actionUpdate(url, params);
      ctx.commit("updateCity", response);
    },
    async createAction(ctx, item) {
      const url = "/cities";
      const response = await this.$api.actionCreate(url, item);
      ctx.commit("createCity", response);
    },
    async deleteAction(ctx, id) {
      const url = `/cities/${id}`;
      await this.$api.actionDelete(url);
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
