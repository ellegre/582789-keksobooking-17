'use strict';

(function () {

  window.utils = {

    createRandomNumber: function (min, max) {
      var rand = min + Math.random() * (max + 1 - min);
      rand = Math.floor(rand);
      return rand;
    },

    getPropertyType: function (arr) {
      var arrRandNumber = Math.floor(Math.random() * arr.length);
      return arr[arrRandNumber];
    },

    clearPins: function () {
      var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
      pins = Array.from(pins);
      if (pins.length !== 0) {
        for (var i = 0; i < pins.length; i++) {
          pins[i].remove();
        }
      }
    }
  };

}());
