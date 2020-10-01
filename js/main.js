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
      address: locationPoint,
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
let markElements = document.querySelector(`.map__pins`);

let renderMark = function (newAd) {
  let markElement = markElementTemplate.cloneNode(true);
  markElement.style.left = newAd.location.x + 25 + `px`;
  markElement.style.top = newAd.location.y + 70 + `px`;
  let avatarImg = markElement.querySelector(`img`);
  avatarImg.src = newAd.author.avatar;
  avatarImg.alt = `фото пользователя`;
  return markElement;
};

let fragment = document.createDocumentFragment();
for (let i = 0; i < newAds.length; i++) {
  fragment.appendChild(renderMark(newAds[i]));
}

markElements.appendChild(fragment);
