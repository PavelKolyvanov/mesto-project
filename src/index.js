export {popups, popupEdit, popupAdd, popupPic, picZoom, titlePicZoom, profName, profAbout, popupProfName, popupProfAbout, popupAddName, popupAddLink, cardTemplate, cardContainer};

import {popupClose, addOpen, editPopupOpen, formEditProf, formAddCard} from './components/modal.js';
import {enableValidation} from './components/validate.js';
import {addCard, initialCards} from './components/card.js';
import './pages/index.css'; //импорт главного файла стилей

const popups = document.querySelectorAll('.popup');

const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_add');
const btnEdit = document.querySelector('.profile__edit-btn');
const btnAdd = document.querySelector('.profile__add-btn');

const popupPic = document.querySelector('.popup_type_pic');
const picZoom = popupPic.querySelector('.popup__pic');
const titlePicZoom = popupPic.querySelector('.popup__title-pic')

const popupFormEdit = popupEdit.querySelector('.popup__form_edit');
const profName = document.querySelector('.profile__name');
const profAbout = document.querySelector('.profile__about');
const popupProfName = popupEdit.querySelector('.popup__input_form_name');
const popupProfAbout = popupEdit.querySelector('.popup__input_form_about');

const popupFormAdd = popupAdd.querySelector('.popup__form_add');
const popupAddName = popupAdd.querySelector('.popup__input_form_name-pic');
const popupAddLink = popupAdd.querySelector('.popup__input_form_link');

const cardTemplate = document.querySelector('#elements-template').content;
const cardContainer = document.querySelector('.elements');

//открытие попапа добавления карточки
btnAdd.addEventListener('click', addOpen);

//открытие попапа редактирования профиля
btnEdit.addEventListener('click', editPopupOpen);

//сохранение профиля
popupFormEdit.addEventListener('submit', formEditProf);

//сохранение/публикация карточки
popupFormAdd.addEventListener('submit', formAddCard);

//валидация
enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-btn',
  inactiveButtonClass: 'popup__save-btn_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
});

//закрытие попапов по Esc
document.addEventListener('keydown', function(evt) {
  const popupOpened = document.querySelector('.popup_opened')
  if (evt.key === "Escape") {
    popupClose(popupOpened);
  }
});
//закрытие попапов по клику оверлей и крестику
popups.forEach(function (popup){
  popup.addEventListener('mousedown', function (evt) {
    if (evt.target.classList.contains('popup_opened')) {
      popupClose(popup);
    }
    if (evt.target.classList.contains('popup__close')) {
      popupClose(popup);
    }
  })
})

//карточки из массива
initialCards.forEach(function (el) {
  cardContainer.append(addCard(el.link, el.name));
});