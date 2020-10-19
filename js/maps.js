'use strict';

(function () {
  let adForm = window.main.MAIN.querySelector(`.ad-form`);
  let map = window.main.MAIN.querySelector(`.map`);

  let fieldsetElements = window.main.MAIN.querySelectorAll(`fieldset`);

  for (let fieldsetElement of fieldsetElements) {
    fieldsetElement.setAttribute(`disabled`, true);
  }
  let pins = [];
  let openPinPage = document.querySelector(`.map__pin--main`);
  let openPage = function () {
    map.classList.remove(`map--faded`);
    adForm.classList.remove(`ad-form--disabled`);
    for (let fieldsetElement of fieldsetElements) {
      fieldsetElement.removeAttribute(`disabled`);
    }
    window.pinCard.markElement.appendChild(window.pinCard.fragment);
    window.maps.pins = Array.from(window.main.MAIN.querySelectorAll(`.map__pin:not(.map__pin--main)`));
  };

  openPinPage.addEventListener(`click`, function (e) {
    if (e.button === 0) {
      openPage();
    }
  });

  openPinPage.addEventListener(`keydown`, function (evt) {
    if (evt.key === `Enter`) {
      evt.preventDefault();
      openPage();
    }
  });
  window.maps = {
    pins,
    openPinPage,
    map
  };
})();
