import {cardTemplate, picZoom, titlePicZoom, popupPic, handleDeleteCard, handleLikeCard} from '../index.js';
import {openPopup, closePopup} from './modal.js';

export {addCard, deleteCard, likeCard};

//создание карточк
function addCard(dataCard, idCard, likes, liked, userId, handleDeleteCard, handleLikeCard) {
  const cardElement = cardTemplate.querySelector('.elements__item').cloneNode(true);
  const btnDelete = cardElement.querySelector('.elements__trash');
  const btnLike = cardElement.querySelector('.elements__like');
  const cardPic = cardElement.querySelector('.elements__pic');
  const cardTxt = cardElement.querySelector('.elements__title');
  const likesCount = cardElement.querySelector('.elements__like-counter');

    cardPic.src = dataCard.link;
    cardPic.alt = dataCard.name;
    cardTxt.textContent = dataCard.name;
    likesCount.textContent = likes.toString();

  if (dataCard.owner._id !== userId) { 
      btnDelete.remove();
  }

  btnDelete.addEventListener('click', () => handleDeleteCard(cardElement, idCard));

  btnLike.addEventListener('click', () => handleLikeCard(idCard, cardElement, userId, !btnLike.classList.contains('elements__like_active')));
  
  dataCard.likes.forEach((owner)=>{
       if (owner._id === userId) {
       liked=true;
       }
     })
      if (liked) {
        btnLike.classList.add('elements__like_active');
      }

      cardPic.addEventListener('click', () => zoomedPic(dataCard));

  return cardElement;
}

//удаление карточки
function deleteCard(cardElement) {
  cardElement.remove();
}
//лайк карточки
function ownerLike(dataLikes, userId) {
  let liked = false;
  dataLikes.forEach((owner)=>{
    if (owner._id === userId) {
      liked = true;
    }
  })
  return liked;
}

function likeCard(dataCard, cardElement, userId) {
  const btnLike = cardElement.querySelector('.elements__like');
  const likesCount = cardElement.querySelector('.elements__like-counter');

  likesCount.textContent = dataCard.likes.length.toString();
  console.log(userId);
  console.log(dataCard.likes);
  if (ownerLike(dataCard.likes, userId)) {
    btnLike.classList.add('elements__like_active');
    //console.log('add');
  } else {
    btnLike.classList.remove('elements__like_active');
    //console.log('remove');
  }
}

//увеличение карточки
function zoomedPic(dataCard) {
  picZoom.src = dataCard.link;
  picZoom.alt = dataCard.name;
  titlePicZoom.textContent = dataCard.name;

  openPopup(popupPic);
}