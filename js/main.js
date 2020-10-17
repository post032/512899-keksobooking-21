'use strict';

const CHECKOUT_ARR = [`12:00`, `13:00`, `14:00`];
const CHECKIN_ARR = [`12:00`, `13:00`, `14:00`];
const FEATURES_ARR = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
const TYPE_ARR = [`palace`, `flat`, `house`, `bungalow`];
const PHOTOS_ARR = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];
const MIN_NAME_LENGTH = 30;
const MAX_NAME_LENGTH = 100;
const MAX_PRICE = 1000000;
const MAIN = document.querySelector(`main`);

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
for (let i = 0; i < newAds.length; i++) {
  fragment.appendChild(renderMark(newAds[i]));
}

let adForm = MAIN.querySelector(`.ad-form`);
let map = MAIN.querySelector(`.map`);

let fieldsetElements = MAIN.querySelectorAll(`fieldset`);

for (let fieldsetElement of fieldsetElements) {
  fieldsetElement.setAttribute(`disabled`, true);
}

let openPinPage = document.querySelector(`.map__pin--main`);
let openPage = function () {
  map.classList.remove(`map--faded`);
  adForm.classList.remove(`ad-form--disabled`);
  for (let fieldsetElement of fieldsetElements) {
    fieldsetElement.removeAttribute(`disabled`);
  }
};

openPinPage.addEventListener(`mousedown`, function (e) {
  if (e.button === 0) {
    openPage();
    markElement.appendChild(fragment);
  }
});

openPinPage.addEventListener(`keydown`, function (evt) {
  if (evt.key === `Enter`) {
    evt.preventDefault();
    openPage();
    markElement.appendChild(fragment);
  }
});

let mapPins = MAIN.querySelector(`.map__pins`);
let onMapPin = function (evt) {
  let pin = evt.target.closest(`.map__pin:not(.map__pin--main)`);

  if (!pin) {
    return;
  } else {
    let pins = Array.from(MAIN.querySelectorAll(`.map__pin:not(.map__pin--main)`));
    let item = pins.indexOf(evt.target.closest(`.map__pin`));
    map.appendChild(renderCard(newAds[item]));
  }
};
mapPins.addEventListener(`click`, onMapPin);

let locationStart = {
  x: openPinPage.style.left = 570 - 32,
  y: openPinPage.style.top = 375 - 65,
};

let address = document.querySelector(`#address`);
address.setAttribute(`disabled`, true);
address.value = `${locationStart.x}, ${locationStart.y}`;

let titleAdd = MAIN.querySelector(`#title`);

titleAdd.addEventListener(`input`, function () {
  let valueLength = titleAdd.value.length;
  if (valueLength < MIN_NAME_LENGTH) {
    titleAdd.setCustomValidity(`Ещё ${MIN_NAME_LENGTH - valueLength} симв.`);
  } else if (valueLength > MAX_NAME_LENGTH) {
    titleAdd.setCustomValidity(`Удалите лишние ${valueLength - MAX_NAME_LENGTH} симв.`);
  } else {
    titleAdd.setCustomValidity(``);
  }

  titleAdd.reportValidity();
});

let price = MAIN.querySelector(`#price`);

price.addEventListener(`input`, function (e) {
  e.preventDefault();
  if (price.value > MAX_PRICE) {
    price.setCustomValidity(`Цена не может превышать сумму ${MAX_PRICE} рублей/ночь.`);
  } else {
    price.setCustomValidity(``);
  }
  price.reportValidity();
});


let roomNumber = MAIN.querySelector(`#room_number`);
let capacity = MAIN.querySelector(`#capacity`);

let getValidationRooms = function () {
  let valueRooms = roomNumber.value;
  let valueCapacity = capacity.value;
  if (valueRooms === `100` && valueCapacity !== `0`) {
    roomNumber.setCustomValidity(`Дворец не для гостей`);
    capacity.setCustomValidity(`Дворец не для гостей`);
  } else if (valueRooms === `100` && valueCapacity === `0`) {
    roomNumber.setCustomValidity(``);
    capacity.setCustomValidity(``);
  } else if (valueRooms < valueCapacity && valueRooms !== `100`) {
    roomNumber.setCustomValidity(`Количество гостей не может превышать ${valueRooms}`);
    capacity.setCustomValidity(`Количество гостей не может превышать ${valueRooms}`);
  } else if (valueRooms >= valueCapacity && valueRooms !== `100` && valueCapacity === `0`) {
    roomNumber.setCustomValidity(`Выберите количество гостей`);
    capacity.setCustomValidity(`Выберите количество гостей`);
  } else if (valueRooms >= valueCapacity && valueRooms !== `100`) {
    roomNumber.setCustomValidity(``);
    capacity.setCustomValidity(``);
  }
};

roomNumber.addEventListener(`change`, function () {
  getValidationRooms();
  roomNumber.reportValidity();
});

capacity.addEventListener(`change`, function () {
  getValidationRooms();
  capacity.reportValidity();
});

let timeIn = MAIN.querySelector(`#timein`);
let timeOut = MAIN.querySelector(`#timeout`);

timeIn.addEventListener(`change`, function () {
  timeOut.value = timeIn.value;
});
timeOut.addEventListener(`change`, function () {
  timeIn.value = timeOut.value;
});

let roomType = MAIN.querySelector(`#type`);

let getMinValuePrice = function () {
  if (roomType.value === `bungalow`) {
    price.value = 0;
  }
  if (roomType.value === `flat`) {
    price.value = 1000;
  }
  if (roomType.value === `house`) {
    price.value = 5000;
  }
  if (roomType.value === `palace`) {
    price.value = 10000;
  }
};

roomType.addEventListener(`input`, function () {
  getMinValuePrice();
});
