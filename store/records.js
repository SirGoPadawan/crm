export default {
  actions: {
    async actionIndex(ctx) {
      const url = "/records";
      const response = await this.$api.actionIndex(url);
      ctx.commit("setRecords", response);
    },
    async updateAction(ctx, item) {
      const url = `/records/${item.id}`;
      const response = await this.$api.actionUpdate(url, item);
      ctx.commit("updateRecords", response);
    },
    async createAction(ctx, item) {
      const url = "/records";
      const response = await this.$api.actionCreate(url, item);
      ctx.commit("createRecords", response);
    },
    async deleteAction(ctx, id) {
      const url = `/records/${id}`;
      await this.$api.actionDelete(url);
      ctx.commit("deleteRecords", id);
    },
  },
  state: () => ({
    records: [],
  }),
  mutations: {
    setRecords(state, response) {
      state.records = response;
    },
    updateRecords(state, response) {
      let id = state.records.findIndex(
        (elem) => Number(elem.id) === Number(response[0].id)
      );
      state.records.splice(id, 1);
      state.records.push(response[0]);
    },
    createRecords(state, response) {
      state.records.push(response);
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
