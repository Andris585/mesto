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
  url: 'https://nomoreparties.co/v1/cohort-65/',
  headers: {authorization: '7a18988f-7dd4-4466-8fdf-29531e30664e',
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
  ".popup_type_delete-card"
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

let initialCardsRendered;

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

const deleteButtonClickHandler = (card) => {
  function handleDeleteSubmit() {
    function makeRequest() {
      return api.deleteCard(card.id)
      .then(() => {
        card.remove();
      })
    }
    handleSubmit(makeRequest, popupDeleteConfirmation, "Да", "Удаление...");
  }
  popupDeleteConfirmation.open();
  popupDeleteConfirmation.setSubmitAction(handleDeleteSubmit);
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
  initialCardsRendered = new Section(
    { items: cards, renderer: createElement },
    ".elements__list"
  );
  initialCardsRendered.renderItems();
  return userId;
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


function handleAddCardSubmit(inputsValues) {
  function makeRequest() {
   return api.postNewCard(inputsValues)
    .then(data => {
      initialCardsRendered.addItem(data, "prepend");
    })
  }
  handleSubmit(makeRequest, popupNewCard, "Создать");
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