export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._inputs = this._popup.querySelectorAll('.popup__input');
    this._form = this._popup.querySelector('.popup__form');
    this._submitButton = this._popup.querySelector('.popup__submit');
  }

  open() {
    this._popup.classList.add('popup_opened');
    window.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._popup.classList.remove('popup_opened');
    window.removeEventListener('keydown', this._handleEscClose);
  }

  setEventListeners() {
    this._popup.querySelector('.popup__close-button').addEventListener('click', () => this.close());
    this._popup.addEventListener('mousedown', (evt) => {
      if (evt.target === evt.currentTarget) {
              this.close();
            }
    });
  }

  _handleEscClose = (evt) => {
    if (evt.key === 'Escape') {
          this.close();
  }
  }

  renderLoading(isLoading, initialText, loadingText) {
    if (isLoading) {
      this._submitButton.innerText = loadingText;
    }
    else {
      this._submitButton.innerText = initialText;
    }
}
}