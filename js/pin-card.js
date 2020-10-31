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
  let pins = [];
  let pinsElements = [];
  let onSuccess = function (pinsElem) {
    let fragment = document.createDocumentFragment();
    for (let i = 0; i < pinsElem.length; i++) {
      fragment.appendChild(renderMark(pinsElem[i]));
    }
    window.pinCard.pinsElements = Array.from(pinsElem);
    markElement.appendChild(fragment);
    window.pinCard.pins = Array.from(window.main.MAIN.querySelectorAll(`.map__pin:not(.map__pin--main)`));
  };

  let onReset = function () {
    window.maps.adForm.reset();
    window.form.address.value = `${window.form.locationStart.x}, ${window.form.locationStart.y}`;
    window.maps.openPinPage.style.left = window.form.locationStart.x + `px`;
    window.maps.openPinPage.style.top = window.form.locationStart.y + `px`;
  };

  let resetButton = window.maps.adForm.querySelector(`.ad-form__reset`);
  resetButton.addEventListener(`click`, function (e) {
    e.preventDefault();
    onReset();
  });

  let onError = function (errorMessage) {
    let node = document.createElement(`div`);
    node.style = `padding: 20px; transform: translateX(-50%); z-index: 100; margin: 0 auto; text-align: center; background-color: #ffffff; border: 3px solid red; border-radius: 10px;`;
    node.style.position = `absolute`;
    node.style.left = 50 + `%`;
    node.style.top = 50 + `%`;
    node.style.fontSize = `30px`;

    node.textContent = errorMessage;
    document.body.insertAdjacentElement(`afterbegin`, node);
  };

  window.maps.adForm.addEventListener(`submit`, function (evt) {
    window.form.address.removeAttribute(`disabled`);
    if (window.maps.adForm.checkValidity()) {
      window.upload(new FormData(window.maps.adForm), function () {
        window.maps.adForm.classList.add(`ad-form--disabled`);
        window.maps.map.classList.add(`map--faded`);
        for (let fieldsetElement of window.maps.fieldsetElements) {
          fieldsetElement.setAttribute(`disabled`, true);
        }
        for (let pin of window.pinCard.pins) {
          pin.remove();
        }
        onReset();
      });
    }
    evt.preventDefault();
  });

  window.pinCard = {
    markElement,
    renderCard,
    onSuccess,
    pinsElements,
    pins,
    onError
  };
})();
