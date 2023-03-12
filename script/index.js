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

import { FormValidator } from './FormValidator.js';

import { Card } from './Card.js';

const executeValidation = (formItem) => {
  const validator = new FormValidator(parameters, formItem);
  return validator;
}

executeValidation(popupFormEditProfile).enableValidation();
executeValidation(popupAddCard).enableValidation();

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupOnEsc);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupOnEsc);
 }

function openPopupEditProfile() {
    popupInputName.value = profileName.textContent;
    popupInputBio.value = profileBio.textContent;
    popupEditProfile.querySelector('.popup__submit').removeAttribute('disabled', '');
    popupEditProfile.querySelector('.popup__submit').classList.remove('popup__submit_inactive');
    openPopup(popupEditProfile);
}

profileEditButton.addEventListener('click', openPopupEditProfile);


function handleProfileFormSubmit (evt) {
    evt.preventDefault();      
    profileName.textContent = popupInputName.value;
    profileBio.textContent = popupInputBio.value;
    closePopup(popupEditProfile);
}
popupFormEditProfile.addEventListener('submit', handleProfileFormSubmit); 

function openPopupAddCard() {
    popupFormAddCard.reset();
    popupFormAddCard.querySelector('.popup__submit').disabled = true;
    popupFormAddCard.querySelector('.popup__submit').classList.add('popup__submit_inactive');
    openPopup(popupAddCard);
}
profileAddButton.addEventListener('click', openPopupAddCard);

popupCloseButtons.forEach(item => {
  const closestPopup = item.closest('.popup');
  item.addEventListener('click', () => closePopup(closestPopup));
});

function openPopupImgScale(link, name){
  openPopup(popupImgScale);
  popupImgScalePicCaption.textContent = name;
  popupImgScalePic.src = link;
  popupImgScalePic.alt = name;
};

function toggleLikeActive(evt) {
  evt.target.classList.toggle('elements__like_active');
};

popupFormAddCard.addEventListener('submit', addCard);

popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target === evt.currentTarget) {
      closePopup(popup);
    }
  })
})

function closePopupOnEsc(evt) {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened'));
  }
}

const createElement = (data) => {
  console.log(data);
  const card = new Card(data, openPopupImgScale, '.card-template');
  const cardElement = card.createCard();
  return cardElement;
}

function renderCard(cardElement, cardContainer) {
  cardContainer.prepend(createElement(cardElement));
}

initialCards.forEach((element) => {
  renderCard(element, elementsContainer);
});

function addCard(evt) {
  evt.preventDefault();
  const inputData = {
  link: popupInputLink.value,
  name: popupInputLocationName.value
  }
  renderCard(inputData, elementsContainer);
  closePopup(popupAddCard);
  evt.target.reset();
}