export default class Card {
  constructor(data, openPopupImgScale, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._openPopupImgScale = openPopupImgScale;
  }

  _getTemplate() {
    const cardTemplate = document.querySelector(this._templateSelector).content;
    const card = cardTemplate.querySelector('.elements__item');
    const cardElement = card.cloneNode(true);
    return cardElement;
  }

  _setEventListeners() {
    this._cardImg.addEventListener('click', () => {
      this._openPopupImgScale(this._link, this._name);
    });
    this._card.querySelector('.elements__delete-button').addEventListener('click', this._removeCard);
    this._card.querySelector('.elements__like').addEventListener('click', this._toggleLikeButton);
  }

  createCard() {
    this._card = this._getTemplate();
    this._cardImg = this._card.querySelector('.elements__pic');
    this._cardCaption = this._card.querySelector('.elements__caption');
    this._cardImg.alt = `${this._name}, пейзаж`;
    this._cardImg.src = this._link;
    this._cardCaption.textContent = this._name;
    this._setEventListeners();
    return this._card;
  }

  _removeCard = () => {
    this._card.remove();
  } 
  
  _toggleLikeButton = () => {
    this._card.querySelector('.elements__like').classList.toggle('elements__like_active');
  }
}