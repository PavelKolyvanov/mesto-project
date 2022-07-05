import {cardTemplate, picZoom, titlePicZoom, popupPic} from '../index.js';
import {openPopup} from './utils.js';

export {addCard};

import {deleteCardPic, changeLikes} from '../api.js';

//создание карточки
function addCard(link, name, idCard, delIcon, likes, liked) {
  const cardElement = cardTemplate.querySelector('.elements__item').cloneNode(true);
  const btnDelete = cardElement.querySelector('.elements__trash');
  const btnLike = cardElement.querySelector('.elements__like');
  const cardPic = cardElement.querySelector('.elements__pic');
  const cardTxt = cardElement.querySelector('.elements__title');
  const likesCount = cardElement.querySelector('.elements__like-counter');

    cardPic.src = link;
    cardPic.alt = name;
    cardTxt.textContent = name;
    likesCount.textContent = likes.toString();

    function deleteCard(evt) {
      deleteCardPic(idCard)
        .then(() => {
          cardElement.remove()
        })
        .catch((err) => {
          console.log(err)
        });
    }
    if (delIcon) {
      btnDelete.addEventListener('click', deleteCard);
    } else {
      btnDelete.classList.add('elements__trash_hide');
      }

      function likeCard() {
        changeLikes(idCard, !btnLike.classList.contains('elements__like_active'))
        .then((dataCard) => {
          likesCount.textContent = dataCard.likes.length.toString();
          btnLike.classList.toggle('elements__like_active');
        })
        .catch((err) => {
          console.log(err)
        });
      }
      btnLike.addEventListener('click', likeCard);

      if (liked) {
        btnLike.classList.add('elements__like_active');
      }

      function zoomedPic() {
        picZoom.src = link;
        picZoom.alt = name;
        titlePicZoom.textContent = name;

        openPopup(popupPic);
      }
      cardPic.addEventListener('click', zoomedPic);

  return cardElement;
}
