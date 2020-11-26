import jwt from "jsonwebtoken";

class Api {
  constructor(token = null) {
    this.token = token;
    console.log(this.token);
    try {
      if (!this.token || this.token === undefined) {
        console.log(this.token);
        this.getNewToken();
        throw new Error();
      }
      const decode = jwt.decode(this.token);
      const currentTime = new Date().getTime() / 1000;
      currentTime > decode.exp
        ? this.getNewToken()
        : (this.headers = {
            Authentication: this.token,
          });
    } catch (error) {
      console.log(error);
    }
  }
  async getNewToken() {
    try {
      let refreshToken = JSON.parse(localStorage.getItem("refreshToken"));
      console.log(refreshToken);
      /* if (refreshToken || refreshToken === "undefined") {
        localStorage.clear();
        throw new Error();
      } */
      const res = await fetch("http://localhost:8080/refreshToken", {
        method: "POST",
        headers: { authorization: refreshToken },
      });
      const data = await res.json();
      this.token = data.token;
      localStorage.setItem("token", JSON.stringify(data.token));
      localStorage.setItem("refreshToken", JSON.stringify(data.refreshToken));
    } catch (error) {
      console.log(error);
    }
  }
  async actionIndex(url) {
    return await this.fetch(url);
  }
  async actionCreate(url, item) {
    const params = {
      method: "POST",
      body: JSON.stringify(item),
      headers: { "Content-Type": "application/json" },
    };
    return await this.fetch(url, params);
  }
  async actionUpdate(url, item) {
    const params = {
      method: "PUT",
      body: JSON.stringify(item),
      headers: { "Content-Type": "application/json" },
    };
    return await this.fetch(url, params);
  }
  async actionDelete(url) {
    const params = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    };
    return await this.fetch(url, params);
  }
  async checkResponse(response) {
    try {
      if (response.status !== 200) {
        throw new Error();
      }
      return await response.json();
    } catch (error) {
      return [];
    }
  }
  async fetch(url, params = {}) {
    const response = await fetch("http://localhost:8080" + url, {
      method: params.method || "GET",
      headers: {
        ...this.headers,
        ...params.headers,
      },
      body: params.body,
    });
    return await this.checkResponse(response);
  }
}

let token = JSON.parse(localStorage.getItem("token"));

export default (ctx, inject) => {
  inject("api", new Api(token));
};
