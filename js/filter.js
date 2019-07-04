'use strict';

(function () {


  window.updateHousingType = function () {
    var housingType = document.querySelector('#housing-type');
    housingType.addEventListener('change', function () {

    if (housingType.value !== 'any') {
      var housingTypes = window.dataArray.filter(function(it) {
        return it.offer.type === housingType.value;
        });
      }
    })
  }
}());
