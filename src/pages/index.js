import {
  initialCards,
  parameters,
  popupInputName,
  popupInputBio,
  popupInputLocationName,
  popupInputLink,
  popupFormEditProfile,
  popupFormAddCard,
  profileEditButton,
  profileAddButton,
  profileName,
  profileBio,
} from "../utils/data.js";

import FormValidator from "../components/FormValidator.js";

import Card from "../components/Card.js";

import Section from "../components/Section.js";

import PopupWithImage from "../components/PopupWithImage.js";

import PopupWithForm from "../components/PopupWithForm.js";

import UserInfo from "../components/UserInfo.js";

import "../pages/index.css";

const profileValidation = new FormValidator(parameters, popupFormEditProfile);
export { profileValidation };
const addCardValidation = new FormValidator(parameters, popupFormAddCard);
profileValidation.enableValidation();
addCardValidation.enableValidation();

const popupWithImageSelector = ".popup_type_img-scale";
const popupWithImage = new PopupWithImage(popupWithImageSelector);
popupWithImage.setEventListeners();

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

popupFormProfile.setEventListeners();
popupFormNewCard.setEventListeners();

const userInfo = new UserInfo({
  name: profileName.textContent,
  bio: profileBio.textContent,
});

const setInitialUserInfo = ({ name, bio }) => {
  popupInputName.value = name;
  popupInputBio.value = bio;
};

const editButtonClickHandler = () => {
  popupFormProfile.open();
  profileValidation.resetValidation();
  setInitialUserInfo(userInfo.getUserInfo());
  console.log(document.querySelector('.profile__name'));
  console.log(userInfo.getUserInfo());
};

const addCardClickHandler = () => {
  popupFormNewCard.open();
  addCardValidation.resetValidation();
};

function handleProfileFormSubmit(data) {
  userInfo.setUserInfo(data);
  popupFormProfile.close();
}

profileEditButton.addEventListener("click", editButtonClickHandler);
profileAddButton.addEventListener("click", addCardClickHandler);

const createElement = (data) => {
  const card = new Card(data, imageClickHandler, ".card-template");
  const cardElement = card.createCard();
  return cardElement;
};

const initialCardsRendered = new Section(
  { items: initialCards, renderer: createElement },
  ".elements__list"
);

initialCardsRendered.renderItems();

const cardRendered = new Section(
  { items: {}, renderer: createElement },
  ".elements__list"
);

function handleAddCardSubmit({ name, link }) {
  cardRendered.addItem({ name, link });
  popupFormNewCard.close();
}
