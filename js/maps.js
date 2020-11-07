'use strict';

(function () {
  let adForm = window.main.MAIN.querySelector(`.ad-form`);
  let map = window.main.MAIN.querySelector(`.map`);

  let fieldsetElements = window.main.MAIN.querySelectorAll(`fieldset`);

  for (let fieldsetElement of fieldsetElements) {
    fieldsetElement.setAttribute(`disabled`, true);
  }

  let openPinPage = document.querySelector(`.map__pin--main`);
  let active = false;
  let openPage = function () {
    active = true;
    map.classList.remove(`map--faded`);
    adForm.classList.remove(`ad-form--disabled`);
    for (let fieldsetElement of fieldsetElements) {
      fieldsetElement.removeAttribute(`disabled`);
    }
    window.backend.load(window.filter.onSuccess, window.condition.onError);
  };

  openPinPage.addEventListener(`mousedown`, function (e) {
    if (active === false && e.button === 0) {
      openPage();
    }
  });

  openPinPage.addEventListener(`keydown`, function (evt) {
    if (active === false && evt.key === `Enter`) {
      evt.preventDefault();
      openPage();
    }
  });
  window.maps = {
    openPage,
    openPinPage,
    map,
    adForm,
    fieldsetElements,
    active
  };
})();
