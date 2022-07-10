
export {openPopup, closePopup, closeByEsc};
import {enableValidation, toggleButtonState, disableSubmit} from './validate.js';
//закрытие попапов по Esc
function closeByEsc(evt) {
  if (evt.key === "Escape") {
    const popupOpened = document.querySelector('.popup_opened')
    closePopup(popupOpened);
  }
}
//открытие и закрытие попапов
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEsc);
  disableSubmit(popup);
  
}
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEsc);
}






