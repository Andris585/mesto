export default class UserInfo {
  constructor(data) {
    this._name = data.name;
    this._bio = data.about;
    this._id = data._id;
    this._profileName = document.querySelector(".profile__name");
    this._profileBio = document.querySelector(".profile__bio");
    this._avatarElement = document.querySelector(".profile__avatar");
  }

  getUserInfo() {
    let userInfo = {
      name: this._profileName.textContent,
      bio: this._profileBio.textContent,
    };
    return userInfo;
  }

  setUserInfo(data) {
    this._profileName.textContent = data.name;
    this._profileBio.textContent = data.about;
    this._avatarElement.src = data.avatar;
    this._userId = data._id;
  }
}
