
export {closeByEsc, openEditPopup, openAvatarPopup, formEditProf, formAvatar, openAdd, formAddCard};

import {popupEdit, popupAvatar, popupAdd, profName, profAbout, popupProfName, popupProfAbout, profAvatar,
        popupAvatarLink, popupAddName, popupAddLink, popupEditBtn, popupAvatarBtn, popupAddBtn, cardContainer} from '../index.js';
import {addCard} from './card.js';
import {closePopup, openPopup} from './utils.js';

import {editUser, addCardPic, avatarPic} from '../api.js';


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
function formEditProf(edit) {
  edit.preventDefault();
  popupEditBtn.textContent = 'Сохранить...';
  editUser({name: popupProfName.value,
            about: popupProfAbout.value})
    .then((dataFromServer)=> {
      profName.textContent = popupProfName.value;
      profAbout.textContent = popupProfAbout.value;
    })
    .catch((err) => {
      console.log(err)
    })
  closeEditPopup();
}
//закрытие
function closeEditPopup() {
  closePopup(popupEdit);
}

//попап редактирования аватара
//открытие, заполнение
function openAvatarPopup() {
  if (popupAvatarLink.value === '') {
    popupAvatarBtn.classList.add('popup__save-btn_inactive');
    popupAvatarBtn.setAttribute('disabled', true);
  };
  openPopup(popupAvatar);
}
//сохранение
function formAvatar(ava) {
  ava.preventDefault();
  popupAvatarBtn.textContent = 'Сохранить...';
  avatarPic({avatar: popupAvatarLink.value})
    .then((dataAvatar) => {
      profAvatar.src = dataAvatar.avatar;
      })
    .catch((err) => {
      console.log(err)
    });
  closeAvatarPopup();
  }
//закрытие
function closeAvatarPopup() {
  popupAvatarLink.value = '';
  closePopup(popupAvatar);
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
  popupAddBtn.textContent = 'Создать...';
  addCardPic({name: popupAddName.value,
              link: popupAddLink.value})
    .then((dataCard) => {
      cardContainer.prepend(addCard(dataCard.link, dataCard.name, dataCard._id, true, 0, false));
    })
    .catch((err) => {
      console.log(err)
    });
  closeAdd();
}
//закрытие
function closeAdd() {
  popupAddLink.value = '';
  popupAddName.value = '';
  closePopup(popupAdd);
}
