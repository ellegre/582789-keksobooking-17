'use strict';

(function () {

  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

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
        pins.forEach(function (pin) {
          pin.remove();
        });
      }
    },
    openPopup: function (evt, action) {
      if (evt.keyCode === ESC_KEYCODE) {
        action();
      }
    },
    isEscEvent: function (evt, action) {
      if (evt.keyCode === ESC_KEYCODE) {
        action();
      }
    },
    isEnterEvent: function (evt, action, data) {
      if (evt.keyCode === ENTER_KEYCODE) {
        action(data);
      }
    }
  };
}());
