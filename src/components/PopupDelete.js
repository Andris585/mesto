import Popup from "./Popup.js";

export default class PopupDelete extends Popup {
  constructor(popupSelector,handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector('.popup__form');
  }

  close() {
    this._popup.classList.remove('popup_opened');
    window.removeEventListener('keydown', this._handleEscClose);
    this._form.removeEventListener('submit', this._submitDelete);
  }

  setEventListeners = (data) => {
    super.setEventListeners();
    this._form.addEventListener('submit', this._submitDelete);
    this._data = data;  
    };

   _submitDelete = (evt) => {
    evt.preventDefault();
    this._handleFormSubmit(this._data);
  }
}