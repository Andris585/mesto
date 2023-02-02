const profileElement = document.querySelector('.profile');
const profileNameElement = profileElement.querySelector('.profile__name');
const profileBioElement = profileElement.querySelector('.profile__bio');
const profileEditButtonElement = profileElement.querySelector('.profile__button-edit');
const profileAddButtonElement = profileElement.querySelector('.profile__button-add');
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

const pageElement = document.querySelector('.page');
const popupTemplate = document.querySelector('#popup-template');
const templatePopup = popupTemplate.content.querySelector('.popup');
const templatePopupTitleElement = popupTemplate.content.querySelector('.popup__title');
const templatePopupFormElement = popupTemplate.content.querySelector('.popup__form');
const templatePopupInputElement = popupTemplate.content.querySelector('.popup__input');
const templatePopupSubmitButtonElement = popupTemplate.content.querySelector('.popup__submit');

templatePopup.classList.add('popup_type_profile');
templatePopupTitleElement.textContent = 'Редактировать профиль';
templatePopupFormElement.setAttribute('name', 'profile-form');
templatePopupInputElement.setAttribute('name', 'name');
templatePopupInputElement.setAttribute('placeholder', 'Ваше имя?');
templatePopupInputElement.classList.add('popup__input_type_name');
templatePopupInputElement.nextElementSibling.setAttribute('name', 'bio');
templatePopupInputElement.nextElementSibling.setAttribute('placeholder', 'Кто вы?');
templatePopupInputElement.nextElementSibling.classList.add('popup__input_type_bio');
templatePopupSubmitButtonElement.textContent = 'Сохранить';

let popup = popupTemplate.content.cloneNode(true);
pageElement.append(popup);

templatePopup.classList.remove('popup_type_profile');
templatePopup.classList.add('popup_type_location');
templatePopupTitleElement.textContent = 'Новое место';
templatePopupFormElement.setAttribute('name', 'location-form');
templatePopupInputElement.setAttribute('name', 'location-name');
templatePopupInputElement.setAttribute('placeholder', 'Название?');
templatePopupInputElement.classList.add('popup__input_type_location-name');
templatePopupInputElement.nextElementSibling.setAttribute('name', 'link');
templatePopupInputElement.nextElementSibling.setAttribute('placeholder', 'Ссылка на картинку');
templatePopupInputElement.nextElementSibling.classList.add('popup__input_type_link');
templatePopupSubmitButtonElement.textContent = 'Создать';

popup = popupTemplate.content.cloneNode(true);
pageElement.append(popup);

const popupElement = document.querySelector('.popup');
const profilePopupElement = document.querySelector('.popup_type_profile');
const locationPopupElement = document.querySelector('.popup_type_location');
const profilePopupFormElement = profilePopupElement.querySelector('.popup__form');
const locationPopupFormElement = locationPopupElement.querySelector('.popup__form');
const popupInputNameElement = profilePopupElement.querySelector('.popup__input_type_name');
const popupInputBioElement = profilePopupElement.querySelector('.popup__input_type_bio');
const popupInputLocationNameElement = locationPopupElement.querySelector('.popup__input_type_location-name');
const popupInputLinkElement = locationPopupElement.querySelector('.popup__input_type_link');
const profilePopupCloseButtonElement = profilePopupElement.querySelector('.popup__close-button');
const locationPopupCloseButtonElement = locationPopupElement.querySelector('.popup__close-button');
const popupSubmitButtonElement = popupElement.querySelector('.popup__submit');


const openProfilePopup = function() {
  profilePopupElement.classList.add('popup_opened');
  popupInputNameElement.value = profileNameElement.textContent;
  popupInputBioElement.value = profileBioElement.textContent;
}

const openLocationPopup = function() {
  locationPopupElement.classList.add('popup_opened');
}

const closeProfilePopup = function() {
  profilePopupElement.classList.remove('popup_opened');
}

const closeLocationPopup = function() {
  locationPopupElement.classList.remove('popup_opened');
}

profileEditButtonElement.addEventListener('click', openProfilePopup);
profileAddButtonElement.addEventListener('click', openLocationPopup);
profilePopupCloseButtonElement.addEventListener('click', closeProfilePopup);
locationPopupCloseButtonElement.addEventListener('click', closeLocationPopup);

function handleProfileFormSubmit (evt) {
    evt.preventDefault(); 
    let profileNameEdited = popupInputNameElement.value;
    let profileBioEdited = popupInputBioElement.value;
    profileNameElement.textContent = profileNameEdited;
    profileBioElement.textContent = profileBioEdited;
    closeProfilePopup();
}

function handleLocationFormSubmit (evt) {
  evt.preventDefault(); 
  let locationNameCreated = popupInputLocationNameElement.value;
  let locationLinkCreated = popupInputLinkElement.value;
  elementsPicElement.setAttribute('src', locationLinkCreated);
  elementsPicElement.setAttribute('alt', `${locationNameCreated}, пейзаж`);
  elementsCaptionElement.textContent = locationNameCreated;
  let listItemElement = templateCardElement.content.cloneNode(true);
  elementsListElement.prepend(listItemElement);
  closeLocationPopup();
}

profilePopupFormElement.addEventListener('submit', handleProfileFormSubmit);
locationPopupFormElement.addEventListener('submit', handleLocationFormSubmit);

const elementsListElement = document.querySelector('.elements__list');
const templateCardElement = document.querySelector('#card-template');
let elementsCaptionElement = templateCardElement.content.querySelector('.elements__caption');
let elementsPicElement = templateCardElement.content.querySelector('.elements__pic');

initialCards.forEach(function(element) {
  elementsPicElement.setAttribute('src', element.link);
  elementsPicElement.setAttribute('alt', `${element.name}, пейзаж`);
  elementsPicElement.setAttribute('id', 'card-pic');
  elementsCaptionElement.textContent = element.name;
  let listItemElement = templateCardElement.content.cloneNode(true);
  elementsListElement.append(listItemElement);
});

const elementsLikeButtonElement = document.querySelector('.elements__like');
const elementsDeleteButtonElement = document.querySelector('.elements__delete-button');

elementsListElement.onclick = function(evt) {
  let target = evt.target;
  if (target.id != 'like') return;
  target.classList.toggle('elements__like_active');
};

const elementsItem = document.querySelector('.elements');

elementsItem.onclick = function(evt) {
  let target = evt.target;
  if (target.id != 'delete') return;
  elementsListElement.removeChild(target.parentNode);
};

const popupImgScaleTemplate = document.querySelector('#popup-img-scale-template');
const templatePopupPicScaled = popupImgScaleTemplate.content.querySelector('.popup__pic-scaled');
const templatePopupPicCaption = popupImgScaleTemplate.content.querySelector('.popup__pic-caption');
const elementsPicToClickElement = document.querySelector('.elements__pic');

const contentElement = pageElement.querySelector('.content');


pageElement.onclick = function(evt) {
  let target = evt.target;
  if (target.id != 'card-pic') return; 
  templatePopupPicScaled.setAttribute('src', target.getAttribute('src'));
  templatePopupPicScaled.setAttribute('alt', `Виды ${target.parentNode.childNodes[5].childNodes[1].textContent}`);
  templatePopupPicCaption.textContent = target.parentNode.childNodes[5].childNodes[1].textContent;
  const popupPic = popupImgScaleTemplate.content.cloneNode(true);
  pageElement.append(popupPic);
  const picScalePopupElement = pageElement.querySelector('.popup_type_img-scale');
  setTimeout(function() {
    picScalePopupElement.classList.add('popup_opened')}, 100);
  const picScalePopupCloseButton = picScalePopupElement.querySelector('.popup__close-button');
  picScalePopupCloseButton.onclick = function() {
  picScalePopupElement.classList.remove('popup_opened');
  setTimeout(function() {
    pageElement.removeChild(picScalePopupElement)}, 500);
  }
};