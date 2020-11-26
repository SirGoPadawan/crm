export default {
  state: () => ({
    city: null,
  }),
  mutations: {
    setCity(state, item) {
      state.city = item;
    },
  },
};
