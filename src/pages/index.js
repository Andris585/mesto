import {
  parameters,
  popupInputName,
  popupInputBio,
  popupFormEditProfile,
  popupFormAddCard,
  profileEditButton,
  profileAddButton,
  avatarOverlay,
  avatar,
  popupChangeAvatarForm,
} from "../utils/data.js";

import FormValidator from "../components/FormValidator.js";

import Card from "../components/Card.js";

import PopupDelete from "../components/PopupDelete.js";

import Section from "../components/Section.js";

import PopupWithImage from "../components/PopupWithImage.js";

import PopupWithForm from "../components/PopupWithForm.js";

import UserInfo from "../components/UserInfo.js";

import "../pages/index.css";

import Api from "../components/Api.js";

const api = new Api({
  url: 'https://nomoreparties.co/v1/cohort-64/',
  headers: {authorization: '39e9c6b5-4599-464d-b55f-3df424ee89b0'}
});

const profileValidation = new FormValidator(parameters, popupFormEditProfile);
export { profileValidation };
const addCardValidation = new FormValidator(parameters, popupFormAddCard);
const changeAvavtarValidation = new FormValidator(parameters, popupChangeAvatarForm);

profileValidation.enableValidation();
addCardValidation.enableValidation();
changeAvavtarValidation.enableValidation();


const popupWithImageSelector = ".popup_type_img-scale";
const popupWithImage = new PopupWithImage(popupWithImageSelector);
popupWithImage.setEventListeners();

avatarOverlay.addEventListener("click", avatarOverlayClickHandler);

function avatarOverlayClickHandler() {
  popupChangeAvatar.open();
  changeAvavtarValidation.resetValidation();
}

const imageClickHandler = (data) => {
  popupWithImage.open(data);
};

const popupProfile = new PopupWithForm(
  ".popup_type_edit-profile",
  handleProfileFormSubmit
);

const popupNewCard = new PopupWithForm(
  ".popup_type_add-card",
  handleAddCardSubmit
);

const popupDeleteConfirmation = new PopupDelete(
  ".popup_type_delete-card",
  handleDeleteSubmit
);

const popupChangeAvatar = new PopupWithForm(
  ".popup_type_change-avatar",
  handleChangeAvatarSubmit
);

popupProfile.setEventListeners();
popupNewCard.setEventListeners();
popupChangeAvatar.setEventListeners();

let userInfo;

let userId;

let userPromise = new Promise((resolve, reject) => {
  api.getUserData()
.then(data => {
  userInfo = new UserInfo(data);
  userInfo.setUserInfo(data);
  userId = data._id;
  resolve(userId);
});
});

const setInitialUserInfo = ({ name, bio }) => {
  popupInputName.value = name;
  popupInputBio.value = bio;
};

const editButtonClickHandler = () => {
  popupProfile.open();
  profileValidation.resetValidation();
  setInitialUserInfo(userInfo.getUserInfo());
};

const addCardClickHandler = () => {
  popupNewCard.open();
  addCardValidation.resetValidation();
};

function handleSubmit(request, popupInstance, loadingText = "Сохранение...") { 
  popupInstance.renderLoading(true, loadingText);
  request()
  .then(() => {
    popupInstance.close()
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}`);
  })
  .finally(() => {
    popupInstance.renderLoading(false);
  });
}

function handleProfileFormSubmit(inputValues) {
  function makeRequest() {
    return api.postUserInfo(inputValues)
    .then(api._checkResponse)
    .then((userData) => {
      userInfo.setUserInfo(userData)
    });
  }
  handleSubmit(makeRequest, popupProfile);
}

function deleteButtonClickHandler(data) {
  popupDeleteConfirmation.open();
  popupDeleteConfirmation.setEventListeners(data);
}

profileEditButton.addEventListener("click", editButtonClickHandler);
profileAddButton.addEventListener("click", addCardClickHandler);

const createElementNoDelete = (data) => {
  const card = new Card(data, imageClickHandler, ".card-template", deleteButtonClickHandler, api, userId);
  const cardElement = card.createCard();
  return cardElement;
};

let initialCards;

let initialCardsPromise = new Promise((resolve, reject) => {
  api.getInitialCards().then(data => {
  resolve(initialCards = data);
  const initialCardsRendered = new Section(
    { items: initialCards, renderer: createElementNoDelete },
    ".elements__list"
  );
  initialCardsRendered.renderItems();
})
.catch(err => console.log(err));
});

Promise.all([userPromise, initialCardsPromise]);

const cardRendered = new Section(
  { items: {}, renderer: createElementNoDelete },
  ".elements__list"
);

function handleAddCardSubmit(inputsValues) {
  function makeRequest() {
   return api.postNewCard(inputsValues)
    .then(api._checkResponse)
    .then(data => {
      cardRendered.addItem(data, "prepend");
    })
    .catch(err => console.log(err));
  }
  handleSubmit(makeRequest, popupNewCard);
}

function handleDeleteSubmit(data) {
  function makeRequest() {
    return api.deleteCard(data.id)
    .then(api._checkResponse)
    .then(() => {
      popupDeleteConfirmation.close();
      data.remove();
    })
  }
  handleSubmit(makeRequest, popupDeleteConfirmation);
}

function handleChangeAvatarSubmit(data) {
  function makeRequest() {
 return  api.changeAvatar(data)
  .then(api._checkResponse)
  .then(data => {
    avatar.src = data.avatar;
    this.close();
  })
  .catch(err => console.log(err))
  }
  handleSubmit(makeRequest, popupChangeAvatar);
}



