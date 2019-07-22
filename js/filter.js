'use strict';

(function () {
  var filters = document.querySelector('.map__filters');
  var housingType = filters.querySelector('#housing-type');
  var housingPrice = filters.querySelector('#housing-price');
  var housingRooms = filters.querySelector('#housing-rooms');
  var housingGuests = filters.querySelector('#housing-guests');

  var LOW_PRICE = 10000;
  var HIGH_PRICE = 50000;

  var filterType = function (marker) {
    return (housingType.value === 'any' || marker.offer.type === housingType.value);
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
    return (housingRooms.value === 'any' || marker.offer.rooms === parseInt(housingRooms.value, 10));
  };

  var filterGuests = function (marker) {
    return (housingGuests.value === 'any' || marker.offer.guests === parseInt(housingGuests.value, 10));
  };

  var filterFeatures = function (marker) {
    var features = filters.querySelectorAll('input[name="features"]:checked');
    var featuresValues = [];

    features.forEach(function (elem) {
      featuresValues.push(elem.value);
    });

    if (featuresValues.length > 0) {
      return featuresValues.every(function (item) {
        return marker.offer.features.indexOf(item) > -1;
      });
    }
    return true;
  };

  var createFilteredMarkers = function () {
    var myData = window.data.array;
    var pinsArray = myData.slice();
    var updateMarkers = pinsArray.filter(function (elem) {
      return filterType(elem) && filterPrice(elem) && filterRooms(elem) && filterGuests(elem) && filterFeatures(elem);
    });
    window.utils.clearPins();
    window.card.close();
    window.pin.createUpdatedArray(updateMarkers);
  };

  filters.addEventListener('change', window.debounce(createFilteredMarkers));

}());
