export {popups, popupEdit, popupAvatar, popupAdd, popupPic, picZoom,
        titlePicZoom, profName, profAbout, popupProfName,
        popupProfAbout, profAvatar, popupAvatarLink, popupAddName, popupAddLink,
        popupEditBtn, popupAvatarBtn, popupAddBtn, cardTemplate, cardContainer};

import {openAdd, openEditPopup, openAvatarPopup,
        formAvatar, formEditProf, formAddCard} from './components/modal.js';
import {closePopup} from './components/utils.js';
import {enableValidation} from './components/validate.js';
import {addCard} from './components/card.js';
import './pages/index.css';

import {getUser, getMassiveCard} from './api.js'

const popups = document.querySelectorAll('.popup');

const popupEdit = document.querySelector('.popup_type_edit');
const popupAvatar = document.querySelector('.popup_type_avatar');
const popupAdd = document.querySelector('.popup_type_add');

const btnEdit = document.querySelector('.profile__edit-btn');
const btnAdd = document.querySelector('.profile__add-btn');
const profAvatar = document.querySelector('.profile__avatar');

const popupPic = document.querySelector('.popup_type_pic');
const picZoom = popupPic.querySelector('.popup__pic');
const titlePicZoom = popupPic.querySelector('.popup__title-pic');

const popupFormEdit = popupEdit.querySelector('.popup__form_edit');
const profName = document.querySelector('.profile__name');
const profAbout = document.querySelector('.profile__about');
const popupProfName = popupEdit.querySelector('.popup__input_form_name');
const popupProfAbout = popupEdit.querySelector('.popup__input_form_about');
const popupEditBtn = popupEdit.querySelector('.popup__save-btn');

const popupFormAvatar = popupAvatar.querySelector('.popup__form_avatar');
const popupAvatarLink = popupAvatar.querySelector('.popup__input_avatar_link');
const popupAvatarBtn = popupAvatar.querySelector('.popup__save-btn');

const popupFormAdd = popupAdd.querySelector('.popup__form_add');
const popupAddName = popupAdd.querySelector('.popup__input_form_name-pic');
const popupAddLink = popupAdd.querySelector('.popup__input_add_link');
const popupAddBtn = popupAdd.querySelector('.popup__save-btn');

const cardTemplate = document.querySelector('#elements-template').content;
const cardContainer = document.querySelector('.elements');

//открытие попапа добавления карточки
btnAdd.addEventListener('click', openAdd);

//открытие попапа редактирования профиля
btnEdit.addEventListener('click', openEditPopup);

//открытие попапа редактирования аватара
profAvatar.addEventListener('click', openAvatarPopup);

//сохранение профиля
popupFormEdit.addEventListener('submit', formEditProf);

//сохранение аватара
popupFormAvatar.addEventListener('submit', formAvatar);

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

//закрытие попапов по клику оверлей и крестику
popups.forEach(function (popup){
  popup.addEventListener('mousedown', function (evt) {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(popup);
    }
    if (evt.target.classList.contains('popup__close')) {
      closePopup(popup);
    }
  })
})

let userId;
getUser()
  .then((data) => {
    profName.textContent = data.name
    profAbout.textContent = data.about
    profAvatar.src = data.avatar
    userId = data._id
  })
  .then(getMassiveCard)
  .then((cards) => {
    cards.forEach((card) => {
      const delIcon = (card.owner._id == userId);

      let liked = false;
      card.likes.forEach((user)=>{
        if (user._id == userId) {
          liked=true;
        }
      })

    cardContainer.append(addCard(card.link, card.name, card._id, delIcon, card.likes.length, liked));
  })
})
  .catch((err) => {
    console.log(err)
  });

