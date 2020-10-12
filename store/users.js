import Api from "../Api";

export default {
  actions: {
    async getUsers(ctx) {
      const token = JSON.parse(window.localStorage.getItem("token")).token;
      const url = "http://localhost:8080/users";
      const body = await new Api(token).fetch(url);
      ctx.commit("updateUsers", body);
    },
    async fetchApi(ctx, { item, method }) {
      const token = JSON.parse(window.localStorage.getItem("token")).token;
      const url = "http://localhost:8080/users";
      const params = {
        method: method,
        body: JSON.stringify(item),
        headers: {
          "Content-Type": "application/json",
        },
      };
      await new Api(token).fetch(url, params).then((res) => {
        console.log(res);
        ctx.commit("updateUsers", res);
      });
    },
  },
  state: () => ({
    users: [],
  }),
  mutations: {
    updateUsers(state, res) {
      state.users = res;
    },
  },
};
