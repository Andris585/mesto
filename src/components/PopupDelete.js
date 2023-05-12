
import PopupWithForm from "./PopupWithForm.js";

export default class PopupDelete extends PopupWithForm {
  constructor(popupSelector) {
    super(popupSelector);
  }
  setSubmitAction(action, data) {
    this._data = data;
    this._submitForm = action;
   }
}