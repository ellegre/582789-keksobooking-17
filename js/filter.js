'use strict';

(function () {
  var ADS_NUMBER = 5;

  window.updateHousingType = function () {
    var housingType = document.querySelector('#housing-type');
    housingType.addEventListener('change', function () {

      var housingTypes = window.dataArray.filter(function(it) {
        return it.offer.type === housingType.value;
      });


      var fragment = document.createDocumentFragment();
      for (var i = 0; i < ADS_NUMBER; i++) {
        fragment.appendChild(window.createMarker(housingTypes[i]));
      }
      window.mapPins.appendChild(fragment);





    });
  }
}());

