'use strict';

window.maps.openPinPage.addEventListener(`mousedown`, (evt) => {
  evt.preventDefault();

  let startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };

  let dragged = false;

  let onMouseMove = (moveEvt) => {
    moveEvt.preventDefault();

    dragged = true;

    let shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };

    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    let locationAddress = {
      x: window.maps.openPinPage.offsetLeft - shift.x + window.main.WIDTH_SIZE_PIN,
      y: window.maps.openPinPage.offsetTop - shift.y + window.main.HEIGHT_SIZE_PIN
    };
    window.form.address.value = `${locationAddress.x}, ${locationAddress.y}`;

    if (locationAddress.y < 630 && locationAddress.y > 129) {
      window.maps.openPinPage.style.top = (window.maps.openPinPage.offsetTop - shift.y) + `px`;
    }
    if (locationAddress.x < document.querySelector(`.map__overlay`).clientWidth && locationAddress.x > 0) {
      window.maps.openPinPage.style.left = (window.maps.openPinPage.offsetLeft - shift.x) + `px`;
    }
    if (locationAddress.x < 0) {
      window.maps.openPinPage.style.left = 0;
    }
  };

  let onMouseUp = (upEvt) => {
    upEvt.preventDefault();

    document.removeEventListener(`mousemove`, onMouseMove);
    document.removeEventListener(`mouseup`, onMouseUp);

    if (dragged) {
      let onClickPreventDefault = (clickEvt) => {
        clickEvt.preventDefault();
        window.maps.openPinPage.removeEventListener(`click`, onClickPreventDefault);
      };
      window.maps.openPinPage.addEventListener(`click`, onClickPreventDefault);
    }
  };

  document.addEventListener(`mousemove`, onMouseMove);
  document.addEventListener(`mouseup`, onMouseUp);
});
