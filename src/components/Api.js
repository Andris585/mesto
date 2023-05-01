export default class Api {
  constructor(config) {
    this.url = config.url;
    this.headers = config.headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject('error');
  }

  _request(endpoint, options) {
    return fetch(this.url + endpoint, options)
    .then(this._checkResponse);
  }

  getUserData() {
    return this._request('users/me', {
        headers: this.headers
      });
  }

  getInitialCards() {
    return this._request('cards', {
      headers: this.headers
    });
}

postUserInfo({ name, about }) {
  return this._request('users/me', {
    method: 'PATCH',
    headers: this.headers,
    body: JSON.stringify({
      name: name,
      about: about
    })
  }); 
}

postNewCard({ name, link }) { 
  return this._request('cards', {
    method: 'POST',
    headers: this.headers,
    body: JSON.stringify({
      name: name,
      link: link
    })
  });
}

deleteCard(data) {
  return this._request(`cards/${data}`, {
    method: 'DELETE',
    headers: this.headers
  });
}

toggleLikeButton(data, userId) {
  if (data.likes.find(item => item._id === userId))
  {
    return this._request(`cards/${data._id}/likes`, {
      method: 'DELETE',
      headers: this.headers
    });
  }
  return this._request(`cards/${data._id}/likes`, {
    method: 'PUT',
    headers: this.headers
  });
}

changeAvatar(data) {
  return this._request('users/me/avatar', {
    method: 'PATCH',
    headers: this.headers,
    body: JSON.stringify({
      avatar: data.link
    })
  });
}
}