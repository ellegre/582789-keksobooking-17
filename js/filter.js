'use strict';

(function () {

  var housingType = document.querySelector('#housing-type');

  housingType.addEventListener('change', function () {

    if (housingType.value !== 'any') {

      window.utils.clearPins();
      var housingTypes = window.dataArray.filter(function (it) {
        return it.offer.type === housingType.value;
      });
    }
    window.createUpdatedArray(housingTypes);
  });
}());
