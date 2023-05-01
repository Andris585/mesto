import Popup from "./Popup.js";

export default class PopupDelete extends Popup {
  constructor(popupSelector,handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
  }

  open(data) {
    super.open();
    this._data = data;
    this._form.addEventListener('submit', this._submitDelete);
  }

  close() {
    super.close();
    this._form.removeEventListener('submit', this._submitDelete);
    this._form.reset();
  }

   _submitDelete = (evt) => {
    evt.preventDefault();
    this._handleFormSubmit(this._data);
  }
}