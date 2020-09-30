export default class Api {
  constructor(headers) {
    this.headers = headers || {
      Authentication: JSON.parse(localStorage.getItem("token")).token,
      "Content-Type": "application/json",
    };
  }
  fetch(url, params = {}) {
    return fetch(url, {
      method: params.method || "GET",
      headers: this.headers,
      body: params.body,
    }).then((res) => res.json());
  }
}
