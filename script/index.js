import {
  initialCards,
  parameters,
  popupEditProfile,
  popupAddCard,
  popupImgScale,
  popupCloseButtons,
  popupInputName,
  popupInputBio,
  popupInputLocationName,
  popupInputLink,
  popupFormEditProfile,
  popupFormAddCard,
  popupImgScalePicCaption,
  popupImgScalePic,
  profileEditButton,
  profileAddButton,
  profileName,
  profileBio,
  elementsContainer,
  popups
} from './data.js';

import FormValidator from './FormValidator.js';

import Card from './Card.js';

import Section from './Section.js';

import PopupWithImage from './PopupWithImage.js';

import PopupWithForm from './PopupWithForm.js';

import UserInfo from './UserInfo.js';

const profileValidation = new FormValidator(parameters, popupFormEditProfile);
export {profileValidation}
const addCardValidation = new FormValidator(parameters, popupFormAddCard);
profileValidation.enableValidation();
addCardValidation.enableValidation(); 

const popupWithImageSelector = '.popup_type_img-scale';
const popupWithImage = new PopupWithImage(popupWithImageSelector);

const imageClickHandler = (data) => {
  popupWithImage.open(data);
  popupWithImage.setEventListeners();
}

const popupFormProfile = new PopupWithForm('.popup_type_edit-profile', handleProfileFormSubmit);
const popupFormNewCard = new PopupWithForm('.popup_type_add-card', handleAddCardSubmit)

const userInfo = new UserInfo({name: profileName.textContent, bio: profileBio.textContent});

const setInitialUserInfo = ({ name, bio }) => {
  popupInputName.value = name;
  popupInputBio.value = bio;
}

const editButtonClickHandler = () => {
  popupFormProfile.open();
  popupFormProfile.setEventListeners();
  profileValidation.resetValidation();
  setInitialUserInfo(userInfo.getUserInfo());
}

const addCardClickHandler = () => {
  popupFormNewCard.open();
  popupFormNewCard.setEventListeners();
  addCardValidation.resetValidation();
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault(); 
  userInfo.setUserInfo(popupFormProfile._getInputValues());
      
  popupFormProfile.close();
}

profileEditButton.addEventListener('click', editButtonClickHandler);
profileAddButton.addEventListener('click', addCardClickHandler);


const createElement = (data) => {
  const card = new Card(data, imageClickHandler, '.card-template');
  const cardElement = card.createCard();
  return cardElement;
}

const initialCardsRendered = new Section({ items: initialCards,
                                           renderer: createElement

}, '.elements__list');
console.log(initialCardsRendered);
initialCardsRendered.renderItems();



// function renderCard(cardElement, cardContainer) {
//   cardContainer.prepend(createElement(cardElement));
// }

function handleAddCardSubmit(evt) {
  evt.preventDefault();
  const inputData = [{
  link: popupInputLink.value,
  name: popupInputLocationName.value
  }];
  const cardRendered = new Section({ items: inputData,
                                     renderer: createElement
  }, '.elements__list');
  console.log(cardRendered);
  cardRendered.renderItems();
  popupFormNewCard.close();
  evt.target.reset();
}