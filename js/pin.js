'use strict';

(function () {

  var PIN_HEIGHT = 70;
  var PIN_WIDTH = 50;
  var ADS_NUMBER = 5;

  var mapPins = document.querySelector('.map__pins');

  window.createMarker = function (marker) {
    var markerElement = markerTemplate.cloneNode(true);
    markerElement.style.left = marker.location.x - PIN_WIDTH / 2 + 'px';
    markerElement.style.top = marker.location.y - PIN_HEIGHT + 'px';
    markerElement.querySelector('img').src = marker.author.avatar;
    markerElement.querySelector('img').alt = 'Заголовок объявления';
    return markerElement;
  };

  var markerTemplate = document
    .querySelector('#pin')
    .content
    .querySelector('button');


  var notice = document.querySelector('.notice');
  var form = notice.querySelector('.ad-form');

  form.addEventListener('submit', function (evt) {
    window.load(new FormData(form), function () {
      notice.classList.add('hidden');
    });
    evt.preventDefault();
  });
}());
