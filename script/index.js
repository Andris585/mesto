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
const cardTemplate = document.querySelector('#card-template').content;

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
    openPopup(popupAddCard);
}
profileAddButton.addEventListener('click', openPopupAddCard);

popupCloseButtons.forEach(item => {
  const closestPopup = item.closest('.popup');
  item.addEventListener('click', () => closePopup(closestPopup));
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
    deleteButton.addEventListener('click', () => cardElement.remove());
    likeButton.addEventListener('click', toggleLikeActive);
    imgButton.addEventListener('click', () => openPopupImgScale(srcValue, locationValue));
    return cardElement;
    
};

function renderCards(cardElement) {
  elementsContainer.prepend(cardElement);
};

initialCards.forEach(element => renderCards(createElement(element.link, element.name)));

function addCard(evt) {
  evt.preventDefault();
  const newSrc = popupInputLink.value;
  const newLocation =  popupInputLocationName.value;
  renderCards(createElement(newSrc, newLocation));
  closePopup(popupAddCard);
  evt.target.reset();
};
popupFormAddCard.addEventListener('submit', addCard);