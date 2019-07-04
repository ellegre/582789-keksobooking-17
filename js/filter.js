'use strict';

(function () {


  window.updateHousingType = function () {
    var housingType = document.querySelector('#housing-type');

    housingType.addEventListener('change', function () {

      if (housingType.value !== 'any') {
        var pins = document.querySelectorAll('.map__pin');
        for (var i = 0; i < pins.length; i++) {
          pins.remove();
        var housingTypes = window.dataArray.filter(function(it) {
          return it.offer.type === housingType.value;
          });
        };
      }
      window.createUpdatedArray(housingTypes)();

    });
  }
}());
