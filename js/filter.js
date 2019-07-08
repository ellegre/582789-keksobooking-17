'use strict';

(function () {

  var housingType = document.querySelector('#housing-type');
  var housingPrice = document.querySelector('#housing-price');
  var housingRoom = document.querySelector('#housing-rooms');

  housingType.addEventListener('change', function () {

    if (housingType.value == 'any') {
      window.utils.clearPins();
        return window.createUpdatedArray(window.dataArray);
    } else {
      window.utils.clearPins()
      var housingTypes = window.dataArray.filter(function (it) {
        return it.offer.type === housingType.value;
      });
    window.createUpdatedArray(housingTypes);
    };
  });


  housingPrice.addEventListener('change', function () {

    if (housingPrice.value == 'any') {
      window.utils.clearPins();
      return window.createUpdatedArray(window.dataArray);
    } else {
      var housingPrices = window.dataArray.filter(function (it) {
        return it.offer.price === housingPrice.value;
    });

      window.createUpdatedArray(housingPrices);
    }

  });


  housingRoom.addEventListener('change', function () {
    if (housingRoom.value == 'any') {
      window.utils.clearPins();
      return window.createUpdatedArray(window.dataArray);
    } else {
      var housingRooms = window.dataArray.filter(function (it) {
        return it.offer.rooms === housingRoom.value;
      });
    window.createUpdatedArray(housingRooms);
    }
  });


}());
