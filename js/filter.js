'use strict';

(function () {

  var housingType = document.querySelector('#housing-type');
  var housingTypes = [];
  housingType.addEventListener('change', function () {

    housingTypes = window.dataArray.filter(function(it) {
      return it.offer.type === housingType.value;

    });

  });
  console.log(housingType.value);
}());

