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
  popupFormDelete
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

function renderLoading(isLoading, form) {
  const submit = form.querySelector('.popup__submit');
  const initialState = submit.textContent;
  if (isLoading) {
    submit.textContent = 'Сохранение...';
  }
  else {
    submit.textContent = initialState;
  }
}

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
}

const imageClickHandler = (data) => {
  popupWithImage.open(data);
};

const popupFormProfile = new PopupWithForm(
  ".popup_type_edit-profile",
  handleProfileFormSubmit
);

const popupFormNewCard = new PopupWithForm(
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

popupFormProfile.setEventListeners();
popupFormNewCard.setEventListeners();
popupChangeAvatar.setEventListeners();

let userInfo;

api.getUserData().then(data => {
  userInfo = new UserInfo(data);
  userInfo.setUserInfo(data);
});

const setInitialUserInfo = ({ name, bio }) => {
  popupInputName.value = name;
  popupInputBio.value = bio;
};

const editButtonClickHandler = () => {
  popupFormProfile.open();
  profileValidation.resetValidation();
  setInitialUserInfo(userInfo.getUserInfo());
};

const addCardClickHandler = () => {
  popupFormNewCard.open();
  addCardValidation.resetValidation();
};

function handleProfileFormSubmit(data) {
  renderLoading(true, popupFormEditProfile);
  userInfo.setUserInfo(data);
  api.postUserInfo(data)
  .catch(err => console.log(err))
  .finally(() => {
    renderLoading(false, popupFormEditProfile);
  });
  popupFormProfile.close();
};

function deleteButtonClickHandler(data) {
  popupDeleteConfirmation.open();
  popupDeleteConfirmation.setEventListeners(data);
}

profileEditButton.addEventListener("click", editButtonClickHandler);
profileAddButton.addEventListener("click", addCardClickHandler);

const createElementNoDelete = (data) => {
  const card = new Card(data, imageClickHandler, ".card-template", deleteButtonClickHandler, api);
  const cardElement = card.createCard();
  return cardElement;
};

let initialCards;

api.getInitialCards().then(data => {
  initialCards = data;
  const initialCardsRendered = new Section(
    { items: initialCards, renderer: createElementNoDelete },
    ".elements__list"
  );
  initialCardsRendered.renderItems();
})
.catch(err => console.log(err));

const cardRendered = new Section(
  { items: {}, renderer: createElementNoDelete },
  ".elements__list"
);

function handleAddCardSubmit(data) {
  renderLoading(true, popupFormAddCard);
  api.postNewCard(data)
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject;
  })
  .then(data => {
    cardRendered.addItem(data);
  })
  .catch(err => console.log(err))
  .finally(() => {
    renderLoading(false, popupFormAddCard);
  })
  popupFormNewCard.close();
}

function handleDeleteSubmit(data) {
  renderLoading(true, popupFormDelete);
  api.deleteCard(data.id)
  .catch(err => console.log(err))
  .finally(() => {
    renderLoading(false, popupFormDelete);
  });
  data.remove();
}

function handleChangeAvatarSubmit(data) {
  renderLoading(true, popupChangeAvatarForm);
  api.changeAvatar(data)
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject('error');
  })
  .then(data => {
    avatar.src = data.avatar;
    this.close();
  })
  .catch(err => console.log(err))
  .finally(() => {
    renderLoading(false, popupChangeAvatarForm);
  })
}


