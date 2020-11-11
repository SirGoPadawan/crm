export default {
  actions: {
    async actionIndex(ctx) {
      const url = "/branches";
      const response = await this.$api.actionIndex(url);
      ctx.commit("setBranches", response);
    },
    async updateAction(ctx, item) {
      const url = `/branches/${item.id}`;
      const response = await this.$api.actionUpdate(url, item);
      ctx.commit("updateBranches", response);
    },
    async createAction(ctx, item) {
      const url = "/branches";
      const response = await this.$api.actionCreate(url, item);
      ctx.commit("createBranches", response);
    },
    async deleteAction(ctx, id) {
      const url = `/branches/${id}`;
      await this.$api.actionDelete(url);
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
