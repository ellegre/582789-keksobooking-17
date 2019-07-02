'use strict';

(function () {
  var ADS_NUMBER = 8;
  var PIN_HEIGHT = 70;
  var PIN_WIDTH = 50;

  var createMarker = function (marker) {
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
    window.upload(new FormData(form), function (response) {
      notice.classList.add('hidden');
    });
    evt.preventDefault();
  });

  window.activateMap = function () {
      map.classList.remove('map--faded');
      adForm.classList.remove('ad-form--disabled');
      mapFilter.classList.remove('map__filters--disabled');
      adFormHeader.classList.remove('ad-form-header--disabled');
      for (var i = 0; i < formElements.length; i++) {
        var item = formElements[i];
        item.disabled = false;
      }
      for (j = 0; j < mapFilters.length; j++) {
        var item2 = mapFilters[j];
        item2.disabled = false;
      }

      var successHandler = function (objects) {
      var fragment = document.createDocumentFragment();

      for (var i = 0; i < 5; i++) {
        fragment.appendChild(createMarker(objects[j]));
      }
      mapPins.appendChild(fragment);
      };

      var errorHandler = function (errorMessage) {
        var markerTemplate = document
          .querySelector('#error')
          .content
          .querySelector('div');
       document.body.insertAdjacentElement('afterbegin', markerTemplate);
     };
    };

    window.load(successHandler, errorHandler,'GET', UPL, data);

}());
