class Api {
  constructor() {
    this._urlBase = "https://around.nomoreparties.co/v1/web_es_05";
    this.BASE_URL = "https://register.nomoreparties.co";
    this._authorization = "a0471525-76a0-442d-afa2-307d9b782544";
  }

  async fetcher(url, method, body) {
    const data = await fetch(url, {
      headers: {
        authorization: this._authorization,
        "Content-Type": "application/json",
      },
      method,
      body: JSON.stringify(body),
    });

    if (data.ok) {
      return data.json();
    }
  }

  async getUserInfo() {
    try {
      return await this.fetcher(`${this._urlBase}/users/me`, "GET");
    } catch (err) {
      console.log(`se dio el sigueinte error: ${err}`);
    }
  }

  async getCards() {
    try {
      return await this.fetcher(`${this._urlBase}/cards`, "GET");
    } catch (err) {
      console.log(err);
    }
  }

  async editProfileInfo(data) {
    try {
      return await this.fetcher(`${this._urlBase}/users/me`, "PATCH", data);
    } catch (err) {
      console.log(err);
    }
  }

  async addCard(data) {
    try {
      return await this.fetcher(`${this._urlBase}/cards`, "POST", data);
    } catch (err) {
      console.log(err);
    }
  }

  async deleteCard(data, id) {
    try {
      return await this.fetcher(`${this._urlBase}/cards/${id}`, "DELETE", data);
    } catch (err) {
      console.log(err);
    }
  }

  async changeLikeCardStatus(id, hasLike) {
    if (hasLike) {
      return this.likeCard({}, id);
    }
    return this.unlikeCard({}, id);
  }

  async likeCard(body, id) {
    try {
      return await this.fetcher(
        `${this._urlBase}/cards/likes/${id}`,
        "PUT",
        body
      );
    } catch (err) {
      console.log(err);
    }
  }

  async unlikeCard(body, id) {
    try {
      return await this.fetcher(
        `${this._urlBase}/cards/likes/${id}`,
        "DELETE",
        body
      );
    } catch (err) {
      console.log(err);
    }
  }

  async updateImg(data, link) {
    try {
      return await this.fetcher(
        `${this._urlBase}/users/me/avatar`,
        "PATCH",
        data
      );
    } catch (err) {
      console.log(err);
    }
  }
}

const api = new Api({
  address: "https://nomoreparties.co",
  groupId: `cohort08`, // CHANGE IT WITH YOUR COHORT
  token: `a0471525-76a0-442d-afa2-307d9b782544`, // CHANGE IT WITH YOUR TOKEN
});

export default api;
