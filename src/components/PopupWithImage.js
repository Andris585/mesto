import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._pic = this._popup.querySelector('.popup__pic-scaled');
    this._caption = this._popup.querySelector('.popup__pic-caption');
  }

  open({ name, link }) {
    this._pic.src = link;
    this._pic.alt = `${name}, пейзаж`;
    this._caption.textContent = name;
    super.open();
  }
}