import Api from "../Api";

let token = null;
if (process.browser) {
  token = JSON.parse(window.localStorage.getItem("token")).token;
}

export default {
  actions: {
    async getTableUsers(ctx) {
      const url = "http://localhost:8080/users";
      const body = await new Api(token).fetch(url);
      ctx.commit("updateUsers", body);
    },
  },
  state: {
    users: [],
  },
  mutations: {
    updateUsers(state, res) {
      state.users = res;
    },
  },
  getters: {
    getUsers(state) {
      return state.users;
    },
  },
};
