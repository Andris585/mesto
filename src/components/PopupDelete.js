
import PopupWithForm from "./PopupWithForm.js";

export default class PopupDelete extends PopupWithForm {
  constructor(popupSelector,handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;

  }

  open(data) {
    this._popup.classList.add('popup_opened');
    window.addEventListener('keydown', this._handleEscClose);
    this._data = data;
    this._form.addEventListener('submit', this._submitDelete);
  }

  close() {
    super.close();
    this._form.removeEventListener('submit', this._submitDelete);
  }

   _submitDelete = (evt) => {
    evt.preventDefault();
    this._handleFormSubmit(this._data);
  }
}