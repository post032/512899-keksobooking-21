'use strict';

(function () {
  let markElementTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
  let cardElementTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);
  let markElement = document.querySelector(`.map__pins`);

  let renderMark = function (newAd) {
    let markElementItem = markElementTemplate.cloneNode(true);
    markElementItem.style.left = newAd.location.x + 25 + `px`;
    markElementItem.style.top = newAd.location.y + 70 + `px`;
    let avatarImg = markElementItem.querySelector(`img`);
    avatarImg.src = newAd.author.avatar;
    avatarImg.alt = `фото пользователя`;
    return markElementItem;
  };

  let renderCard = function (newAd) {
    let cardElementItem = cardElementTemplate.cloneNode(true);
    cardElementItem.querySelector(`.popup__title`).textContent = newAd.offer.title;
    cardElementItem.querySelector(`.popup__text--address`).textContent = newAd.offer.address;
    cardElementItem.querySelector(`.popup__text--price`).textContent = `${newAd.offer.price}₽/ночь`;
    cardElementItem.querySelector(`.popup__type`).textContent = window.utils.engToRuMap[newAd.offer.type];
    cardElementItem.querySelector(`.popup__text--capacity`).textContent = `${newAd.offer.rooms} комнаты для ${newAd.offer.guests} гостей`;
    cardElementItem.querySelector(`.popup__text--time`).textContent = `Заезд после ${newAd.offer.checkin}, выезд до ${newAd.offer.checkout}`;
    let popupFeaturesBlock = cardElementItem.querySelector(`.popup__features`);
    popupFeaturesBlock.innerHTML = ``;
    for (let i = 0; i < newAd.offer.features.length; i++) {
      let popupFeatureElement = document.createElement(`li`);
      popupFeatureElement.textContent = newAd.offer.features[i];
      popupFeatureElement.classList.add(`popup__feature`, `popup__feature--${newAd.offer.features[i]}`);
      popupFeaturesBlock.append(popupFeatureElement);
    }
    if (!popupFeaturesBlock.querySelector(`.popup__feature`)) {
      popupFeaturesBlock.style.display = `none`;
    }
    cardElementItem.querySelector(`.popup__description`).textContent = newAd.offer.description;
    let blockImg = cardElementItem.querySelector(`.popup__photos`);
    let image = blockImg.querySelector(`img`);
    image.remove();
    for (let i = 0; i < newAd.offer.photos.length; i++) {
      let cloneImg = image.cloneNode(true);
      cloneImg.src = newAd.offer.photos[i];
      blockImg.appendChild(cloneImg);
    }
    cardElementItem.querySelector(`.popup__avatar`).src = newAd.author.avatar;
    return cardElementItem;
  };
  let fragment = document.createDocumentFragment();
  for (let i = 0; i < window.data.newAds.length; i++) {
    fragment.appendChild(renderMark(window.data.newAds[i]));
  }

  window.pinCard = {
    markElement,
    renderCard,
    fragment,
  };
})();
