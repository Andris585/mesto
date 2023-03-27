import Popup from "./Popup.js";
import UserInfo from "./UserInfo.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit){
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
  }

  _getInputValues() {
   const inputsValues = Array.from(this._popup.querySelectorAll('.popup__input')).map(inputElement => inputElement.value);
   return inputsValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.querySelector('.popup__form').addEventListener('submit', this._handleFormSubmit);
  }

  close() {
    super.close();
    this._popup.querySelector('.popup__form').reset();
  }
}