'use strict';

(function () {

  var housingType = document.querySelector('#housing-type');
  housingType.addEventListener('change', function () {

    var housingTypes = window.dataArray.filter(function(it) {
      return it.offer.type === housingType.value;

    });

  });
  console.log(housingType.value);
}());

