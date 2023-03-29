
export default class UserInfo{
  constructor({ name, bio }) {
    this._name = name;
    this._bio = bio;
    this._profileName = document.querySelector('.profile__name');
    this._profileBio = document.querySelector('.profile__bio');
  }

  getUserInfo() {
    const userInfo = { name: this._name, bio: this._bio };
    return userInfo;
  }

  setUserInfo([ name, bio ]) {
    this._profileName.textContent = name;
    this._profileBio.textContent = bio;
  }
}