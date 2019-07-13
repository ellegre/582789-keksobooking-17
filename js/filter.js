'use strict';

(function () {
  var filters = document.querySelector('.map__filters');
  var housingType = filters.querySelector('#housing-type');
  var housingPrice = filters.querySelector('#housing-price');
  var housingRooms = filters.querySelector('#housing-rooms');
  var housingGuests = filters.querySelector('#housing-guests');

  var LOW_PRICE = 10000;
  var HIGH_PRICE = 50000;

  var onFilterPins = function () {
    var data = window.pin.dataArray;
    var pinsArray = data.slice();
    var pinsFiltered = pinsArray;

    var filterType = function (marker) {
      if (housingType.value !== 'any' && marker.offer.type !== housingType.value) {
        return false;
      }
      return true;
    };

  var filterPrice = function (marker) {
    if (housingPrice.value !== 'any') {
      switch (housingPrice.value) {

        case 'low':
          return marker.offer.price < LOW_PRICE;

        case 'high':
          return (marker.offer.price > HIGH_PRICE);

        case 'middle':
          return (marker.offer.price >= LOW_PRICE && marker.offer.price <= HIGH_PRICE);
      }
    }
    return true;
  };

  var filterRooms = function (marker) {
    if (housingRooms.value !== 'any' && marker.offer.rooms !== parseInt(housingRooms.value, 10)) {
      return false;
    }
    return true;
  };


  var filterGuests = function (marker) {
    if (housingGuests.value !== 'any' && marker.offer.guests !== parseInt(housingGuests.value, 10)) {
      return false;
    }
    return true;
  };

  var filterFeatures = function (marker) {
    var features = filters.querySelectorAll('input[name="features"]:checked');
    var featuresValues = [];

    features.forEach(function (elem) {
      featuresValues.push(elem.value);
    });

    if (featuresValues.length > 0) {
      return featuresValues.every(function (item) {
        return pin.offer.features.indexOf(item) > -1;
      });
    }
    return true;
  };

    pinsFiltered = window.pin.dataArray.filter(function (elem) {
      return filterType(elem) && filterPrice(elem) && filterRooms(elem) && filterGuests(elem) && filterFeatures(elem);
    });

    //window.cardElement.remove();
    window.pin.createUpdatedArray(pinsFiltered);
    console.log(window.pin.createUpdatedArray(pinsFiltered));

  };

  //window.filters = {
   // filteredArray: function () {
      //filters.addEventListener('change', window.debounce(onFilterPins));
    //}
  //};

})();
/*
(function () {

var housingType = document.querySelector('#housing-type');
  var housingPrice = document.querySelector('#housing-price');
  var housingRoom = document.querySelector('#housing-rooms');
  var housingGuest = document.querySelector('#housing-guests');
  var housingFeatures = document.querySelector('#housing-features');


 /*housingType.addEventListener('change', function () {

    if (housingType.value === 'any') {
      window.utils.clearPins();
        return window.pin.createUpdatedArray(window.map.dataArray);
    } else {
      window.utils.clearPins()
      var housingTypes = window.map.dataArray.filter(function (it) {
        return it.offer.type === housingType.value;
      });
    window.pin.createUpdatedArray(housingTypes);
    };
  });
});


housingType.addEventListener('change', function () {
console.log(1);
  window.map.dataArray.forEach(function (item, index, dataArray){
    if (item.offer.type === 'flat') {
      var filteredDataArray = dataArray.push(item.offer.type);
  console.log(filteredDataArray);
    }
  });

});


var wizardNames = wizards.
  filter(function (wizard) {
    return wizard.eyesColor === 'blue';
  }).
  map(function (wizard) {
    return wizard.name;
  });




  housingPrice.addEventListener('change', function () {

    if (housingPrice.value === 'any') {
      window.utils.clearPins();
      return window.createUpdatedArray(window.dataArray);
    } else {
      var housingPrices = window.dataArray.filter(function (it) {
        return it.offer.price === housingPrice.value;
    });
      window.createUpdatedArray(housingPrices);
    }
  });


  housingRoom.addEventListener('change', function () {
    if (housingRoom.value === 'any') {
      window.utils.clearPins();
      return window.createUpdatedArray(window.dataArray);
    } else {
      var housingRooms = window.dataArray.filter(function (it) {
        return it.offer.rooms === housingRoom.value;
      });
    window.createUpdatedArray(housingRooms);
    }
  });

  housingGuest.addEventListener('change', function () {
    if (housingGuest.value === 'any') {
      window.utils.clearPins();
      return window.createUpdatedArray(window.dataArray);
    } else {
      var housingGuests = window.dataArray.filter(function (it) {
        return it.offer.guests === housingGuest.value;
      });
    window.createUpdatedArray(housingGuests);
    }
  });


  var housingFeatures = function () {
    var features = housingFeatures.querySelectorAll('input[name="features"]:checked');
    var featuresChecked = [];
    features.forEach(function (it) {
      featuresChecked.push(it.value);

    });
};

*/
