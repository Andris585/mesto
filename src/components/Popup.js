export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._inputs = this._popup.querySelectorAll('.popup__input');
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
}