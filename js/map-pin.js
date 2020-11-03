'use strict';

(function () {
  let markElement = document.querySelector(`.map__pins`);
  let MAX_PINS_COUNT = 5;

  window.render = function (pinsElem) {
    let takeNumber = pinsElem.length > MAX_PINS_COUNT
      ? MAX_PINS_COUNT
      : pinsElem.length;
    let fragment = document.createDocumentFragment();
    for (let i = 0; i < takeNumber; i++) {
      fragment.appendChild(window.pinCard.renderMark(pinsElem[i]));
    }
    window.condition.pinsElements = Array.from(pinsElem);
    markElement.appendChild(fragment);
    window.condition.pins = Array.from(window.main.MAIN.querySelectorAll(`.map__pin:not(.map__pin--main)`));
  };
})();
