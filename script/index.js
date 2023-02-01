const profileElement = document.querySelector('.profile');
const profileNameElement = profileElement.querySelector('.profile__name');
const profileBioElement = profileElement.querySelector('.profile__bio');
const profileEditButtonElement = profileElement.querySelector('.profile__button-edit');
const profileAddButtonElement = profileElement.querySelector('.profile__button-add');
const popupElement = document.querySelector('.popup');
const popupFormElement = popupElement.querySelector('.popup__form');
const popupInputNameElement = popupElement.querySelector('.popup__input_type_name');
const popupInputBioElement = popupElement.querySelector('.popup__input_type_bio');
const popupCloseButtonElement = popupElement.querySelector('.popup__close-button');
const popupSubmitButtonElement = popupElement.querySelector('.popup__submit');
const elementsLikeButtonElement = document.querySelector('.elements__like');
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



const openPopup = function() {
  popupElement.classList.add('popup_opened');
  popupInputNameElement.value = profileNameElement.textContent;
  popupInputBioElement.value = profileBioElement.textContent;
}

const closePopup = function() {
  popupElement.classList.remove('popup_opened');
}

profileEditButtonElement.addEventListener('click', openPopup);
popupCloseButtonElement.addEventListener('click', closePopup)

function handleFormSubmit (evt) {
    evt.preventDefault(); 
    let profileNameEdited = popupInputNameElement.value;
    let profileBioEdited = popupInputBioElement.value;
    profileNameElement.textContent = profileNameEdited;
    profileBioElement.textContent = profileBioEdited;
    closePopup();
}

popupFormElement.addEventListener('submit', handleFormSubmit);

const elementsListElement = document.querySelector('.elements__list');
const templateElement = document.querySelector('#card-template');
let elementsCaptionElement = templateElement.content.querySelector('.elements__caption');
let elementsPicElement = templateElement.content.querySelector('.elements__pic');

initialCards.forEach(function(element) {
  elementsPicElement.setAttribute('src', element.link);
  elementsPicElement.setAttribute('alt', `${element.name}, пейзаж`);
  elementsCaptionElement.textContent = element.name;
  let listItemElement = templateElement.content.cloneNode(true);
  elementsListElement.append(listItemElement);
});