'use strict';

(function () {

  var housingType = document.querySelector('#housing-type');

  housingType.addEventListener('change', function () {

    if (housingType.value !== 'any') {
      var pins = document.querySelectorAll('.map__pin');
      pins = Array.from(pins);
      var pinsWithoutMain = pins.slice(1);
      window.utils.clearElemArr(pinsWithoutMain);
      var housingTypes = window.dataArray.filter(function (it) {
        return it.offer.type === housingType.value;
      });
    }
    window.createUpdatedArray(housingTypes);
  });
}());
