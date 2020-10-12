import Api from "../Api";

export default {
  actions: {
    async getTableCities(ctx) {
      const token = JSON.parse(window.localStorage.getItem("token")).token;
      const url = "http://localhost:8080/cities";
      const body = await new Api(token).fetch(url);
      ctx.commit("updateCities", body);
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
