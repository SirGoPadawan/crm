import Api from "../Api";

let token = null;
if (process.browser) {
  token = JSON.parse(window.localStorage.getItem("token")).token;
}
const url = "http://localhost:8080/services";
export default {
  actions: {
    async getServices(ctx) {
      await new Api(token)
        .fetch(url)
        .then((res) => {
          if (Array.isArray(res)) {
            ctx.commit("updateServices", res);
          } else {
            return console.log("Ошибка");
          }
        })
        .catch((e) => console.log(e));
    },
    async fetchApi(ctx, { item, method }) {
      const params = {
        method: method,
        body: JSON.stringify(item),
        headers: {
          "Content-Type": "application/json",
        },
      };
      await new Api(token).fetch(url, params).then((res) => {
        ctx.commit("updateServices", res);
      });
    },
  },
  state: () => ({
    services: [],
  }),
  mutations: {
    updateServices(state, res) {
      state.services = res;
      console.log(state.services);
    },
  },
};
