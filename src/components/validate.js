export {enableValidation,
        showInputError, hideInputError,
        checkInputValidity, hasInvalidInput,
        toggleButtonState, setEventListener};

const showInputError = (formPopup, inputPopup, settings, errorMessage) => {
  const errorPopup = formPopup.querySelector(`.${inputPopup.id}-error`);

  inputPopup.classList.add(settings.inputErrorClass);
  errorPopup.classList.add(settings.errorClass);
  errorPopup.textContent = errorMessage;
};

const hideInputError = (formPopup, inputPopup, settings) => {
  const errorPopup = formPopup.querySelector(`.${inputPopup.id}-error`);

  inputPopup.classList.remove(settings.inputErrorClass);
  errorPopup.classList.remove(settings.errorClass);
  errorPopup.textContent = '';
};

const checkInputValidity = (formPopup, inputPopup, settings) => {
  if (!inputPopup.validity.valid) {
    showInputError(formPopup, inputPopup, settings, inputPopup.validationMessage);
  } else {
    hideInputError(formPopup, inputPopup, settings);
    }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputPopup) => {
    return !inputPopup.validity.valid || inputPopup.value === '';
  });
};

const toggleButtonState = (inputList, buttonPopup, settings) => {
  if(hasInvalidInput(inputList)) {
    buttonPopup.classList.add(settings.inactiveButtonClass);
    buttonPopup.setAttribute('disabled', true);
  } else {
    buttonPopup.classList.remove(settings.inactiveButtonClass);
    buttonPopup.removeAttribute('disabled');
  }
};

const setEventListener = (formPopup, settings) => {
  const inputList = Array.from(formPopup.querySelectorAll(settings.inputSelector));
  const buttonPopup = formPopup.querySelector(settings.submitButtonSelector);

  toggleButtonState(inputList, buttonPopup, settings);

  inputList.forEach((inputPopup) => {
    inputPopup.addEventListener('input', function() {
      checkInputValidity(formPopup, inputPopup, settings)
      toggleButtonState(inputList, buttonPopup, settings);
    });
  });
};

const enableValidation = (settings) => {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));


  formList.forEach((formPopup) => {
    formPopup.addEventListener('submit', function(evt) {
      evt.preventDefault();
    });

    setEventListener(formPopup, settings);
  });
};
















