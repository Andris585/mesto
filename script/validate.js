const showInputError = (parameters, formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(parameters.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(parameters.errorClass);
}

const hideInputError = (parameters, formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(parameters.inputErrorClass);
  errorElement.textContent = "";
  errorElement.classList.remove(parameters.errorClass);
}

const checkInputValidity = (parameters, formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(parameters, formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(parameters, formElement, inputElement);
  }
}

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
  })
}

const toggleButtonState = (parameters, inputList, buttonElement) => {
if (hasInvalidInput(inputList)) {
  buttonElement.classList.add(parameters.inactiveButtonClass);
  buttonElement.disabled = true;
} else {
  buttonElement.classList.remove(parameters.inactiveButtonClass);
  buttonElement.removeAttribute('disabled');
}
}

const setEventListeners = (parameters, formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(parameters.inputSelector));
  const buttonElement = formElement.querySelector(parameters.submitButtonSelector);
  toggleButtonState(parameters, inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(parameters, formElement, inputElement);
      toggleButtonState(parameters, inputList, buttonElement)
    })
  })
}

const enableValidation = (parameters) => {
  const formList = Array.from(document.querySelectorAll(parameters.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    })
    setEventListeners(parameters, formElement);
  })
}

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_active'
});