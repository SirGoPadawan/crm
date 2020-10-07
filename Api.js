export default class Api {
  constructor(token = null) {
    this.token = token;
    if (this.token) {
      this.headers = {
        Authentication: this.token,
      };
    } else {
      this.headers = {
        "Content-Type": "application/json",
      };
    }
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
