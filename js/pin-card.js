'use strict';

let markElementTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
let cardElementTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);
let successTemplate = document.querySelector(`#success`).content.querySelector(`.success`);
let errorTemplate = document.querySelector(`#error`).content.querySelector(`.error`);

let renderMark = (newAd) => {
  let markElementItem = markElementTemplate.cloneNode(true);
  markElementItem.style.left = newAd.location.x - window.main.BUTTON_WIDTH_SIZE_PIN + `px`;
  markElementItem.style.top = newAd.location.y - window.main.BUTTON_HEIGHT_SIZE_PIN + `px`;
  let avatarImg = markElementItem.querySelector(`img`);
  avatarImg.src = newAd.author.avatar;
  avatarImg.alt = `фото пользователя`;
  return markElementItem;
};

let renderCard = (newAd) => {
  let cardElementItem = cardElementTemplate.cloneNode(true);
  cardElementItem.querySelector(`.popup__title`).textContent = newAd.offer.title;
  cardElementItem.querySelector(`.popup__text--address`).textContent = newAd.offer.address;
  cardElementItem.querySelector(`.popup__text--price`).textContent = `${newAd.offer.price}₽/ночь`;
  cardElementItem.querySelector(`.popup__type`).textContent = window.utils.engToRuMap[newAd.offer.type];
  cardElementItem.querySelector(`.popup__text--capacity`).textContent = `${newAd.offer.rooms} комнаты для ${newAd.offer.guests} гостей`;
  cardElementItem.querySelector(`.popup__text--time`).textContent = `Заезд после ${newAd.offer.checkin}, выезд до ${newAd.offer.checkout}`;
  let popupFeaturesBlock = cardElementItem.querySelector(`.popup__features`);
  popupFeaturesBlock.innerHTML = ``;
  newAd.offer.features.forEach((item, index) => {
    let popupFeatureElement = document.createElement(`li`);
    popupFeatureElement.textContent = newAd.offer.features[index];
    popupFeatureElement.classList.add(`popup__feature`, `popup__feature--${newAd.offer.features[index]}`);
    popupFeaturesBlock.append(popupFeatureElement);
  });
  if (!popupFeaturesBlock.querySelector(`.popup__feature`)) {
    popupFeaturesBlock.style.display = `none`;
  }
  cardElementItem.querySelector(`.popup__description`).textContent = newAd.offer.description;
  let blockImg = cardElementItem.querySelector(`.popup__photos`);
  let image = blockImg.querySelector(`img`);
  image.remove();

  newAd.offer.photos.forEach((item, index) => {
    let cloneImg = image.cloneNode(true);
    cloneImg.src = newAd.offer.photos[index];
    blockImg.appendChild(cloneImg);
  });

  cardElementItem.querySelector(`.popup__avatar`).src = newAd.author.avatar;
  return cardElementItem;
};

let renderSuccess = () => {
  let successElement = successTemplate.cloneNode(true);
  return successElement;
};

let renderError = () => {
  let errorElement = errorTemplate.cloneNode(true);
  return errorElement;
};

window.pinCard = {
  renderCard,
  renderMark,
  renderSuccess,
  renderError
};
