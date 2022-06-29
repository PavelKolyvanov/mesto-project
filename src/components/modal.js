
export {openPopup, closePopup, openEditPopup, formEditProf, openAdd, formAddCard};

import {popupEdit, popupAdd, profName, profAbout, popupProfName, popupProfAbout, popupAddName, popupAddLink, popupAddBtn, cardContainer} from '../index.js';
import {addCard} from './card.js';

//открытие и закрытие попапов
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEsc);
}
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEsc);
}
//закрытие попапов по Esc
function closeByEsc(evt) {
  if (evt.key === "Escape") {
    const popupOpened = document.querySelector('.popup_opened')
    closePopup(popupOpened);
  }
}

//попап редактирования профиля
//открытие, заполнение
function openEditPopup() {
  openPopup(popupEdit);
  popupProfName.value = profName.textContent;
  popupProfAbout.value = profAbout.textContent;
}
//сохранение
function formEditProf(save) {
  save.preventDefault();
  profName.textContent = popupProfName.value;
  profAbout.textContent = popupProfAbout.value;
  closeEditPopup();
}
//закрытие
function closeEditPopup() {
  closePopup(popupEdit);
}

//попап добавления карточки
//открытие
function openAdd() {
  if (popupAddLink.value === '' || popupAddName.value === '') {
    popupAddBtn.classList.add('popup__save-btn_inactive');
    popupAddBtn.setAttribute('disabled', true);
  };
  openPopup(popupAdd);
}
//заполнение и добавление
function formAddCard(add) {
  add.preventDefault();
  cardContainer.prepend(addCard(popupAddLink.value, popupAddName.value));
  closeAdd();
}
//закрытие
function closeAdd() {
  popupAddLink.value = '';
  popupAddName.value = '';
  closePopup(popupAdd);
}
