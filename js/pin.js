'use strict';

(function () {
  var ADS_NUMBER = 8;
  var PIN_HEIGHT = 70;
  var PIN_WIDTH = 50;


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

  var mapFilter = document.querySelector('.map__filters');
  var adForm = document.querySelector('.ad-form');
  var adFormHeader = document.querySelector('.ad-form-header');

  form.addEventListener('submit', function (evt) {
    window.upload(new FormData(form), function (response) {
      notice.classList.add('hidden');
    });
    evt.preventDefault();
  });




}());
