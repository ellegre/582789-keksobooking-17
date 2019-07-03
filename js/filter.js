'use strict';

(function () {


  window.updateHousingType = function () {
    var housingType = document.querySelector('#housing-type');
    housingType.addEventListener('change', function () {

      var housingTypes = window.dataArray.filter(function(it) {
        return it.offer.type === housingType.value;
      });
      console.log(housingTypes);
      console.log(housingType.value);
     window.createUpdatedArray(housingTypes)();

  })
}

}());

