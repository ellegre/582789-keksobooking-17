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
    }
  };
}());
