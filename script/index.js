const profileElement = document.querySelector('.profile');
const profileNameElement = profileElement.querySelector('.profile__name');
const profileBioElement = profileElement.querySelector('.profile__bio');
const profileEditButtonElement = profileElement.querySelector('.profile__button-edit');
const profileAddButtonElement = profileElement.querySelector('.profile__button-add');
const popupElement = document.querySelector('.popup');
const popupFormElement = popupElement.querySelector('.popup__form');
const popupInputNameElement = popupElement.querySelector('.popup__input-name');
const popupInputBioElement = popupElement.querySelector('.popup__input-bio');
const popupCloseButtonElement = popupElement.querySelector('.popup__close-button');
const popupSubmitButtonElement = popupElement.querySelector('.popup__submit');
const elementsLikeButtonElement = document.querySelector('.elements__like');



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