'use strict';

(function () {

  var PIN_HEIGHT = 70;
  var PIN_WIDTH = 50;
  var ADS_NUMBER = 5;
  var mapPins = document.querySelector('.map__pins');

  var createMarker = function (marker) {
    var markerElement = markerTemplate.cloneNode(true);
    markerElement.style.left = marker.location.x - PIN_WIDTH / 2 + 'px';
    markerElement.style.top = marker.location.y - PIN_HEIGHT + 'px';
    markerElement.querySelector('img').src = marker.author.avatar;
    markerElement.querySelector('img').alt = 'Заголовок объявления';

    markerElement.addEventListener('click', function () {
      window.card.open(marker);
      markerElement.classList.add('map__pin--active');

    });

    markerElement.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.data.ENTER_KEYCODE) {
        window.card.open();
        markerElement.classList.add('map__pin--active');
      }
    });

    return markerElement;
  };

  var markerTemplate = document
    .querySelector('#pin')
    .content
    .querySelector('button');

  var createUpdatedArray = function (arr) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < ADS_NUMBER && i < arr.length; i++) {
      if (arr[i].offer) {
        fragment.appendChild(createMarker(arr[i]));
      }
    }
    mapPins.appendChild(fragment);
  };

  window.pin = {
    mainMarker: mapPins,
    createUpdatedArray: createUpdatedArray,
  };
}());
