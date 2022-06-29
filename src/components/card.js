import {cardTemplate, picZoom, titlePicZoom, popupPic, cardContainer} from '../index.js';
import {popupOpen} from './modal.js';

export {addCard, initialCards};

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
