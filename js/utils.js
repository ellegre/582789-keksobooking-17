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

    clearElemArr: function (arr) {

      for (var i = 0; i < arr.length; i++) {
        if (arr.length !== 0) {
          arr[i].remove();
        }
      }
    }
  };

}());
