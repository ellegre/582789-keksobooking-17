'use strict';

(function () {

  window.data = {
    PIN_X_MIN: 0,
    PIN_X_MAX: 1200,
    PIN_Y_MIN: 130,
    PIN_Y_MAX: 630,
    PIN_HEIGHT: 70,
    PIN_WIDTH: 50,

    createRandomNumber: function (min, max) {
      var rand = min + Math.random() * (max + 1 - min);
      rand = Math.floor(rand);
      return rand;
    },

    getPropertyType: function (arr) {
      var arrRandNumber = Math.floor(Math.random() * arr.length);
      return arr[arrRandNumber];
    },

    fragment: document.createDocumentFragment()
  };
}());
