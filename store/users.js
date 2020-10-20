import Api from "../Api";

export default {
  actions: {
    async getUsers(ctx) {
      const token = JSON.parse(window.localStorage.getItem("token"));
      const url = "http://localhost:8080/users";
      const body = await new Api(token).fetch(url);
      ctx.commit("updateUsers", body);
    },
    async fetchApi(ctx, { item, method, headers, url }) {
      const token = JSON.parse(window.localStorage.getItem("token"));
      const params = {
        method: method,
        body: item,
        headers: headers,
      };
      await new Api(token).fetch(url, params).then((res) => {
        ctx.commit("updateUser", res);
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
    updateUser(state, res) {
      const index = state.users.findIndex((elem) => elem.id === res[0].id);
      state.users.slice(index, 1).push(res[0]);
    },
  },
  getters: {
    getUser: (state) => (id) =>
      state.users.find((elem) => Number(elem.id) === Number(id)),
  },
};
