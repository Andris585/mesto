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
const elementsList = document.querySelector('.elements__list');
const cardTemplate = document.querySelector('#card-template').content;
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

function openPopup(popup) {
  popup.classList.add('popup_opened');
}
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

function openPopupEditProfile() {
    popupInputName.value = profileName.textContent;
    popupInputBio.value = profileBio.textContent;
    openPopup(popupEditProfile);
}
profileEditButton.addEventListener('mousedown', openPopupEditProfile);


function handleProfileFormSubmit (evt) {
    evt.preventDefault();      
    profileName.textContent = popupInputName.value;
    profileBio.textContent = popupInputBio.value;
    closePopup(popupEditProfile);
}
popupFormEditProfile.addEventListener('submit', handleProfileFormSubmit); 

function openPopupAddCard() {
    popupFormAddCard.reset();
    openPopup(popupAddCard);
}
profileAddButton.addEventListener('mousedown', openPopupAddCard);

popupCloseButtons.forEach(item => {
  const closestPopup = item.closest('.popup');
  item.addEventListener('mousedown', () => closePopup(closestPopup));
});

function openPopupImgScale(srcValue, locationNameValue){
  openPopup(popupImgScale);
  popupImgScalePicCaption.textContent = locationNameValue;
  popupImgScalePic.src = srcValue;
  popupImgScalePic.alt = locationNameValue;
};

function toggleLikeActive(evt) {
  evt.target.classList.toggle('elements__like_active');
};

function createElement(srcValue, locationValue) {
    const card = cardTemplate.querySelector('.elements__item');
    const cardElement = card.cloneNode(true);
    const likeButton = cardElement.querySelector('.elements__like');
    const deleteButton = cardElement.querySelector('.elements__delete-button');
    const imgButton = cardElement.querySelector('.elements__pic');
    const cardCaption = cardElement.querySelector('.elements__caption')
    imgButton.src = srcValue;
    imgButton.alt = `${locationValue}, пейзаж`;
    cardCaption.textContent = locationValue;
    deleteButton.addEventListener('mousedown', () => cardElement.remove());
    likeButton.addEventListener('mousedown', toggleLikeActive);
    imgButton.addEventListener('mousedown', () => openPopupImgScale(srcValue, locationValue));
    return cardElement;
};

function addElement(cardElement) {
  elementsList.prepend(cardElement);
};

initialCards.forEach(element => addElement(createElement(element.link, element.name)));

function addCard(evt) {
  evt.preventDefault();
  const newSrc = popupInputLink.value;
  const newLocation =  popupInputLocationName.value;
  addElement(createElement(newSrc, newLocation));
  closePopup(popupAddCard);
  evt.target.reset();
};
popupAddCard.addEventListener('submit', addCard);