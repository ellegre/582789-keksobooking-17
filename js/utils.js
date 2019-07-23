'use strict';

(function () {

  window.utils = {
    clearPins: function () {
      var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
      pins = Array.from(pins);
      if (pins.length !== 0) {
        pins.forEach(function (pin) {
          pin.remove();
        });
      }
    }
  };

}());
