'use strict';

(function () {
  let pinsAll = [];
  let typeValue = `any`;
  let housingType = window.main.MAIN.querySelector(`#housing-type`);
  let updateType = function () {
    let types = pinsAll.filter(function (pin) {
        console.log(pinsAll);
      if (typeValue === `any`) {
        return true;
      }
      return pin.offer.type === typeValue;
    });
    window.render(types);
  };

  housingType.addEventListener(`change`, function (evt) {
    typeValue = evt.target.value;
    window.condition.pinRemove();
    updateType();
  });

  let onSuccess = function (data) {
    pinsAll = data;
    window.condition.pinRemove();
    updateType();
  };

  window.filter = {
    updateType,
    onSuccess
  };
})();
