import Api from "../Api";

const url = "http://localhost:8080/services";
export default {
  actions: {
    async getServices(ctx) {
      const token = JSON.parse(window.localStorage.getItem("token")).token;
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
      const token = JSON.parse(window.localStorage.getItem("token")).token;
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
    },
  },
};
