'use strict';

(() => {
  let markElement = document.querySelector(`.map__pins`);
  window.render = (pinsElem) => {
    let fragment = document.createDocumentFragment();
    for (let pin of pinsElem.slice(0, 5)) {
      fragment.appendChild(window.pinCard.renderMark(pin));
    }
    window.condition.pinsElements = Array.from(pinsElem);
    markElement.appendChild(fragment);
    window.condition.pins = Array.from(window.main.CONTEINER.querySelectorAll(`.map__pin:not(.map__pin--main)`));
  };
})();
