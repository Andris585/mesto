export default class Card {
  constructor(data, imageClickHandler, templateSelector, deleteButtonClickHandler, api, userId) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._imageClickHandler = imageClickHandler;
    this._likes = data.likes.length;
    this._owner = data.owner._id;
    this._deleteButtonClick = deleteButtonClickHandler;
    this._cardId = data._id;
    this._api = api;
    this._data = data;
    this._userId = userId;
  }

  _getTemplate() {
    const cardTemplate = document.querySelector(this._templateSelector).content;
    const card = cardTemplate.querySelector('.elements__item');
    const cardElement = card.cloneNode(true);
    return cardElement;
  }

  _setEventListeners() {
    this._cardImg.addEventListener('click', () => {
      this._imageClickHandler({ link: this._link, name: this._name });
    });
    this._card.querySelector('.elements__delete-button').addEventListener('click', () => {
      this._deleteButtonClick(this._card);
    });
    this._card.querySelector('.elements__like').addEventListener('click', () => {
      this._toggleLikeButton(this._data)});
  }

  createCard() {
    this._card = this._getTemplate();
    this._cardImg = this._card.querySelector('.elements__pic');
    this._cardLikes = this._card.querySelector('.elements__like-counter');
    this._cardCaption = this._card.querySelector('.elements__caption');
    this._cardLike = this._card.querySelector('.elements__like');
    if (this._data.likes.find(item => item._id === this._userId)){
      this._cardLike.classList.add('elements__like_active');
    }
    this._cardImg.alt = `${this._name}, пейзаж`;
    this._cardImg.src = this._link;
    this._card.id = this._cardId;
    this._cardCaption.textContent = this._name;
    this._cardLikes.textContent = this._likes;
    this._setEventListeners();
    if (this._owner === this._userId) {
      this.setDeleteVisible();
    }
    return this._card;
  }

  _removeCard = () => {
    this._card.remove();
  }
  
  _toggleLikeButton = (data) => {
    this._api.toggleLikeButton(data)
    .then(this._api._checkResponse)
    .then(data => {
      this._cardLikes.textContent = data.likes.length;
      this._data = data;
    })
    .catch(err => console.log(err));
    if (this._data.likes.find(item => item._id === this._userId)){
      this._cardLike.classList.remove('elements__like_active');
    }
    else {
      this._cardLike.classList.add('elements__like_active');
    }
  }

  setDeleteVisible() {
    this._card.querySelector('.elements__delete-button')
    .classList.remove('elements__delete-button_inactive');
  }
}