'use strict';

const CHECKOUT_ARR = [`12:00`, `13:00`, `14:00`];
const CHECKIN_ARR = [`12:00`, `13:00`, `14:00`];
const FEATURES_ARR = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
const TYPE_ARR = [`palace`, `flat`, `house`, `bungalow`];
const PHOTOS_ARR = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];
document.querySelector(`.map`).classList.remove(`map--faded`);

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function getRandomElement(arr) {
  let rand = Math.floor(Math.random() * arr.length);
  return arr[rand];
}

function getRandomArray(array) {
  let result = [];
  let length = Math.floor(Math.random() * array.length + 1);
  for (let i = 0; i < length; i++) {
    let rand = Math.floor(Math.random() * array.length);
    if (result.indexOf(array[rand]) === -1) {
      result.push(array[rand]);
    }
  }
  return result;
}

let newAds = [];

for (let i = 0; i < 8; i++) {
  let locationPoint = {
    x: getRandomInt(0, 1200),
    y: getRandomInt(130, 630)
  };
  let newObjectAd = {
    author: {
      avatar: `img/avatars/user0${i + 1}.png`,
    },
    offer: {
      title: `Заголовок${i + 1}`,
      address: `${locationPoint.x}, ${locationPoint.y}`,
      price: getRandomInt(100, 6000),
      type: getRandomElement(TYPE_ARR),
      rooms: getRandomInt(1, 4),
      guests: getRandomInt(1, 6),
      checkin: getRandomElement(CHECKIN_ARR),
      checkout: getRandomElement(CHECKOUT_ARR),
      features: getRandomArray(FEATURES_ARR),
      description: `Здесь будет ваше описание`,
      photos: getRandomArray(PHOTOS_ARR),
    },
    location: locationPoint,
  };
  newAds.push(newObjectAd);
}

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

let engToRuMap = {
  flat: `Квартира`,
  bungalow: `Бунгало`,
  house: `Дом`,
  palace: `Дворец`
};

let renderCard = function (newAd) {
  let cardElementItem = cardElementTemplate.cloneNode(true);
  cardElementItem.querySelector(`.popup__title`).textContent = newAd.offer.title;
  cardElementItem.querySelector(`.popup__text--address`).textContent = newAd.offer.address;
  cardElementItem.querySelector(`.popup__text--price`).textContent = `${newAd.offer.price}₽/ночь`;
  cardElementItem.querySelector(`.popup__type`).textContent = engToRuMap[newAd.offer.type];
  cardElementItem.querySelector(`.popup__text--capacity`).textContent = `${newAd.offer.rooms} комнаты для ${newAd.offer.guests} гостей`;
  cardElementItem.querySelector(`.popup__text--time`).textContent = `Заезд после ${newAd.offer.checkin}, выезд до ${newAd.offer.checkout}`;
  let popupFeaturesBlock = cardElementItem.querySelector(`.popup__features`);
  let popupFeatures = popupFeaturesBlock.querySelectorAll(`.popup__feature`);

  if (popupFeatures.length > newAd.offer.features.length) {
    for (let i = newAd.offer.features.length; i < popupFeatures.length; i++) {
      let child = popupFeatures[i];
      child.parentElement.removeChild(child);
    }
  }

  for (let i = 0; i < newAd.offer.features.length; i++) {
    popupFeatures[i].classList.remove(`popup__feature--${FEATURES_ARR[i]}`);
    popupFeatures[i].textContent = newAd.offer.features[i];
    popupFeatures[i].classList.add(`popup__feature--${newAd.offer.features[i]}`);
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
for (let i = 0; i < newAds.length; i++) {
  fragment.appendChild(renderMark(newAds[i]));
}

fragment.appendChild(renderCard(newAds[0]));

markElement.appendChild(fragment);
