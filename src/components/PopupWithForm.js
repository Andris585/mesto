import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit){
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._inputs = this._popup.querySelectorAll('.popup__input');
    this._form = this._popup.querySelector('.popup__form');
    this._submitButton = this._popup.querySelector('.popup__submit');
  }

  open() {
    super.open();
    this._form.addEventListener('submit', this._submitForm);
    }

  _getInputValues() {
   const inputsValues = {};
   this._inputs.forEach((input) => {
    inputsValues[input.name] = input.value;
   });
   return inputsValues;
  }

  close() {
    super.close();
    this._form.removeEventListener('submit', this._submitForm);
    this._form.reset();
  }

  _submitForm = (evt) => {
    evt.preventDefault();
    this._handleFormSubmit(this._getInputValues());
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