export {enableValidation,
        showInputError, hideInputError,
        checkInputValidity, hasInvalidInput,
        toggleButtonState, setEventListener,
		    disableSubmit};

let globalSettings = {};

const showInputError = (formPopup, inputPopup, errorMessage) => {
  const errorPopup = formPopup.querySelector(`.${inputPopup.id}-error`);

  inputPopup.classList.add(globalSettings.inputErrorClass);
  errorPopup.classList.add(globalSettings.errorClass);
  errorPopup.textContent = errorMessage;
};

const hideInputError = (formPopup, inputPopup) => {
  const errorPopup = formPopup.querySelector(`.${inputPopup.id}-error`);

  inputPopup.classList.remove(globalSettings.inputErrorClass);
  errorPopup.classList.remove(globalSettings.errorClass);
  errorPopup.textContent = '';
};


const checkInputValidity = (formPopup, inputPopup) => {
  if (!inputPopup.validity.valid) {
    showInputError(formPopup, inputPopup, inputPopup.validationMessage);
  } else {
    hideInputError(formPopup, inputPopup);
    }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputPopup) => {
    return !inputPopup.validity.valid || inputPopup.value === '';
  });
};

const toggleButtonState = (formPopup)  => {
  const buttonPopup = formPopup.querySelector(globalSettings.submitButtonSelector);
  const inputList = Array.from(formPopup.querySelectorAll(globalSettings.inputSelector));
  if(!hasInvalidInput(inputList)) {
    buttonPopup.classList.remove(globalSettings.inactiveButtonClass);
    buttonPopup.disabled = false;
  } else {
    buttonPopup.classList.add(globalSettings.inactiveButtonClass);
    buttonPopup.disabled = 'disabled';
  }
 };

const disableSubmit = (formPopup) => {
  const buttonPopup = formPopup.querySelector(globalSettings.submitButtonSelector);
  const inputList = Array.from(formPopup.querySelectorAll(globalSettings.inputSelector));
  
  inputList.forEach((inputPopup) => {
    inputPopup.value = '';
  });
  
  toggleButtonState(formPopup);
}
 
const setEventListener = (formPopup) => {
  const inputList = Array.from(formPopup.querySelectorAll(globalSettings.inputSelector));
  toggleButtonState(formPopup);

  inputList.forEach((inputPopup) => {
    inputPopup.addEventListener('input', function() {
      checkInputValidity(formPopup, inputPopup)
      toggleButtonState(formPopup);
    });
  });
};

const enableValidation = (settings) => {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));

  globalSettings = settings;

  formList.forEach((formPopup) => {
    formPopup.addEventListener('submit', function(evt) {
      evt.preventDefault();
    });

    setEventListener(formPopup);
  });
};


/*
//валидация
enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-btn',
  inactiveButtonClass: 'popup__save-btn_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
});
*/