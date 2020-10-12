import Api from "../Api";

export default {
  actions: {
    async getCities(ctx) {
      const token = JSON.parse(window.localStorage.getItem("token")).token;
      const url = "http://localhost:8080/cities";
      await new Api(token).fetch(url).then((res) => {
        ctx.commit("updateCities", res);
      });
    },
  },
  state: () => ({
    cities: [],
  }),
  mutations: {
    updateCities(state, res) {
      state.cities = res;
    },
  },
  getters: {
    getCities(state) {
      return state.cities;
    },
  },
};
