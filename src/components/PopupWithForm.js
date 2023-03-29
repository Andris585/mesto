import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit){
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._inputs = Array.from(this._popup.querySelectorAll('.popup__input'));
    this._form = this._popup.querySelector('.popup__form');
  }

  _getInputValues() {
   const inputsValues = this._inputs.map(inputElement => inputElement.value);
   return inputsValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', this._handleFormSubmit);
  }

  close() {
    super.close();
    this._form.reset();
  }
}