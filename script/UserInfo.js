import {
  profileName,
  profileBio
} from './data.js';

export default class UserInfo{
  constructor({ name, bio }) {
    this._name = name;
    this._bio = bio;
  }

  getUserInfo() {
    const userInfo = { name: this._name, bio: this._bio };
    return userInfo;
  }

  setUserInfo([ name, bio ]) {
    profileName.textContent = name;
    profileBio.textContent = bio;
  }
}