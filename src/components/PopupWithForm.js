import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit){
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
  }

  open() {
    super.open();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    }
      );
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
    this._form.reset();
  }
}