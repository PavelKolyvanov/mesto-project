
const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_add');
const btnEdit = document.querySelector('.profile__edit-btn');
const btnAdd = document.querySelector('.profile__add-btn');
const btnEditClose = popupEdit.querySelector('.popup__close_edit');
const btnAddClose = popupAdd.querySelector('.popup__close_add');

const popupPic = document.querySelector('.popup_type_pic');
const picZoom = popupPic.querySelector('.popup__pic');
const titlePicZoom = popupPic.querySelector('.popup__title-pic')
const btnPicClose = popupPic.querySelector('.popup__close_pic');

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

//массив карточек
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
  ];

//открытие и закрытие попапа
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
popupFormEdit.addEventListener('submit', formEditProf);
//закрытие
function editPopupClose() {
  popupClose(popupEdit);
}

btnEdit.addEventListener('click', editPopupOpen);
btnEditClose.addEventListener('click', editPopupClose);

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
popupFormAdd.addEventListener('submit', formAddCard);
//закрытие
function addClose() {
  popupAddLink.value = '';
  popupAddName.value = '';
  popupClose(popupAdd);
}

btnAdd.addEventListener('click', addOpen);
btnAddClose.addEventListener('click', addClose);

//создание карточки
function addCard(link, name) {
  const cardElement = cardTemplate.querySelector('.elements__item').cloneNode(true);
  const btnDelete = cardElement.querySelector('.elements__trash');
  const btnLike = cardElement.querySelector('.elements__like');
  const cardPic = cardElement.querySelector('.elements__pic');
  const cardTxt = cardElement.querySelector('.elements__title');

    cardPic.src = link;
    cardPic.alt = name;
    cardTxt.textContent = name;

      function cardDelete() {
        cardElement.remove();
      }
      btnDelete.addEventListener('click', cardDelete);

      function cardLike() {
        btnLike.classList.toggle('elements__like_active');
      }
      btnLike.addEventListener('click', cardLike);

      function zoomedPic() {
        picZoom.src = link;
        picZoom.alt = name;
        titlePicZoom.textContent = name;

        popupOpen(popupPic);
      }
      cardPic.addEventListener('click', zoomedPic);

  return cardElement;
}

function zoomedPicClose() {
  popupClose(popupPic);
}
btnPicClose.addEventListener('click', zoomedPicClose);

//из массива

initialCards.forEach(function (el) {
  cardContainer.append(addCard(el.link, el.name));
})









