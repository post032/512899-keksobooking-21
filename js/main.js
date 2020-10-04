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
    result.push(array[rand]);
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
let markElements = document.querySelector(`.map__pins`);
let cardElements = document.querySelector(`.map`);

let renderMark = function (newAd) {
  let markElement = markElementTemplate.cloneNode(true);
  markElement.style.left = newAd.location.x + 25 + `px`;
  markElement.style.top = newAd.location.y + 70 + `px`;
  let avatarImg = markElement.querySelector(`img`);
  avatarImg.src = newAd.author.avatar;
  avatarImg.alt = `фото пользователя`;
  return markElement;
};

let engToRuMap = {
  flat: `бунгало`,
  bungalow: `Бунгало`,
  house: `Дом`,
  palace: `Дворец`
};

let renderCard = function (newAd) {
  let cardElement = cardElementTemplate.cloneNode(true);
  cardElement.querySelector(`.popup__title`).textContent = newAd.offer.title;
  cardElement.querySelector(`.popup__text--address`).textContent = newAd.offer.address;
  cardElement.querySelector(`.popup__text--price`).textContent = `${newAd.offer.price}₽/ночь`;
  cardElement.querySelector(`.popup__type`).textContent = engToRuMap[newAd.offer.type];
  cardElement.querySelector(`.popup__text--capacity`).textContent = `${newAd.offer.rooms} комнаты для ${newAd.offer.guests} гостей`;
  cardElement.querySelector(`.popup__text--time`).textContent = `Заезд после ${newAd.offer.checkin}, выезд до ${newAd.offer.checkout}`;
  cardElement.querySelector(`.popup__features`).textContent = newAd.offer.features;
  cardElement.querySelector(`.popup__description`).textContent = newAd.offer.description;
  let blockImg = cardElement.querySelector(`.popup__photos`);
  let image = blockImg.querySelector(`img`);
  image.remove();
  for (let i = 0; i < newAd.offer.photos.length; i++) {
    let cloneImg = image.cloneNode(true);
    cloneImg.src = newAd.offer.photos[i];
    blockImg.appendChild(cloneImg);
  }
  cardElement.querySelector(`.popup__avatar`).src = newAd.author.avatar;
  return cardElement;
};

let fragment = document.createDocumentFragment();
for (let i = 0; i < newAds.length; i++) {
  fragment.appendChild(renderMark(newAds[i]));
  fragment.appendChild(renderCard(newAds[i]));
}

markElements.appendChild(fragment);
cardElements.appendChild(fragment);
