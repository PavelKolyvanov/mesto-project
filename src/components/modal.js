
export {popupOpen, popupClose, editPopupOpen, formEditProf, addOpen, formAddCard};

import {popups, popupEdit, popupAdd, popupPic, profName, profAbout, popupProfName, popupProfAbout, popupAddName, popupAddLink, cardContainer} from '../index.js';

//открытие и закрытие попапов
function popupOpen(popup) {
  popup.classList.add('popup_opened');
}
function popupClose(popup) {
  popup.classList.remove('popup_opened');
}

//попап редактирования профиля
//открытие, заполнение
function editPopupOpen() {
  popupOpen(popupEdit);
  popupProfName.value = profName.textContent;
  popupProfAbout.value = profAbout.textContent;
}
//сохранение
function formEditProf(save) {
  save.preventDefault();
  profName.textContent = popupProfName.value;
  profAbout.textContent = popupProfAbout.value;
  editPopupClose();
}
//закрытие
function editPopupClose() {
  popupClose(popupEdit);
}

//попап добавления карточки
//открытие
function addOpen() {
  popupOpen(popupAdd);
}
//заполнение и добавление
function formAddCard(add) {
  add.preventDefault();
  cardContainer.prepend(addCard(popupAddLink.value, popupAddName.value));
  addClose();
}
//закрытие
function addClose() {
  popupAddLink.value = '';
  popupAddName.value = '';
  popupClose(popupAdd);
}


//закрытие увеличенной картинки
function zoomedPicClose() {
  popupClose(popupPic);
}
