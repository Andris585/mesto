const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const parameters = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_active'
};

const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const popupAddCard = document.querySelector('.popup_type_add-card');
const popupImgScale = document.querySelector('.popup_type_img-scale');
const popupCloseButtons = document.querySelectorAll('.popup__close-button');
const popupInputName = document.querySelector('.popup__input_type_name');
const popupInputBio = document.querySelector('.popup__input_type_bio');
const popupInputLocationName = document.querySelector('.popup__input_type_location-name');
const popupInputLink = document.querySelector('.popup__input_type_link');
const popupFormEditProfile = document.querySelector('.popup__form_type_edit-profile');
const popupFormAddCard = document.querySelector('.popup__form_type_add-card');
const popupImgScalePicCaption = document.querySelector('.popup__pic-caption');
const popupImgScalePic = document.querySelector('.popup__pic-scaled');
const profileEditButton = document.querySelector('.profile__button-edit');
const profileAddButton = document.querySelector('.profile__button-add');
const profileName = document.querySelector('.profile__name');
const profileBio = document.querySelector('.profile__bio');
const elementsContainer = document.querySelector('.elements__list');
const popups = document.querySelectorAll('.popup');

export {
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
}