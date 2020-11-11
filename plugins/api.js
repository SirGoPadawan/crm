import jwt from "jsonwebtoken";

class Api {
  constructor(token = null, refreshToken = null) {
    this.baseUrl = "http://localhost:8080";
    this.token = token;
    this.refreshToken = refreshToken;
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
    const res = await fetch(this.baseUrl + "/refreshToken", {
      method: "POST",
      headers: { authorization: this.refreshToken },
    });
    const data = await res.json();
    this.token = data.token;
    localStorage.setItem("token", JSON.stringify(data.token));
    localStorage.setItem("refreshToken", JSON.stringify(data.refreshToken));
  }
  async actionIndex(url) {
    return await this.fetch(this.baseUrl + url);
  }
  async actionCreate(url, item) {
    const params = {
      method: "POST",
      body: JSON.stringify(item),
      headers: { "Content-Type": "application/json" },
    };
    return await this.fetch(this.baseUrl + url, params);
  }
  async actionUpdate(url, item) {
    const params = {
      method: "PUT",
      body: JSON.stringify(item),
      headers: { "Content-Type": "application/json" },
    };
    return await this.fetch(this.baseUrl + url, params);
  }
  async actionDelete(url) {
    const params = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    };
    return await this.fetch(this.baseUrl + url, params);
  }
  async checkResponse(response) {
    try {
      if (response.status === 200) {
        return await response.json();
      } else {
        throw new Error();
      }
    } catch (error) {
      alert(error.message);
      return [];
    }
  }
  async fetch(url, params = {}) {
    const response = await fetch(url, {
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

const token = JSON.parse(localStorage.getItem("token"));
const refreshToken = JSON.parse(localStorage.getItem("refreshToken"));

export default (ctx, inject) => {
  inject("api", new Api(token, refreshToken));
};
