export default class Section {
  constructor({ items, renderer}, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems() {
    this._items.forEach((item) => {
      this.addItem(item, "append");
    })
  }

  addItem(element, method = "prepend") {
    if(method === "prepend") {
      this._container.prepend(this._renderer(element));
    }
    else {
      this._container.append(this._renderer(element));
    }
  }
}