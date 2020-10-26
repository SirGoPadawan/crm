import jwt from "jsonwebtoken";

export default class Api {
  constructor(token = null) {
    this.token = token;
    if (this.token) {
      const decode = jwt.decode(this.token);
      const currentTime = new Date().getTime() / 1000;
      if (currentTime > decode.exp) {
        this.getNewToken();
      } else {
        this.headers = {
          Authentication: this.token,
        };
      }
    } else {
      this.headers = {
        "Content-Type": "application/json",
      };
    }
  }
  async getNewToken() {
    const refreshToken = JSON.parse(localStorage.getItem("refreshToken"));
    const res = await fetch("http://localhost:8080/refreshToken", {
      method: "POST",
      headers: { authorization: refreshToken },
    });
    const data = await res.json();
    this.token = data.token;
    window.localStorage.setItem("token", JSON.stringify(data.token));
    window.localStorage.setItem(
      "refreshToken",
      JSON.stringify(data.refreshToken)
    );
  }
  fetch(url, params = {}) {
    return fetch(url, {
      method: params.method || "GET",
      headers: {
        ...this.headers,
        ...params.headers,
      },
      body: params.body,
    }).then((res) => res.json());
  }
}
