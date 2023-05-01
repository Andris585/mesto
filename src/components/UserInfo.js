export default class UserInfo {
  constructor(data, {nameSelector, bioSelector, avatarSelector}) {
    this._name = data.name;
    this._bio = data.about;
    this._id = data._id;
    this._profileName = document.querySelector(nameSelector);
    this._profileBio = document.querySelector(bioSelector);
    this._avatarElement = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    const userInfo = {
      name: this._profileName.textContent,
      bio: this._profileBio.textContent,
    };
    return userInfo;
  }

  setUserInfo({name, about, avatar, _id}) {
    this._profileName.textContent = name;
    this._profileBio.textContent = about;
    this._avatarElement.src = avatar;
    this._userId = _id;
  }
}
