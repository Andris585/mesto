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
  const contentType = {'Content-Type': 'application/json'};
  const headers = this.headers;
  const expandedHeaders = {...headers, ...contentType};
  return fetch(this.url + 'users/me', {
    method: 'PATCH',
    headers: expandedHeaders,
    body: JSON.stringify({
      name: name,
      about: about
    })
  })
}

postNewCard({ name, link }) {
  const contentType = {'Content-Type': 'application/json'};
  const headers = this.headers;
  const expandedHeaders = {...headers, ...contentType}; 
  return fetch(this.url + 'cards', {
    method: 'POST',
    headers: expandedHeaders,
    body: JSON.stringify({
      name: name,
      link: link
    })
  })
}

deleteCard(data) {
  return fetch(this.url + `cards/${data}`, {
    method: 'DELETE',
    headers: this.headers
  })
}

toggleLikeButton(data) {
  const contentType = {'Content-Type': 'application/json'};
  const headers = this.headers;
  const expandedHeaders = {...headers, ...contentType};
  this._userId = this.getUserData().then(userData => {
    return userData.id;
  });
  if (data.likes.find(item => item._id === this._userId))
  {
    return fetch(this.url + `cards/${data._id}/likes`, {
      method: 'DELETE',
      headers: expandedHeaders
    });
  }
  return fetch(this.url + `cards/${data._id}/likes`, {
    method: 'PUT',
    headers: expandedHeaders
  });
}

changeAvatar(data) {
  const contentType = {'Content-Type': 'application/json'};
  const headers = this.headers;
  const expandedHeaders = {...headers, ...contentType};
  return fetch(this.url + 'users/me/avatar', {
    method: 'PATCH',
    headers: expandedHeaders,
    body: JSON.stringify({
      avatar: data.link
    })
  })
}
}