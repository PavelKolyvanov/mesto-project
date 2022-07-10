export {popups, popupEdit, popupAvatar, popupAdd, popupPic, picZoom,
        titlePicZoom, profName, profAbout, popupProfName,
        popupProfAbout, profAvatar, popupAvatarLink, popupAddName, popupAddLink,
        popupEditBtn, popupAvatarBtn, popupAddBtn, cardTemplate, cardContainer,
        handleDeleteCard, handleLikeCard, userId};

import './pages/index.css';
import {openPopup, closePopup} from './components/modal.js';
import {enableValidation,
        showError, hideError,
        checkInputValidity, hasInvalidInput,
        toggleButtonState, setEventListener} from './components/validate.js';
import {addCard, deleteCard, likeCard} from './components/card.js';
import {getUsernCards, deleteCardPic, changeLikes, editUser, avatarPic, addCardPic} from './api.js'

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

//валидация
enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-btn',
  inactiveButtonClass: 'popup__save-btn_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
});

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

//получаем информ о User и массив карточек
let userId
getUsernCards()
  .then(([user, cards]) => {
    profName.textContent = user.name
    profAbout.textContent = user.about
    profAvatar.src = user.avatar
    userId = user._id


    cards.forEach((card) => {
      let liked = false;
      cardContainer.append(addCard(card, card._id, card.likes.length, liked, userId, handleDeleteCard, handleLikeCard)); 
    })
  })
  .catch((err) => {
    console.log(err)
  });

function handleDeleteCard(cardElement, idCard) {
  deleteCardPic(idCard)
    .then(() => {
      deleteCard(cardElement)
    })
    .catch((err) => {
      console.log(err)
    });
}

function handleLikeCard(idCard, cardElement, userId, unliked) {
  changeLikes(idCard, unliked)
    .then((dataCard) => {
      likeCard(dataCard, cardElement, userId)
    })
    .catch((err) => {
      console.log(err)
    });
}

//попап редактирования профиля
//открытие, заполнение
function openEditPopup() {
  openPopup(popupEdit);
  popupProfName.value = profName.textContent;
  popupProfAbout.value = profAbout.textContent;
}
//сохранение
function formEditProf(edit) {
  edit.preventDefault();
  popupEditBtn.textContent = 'Сохранить...';
  editUser({name: popupProfName.value,
            about: popupProfAbout.value})
    .then((dataFromServer)=> {
      profName.textContent = popupProfName.value;
      profAbout.textContent = popupProfAbout.value;
      closeEditPopup();
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      popupEditBtn.textContent = 'Сохранить';   
    })
}
//закрытие
function closeEditPopup() {
  closePopup(popupEdit);
}

//попап редактирования аватара
//открытие, заполнение
function openAvatarPopup() {  
  openPopup(popupAvatar);
}
//сохранение
function formAvatar(ava) {
  ava.preventDefault();
  popupAvatarBtn.textContent = 'Сохранить...';
  avatarPic({avatar: popupAvatarLink.value})
    .then((dataAvatar) => {
      profAvatar.src = dataAvatar.avatar;
      closeAvatarPopup();
      })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      popupAvatarBtn.textContent = 'Сохранить';
    })
  }
//закрытие
function closeAvatarPopup() {
  popupAvatarLink.value = '';
  closePopup(popupAvatar);
}

//попап добавления карточки
//открытие
function openAdd() {
  openPopup(popupAdd);
}
//заполнение и добавление
function formAddCard(add) {
  add.preventDefault();
  popupAddBtn.textContent = 'Создать...';
  addCardPic({name: popupAddName.value,
              link: popupAddLink.value})
    .then((dataCard) => {
      cardContainer.prepend(addCard(dataCard, dataCard._id, 0, false, userId, handleDeleteCard, handleLikeCard));
      closeAdd();
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      popupAddBtn.textContent = 'Сохранить';
    })
}
//закрытие
function closeAdd() {
  popupAddLink.value = '';
  popupAddName.value = '';
  closePopup(popupAdd);
}