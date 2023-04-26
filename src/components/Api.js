export default class Api {
  constructor(config) {
    this.url = config.url;
    this.headers = config.headers;
  }

  getUserData() {
    return fetch(this.url + 'users/me', {
      headers: this.headers
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject('error');
    })
  }

  getInitialCards() {
    return fetch(this.url + 'cards', {
      headers: this.headers
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject('error');
    })
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
  if (data.likes.find(item => item._id === '1f247e5cfdbc56597fc13b33'))
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