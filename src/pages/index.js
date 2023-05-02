import {
  parameters,
  popupInputName,
  popupInputBio,
  popupFormEditProfile,
  popupFormAddCard,
  profileEditButton,
  profileAddButton,
  avatarOverlay,
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
  headers: {authorization: '39e9c6b5-4599-464d-b55f-3df424ee89b0',
'Content-Type': 'application/json'}
});

const profileValidation = new FormValidator(parameters, popupFormEditProfile);
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
popupDeleteConfirmation.setEventListeners();

let userInfo;

let userId;

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

function handleSubmit(request, popupInstance, initialText, loadingText = "Сохранение...") { 
  popupInstance.renderLoading(true, initialText, loadingText);
  request()
  .then(() => {
    popupInstance.close();
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}`);
  })
  .finally(() => {
    popupInstance.renderLoading(false, initialText);
  });
}

function handleProfileFormSubmit(inputValues) {
  function makeRequest() {
    return api.postUserInfo(inputValues)
    .then((userData) => {
      userInfo.setUserInfo(userData)
    });
  }
  handleSubmit(makeRequest, popupProfile, "Сохранить");
}

function deleteButtonClickHandler(data) {
  popupDeleteConfirmation.open(data);
}

profileEditButton.addEventListener("click", editButtonClickHandler);
profileAddButton.addEventListener("click", addCardClickHandler);

Promise.all([getUserData(), getCards()])
.then(([userData, cards]) => {
  
  userInfo = new UserInfo(userData, { nameSelector: ".profile__name", 
  bioSelector: ".profile__bio",
  avatarSelector: ".profile__avatar" });
  userInfo.setUserInfo(userData);
  userId = userData._id;
  const initialCardsRendered = new Section(
    { items: cards, renderer: createElement },
    ".elements__list"
  );
  initialCardsRendered.renderItems();
  return (userId);
})
.catch((err) => console.log(`Ошибка: ${err}`));

const createElement = (data) => {
  const card = new Card(data, imageClickHandler, ".card-template", deleteButtonClickHandler, api, userId);
  const cardElement = card.createCard();
  return cardElement;
};

function getUserData() {
  return api.getUserData()
};

function getCards() {
  return api.getInitialCards()
};

const cardRendered = new Section(
  { items: {}, renderer: createElement },
  ".elements__list"
);

function handleAddCardSubmit(inputsValues) {
  function makeRequest() {
   return api.postNewCard(inputsValues)
    .then(data => {
      cardRendered.addItem(data, "prepend");
    })
  }
  handleSubmit(makeRequest, popupNewCard, "Создать");
}

function handleDeleteSubmit(card) {
  function makeRequest() {
    return api.deleteCard(card.id)
    .then(() => {
      card.remove();
    })
  }
  handleSubmit(makeRequest, popupDeleteConfirmation, "Да", "Удаление...");
}

function handleChangeAvatarSubmit(data) {
  function makeRequest() {
 return  api.changeAvatar(data)
  .then(userData => {
    userInfo.setUserInfo(userData);
  })
  }
  handleSubmit(makeRequest, popupChangeAvatar, "Сохранить");
}

export { profileValidation };