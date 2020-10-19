'use strict';

(function () {
  let newAds = [];
  for (let i = 0; i < 8; i++) {
    let locationPoint = {
      x: window.utils.getRandomInt(0, 1200),
      y: window.utils.getRandomInt(130, 630)
    };
    let newObjectAd = {
      author: {
        avatar: `img/avatars/user0${i + 1}.png`,
      },
      offer: {
        title: `Заголовок${i + 1}`,
        address: `${locationPoint.x}, ${locationPoint.y}`,
        price: window.utils.getRandomInt(100, 6000),
        type: window.utils.getRandomElement(window.main.TYPE_ARR),
        rooms: window.utils.getRandomInt(1, 4),
        guests: window.utils.getRandomInt(1, 6),
        checkin: window.utils.getRandomElement(window.main.CHECKIN_ARR),
        checkout: window.utils.getRandomElement(window.main.CHECKOUT_ARR),
        features: window.utils.getRandomArray(window.main.FEATURES_ARR),
        description: `Здесь будет ваше описание`,
        photos: window.utils.getRandomArray(window.main.PHOTOS_ARR),
      },
      location: locationPoint,
    };
    newAds.push(newObjectAd);
  }
  window.data = {
    newAds
  };
})();
