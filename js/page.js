'use strict';

(function () {

  var OFFSET_HEIGHT = 65;
  var OFFSET_WIDTH = 65;
  var TIP_HEIGHT = 20;
  var URL = 'https://js.dump.academy/keksobooking/data';
  var map = document.querySelector('.map');
  var mapFilter = document.querySelector('.map__filters');
  var adForm = document.querySelector('.ad-form');
  var adFormHeader = document.querySelector('.ad-form-header');
  var address = document.querySelector('#address');
  var mapPinMain = document.querySelector('.map__pin--main');
  var mapPinMainX = mapPinMain.offsetLeft;
  var mapPinMainY = mapPinMain.offsetTop;

  mapFilter.classList.add('map__filters--disabled');
  adFormHeader.classList.add('ad-form-header--disabled');

  var formElements = document.querySelectorAll('.ad-form__element');

  formElements.forEach(function (formElement) {
    formElement.disabled = true;
  });

  var mapFilters = document.querySelectorAll('.map__filter');
  mapFilters.forEach(function (it) {
    it.disabled = true;
  });

  var topPos = mapPinMain.offsetTop + OFFSET_HEIGHT / 2;
  var leftPos = mapPinMain.offsetLeft + OFFSET_WIDTH / 2;
  address.value = Math.floor(leftPos) + ', ' + Math.floor(topPos);

  var activateMap = function () {
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    mapFilter.classList.remove('map__filters--disabled');
    adFormHeader.classList.remove('ad-form-header--disabled');
    formElements.forEach(function (formElement) {
      formElement.disabled = false;
    });
    mapFilters.forEach(function (it) {
      it.disabled = false;
    });

    var onSuccess = function (objects) {
      window.data.array = objects;
      window.pin.createUpdatedArray(objects);
    };

    var onError = function () {
      var errorTemplate = document
        .querySelector('#error')
        .content
        .querySelector('div');

      var errorElement = errorTemplate.cloneNode(true);
      document.body.insertAdjacentElement('afterbegin', errorElement);
    };
    window.upload.load(onSuccess, onError, 'GET', URL);
  };

  var inactivateMap = function () {
    map.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');
    mapFilter.classList.add('map__filters--disabled');
    adFormHeader.classList.add('ad-form-header--disabled');
    formElements.forEach(function (formElement) {
      formElement.disabled = true;
    });
    mapFilters.forEach(function (it) {
      it.disabled = true;
    });
  };

  var movePinToInitial = function () {
    mapPinMain.style.top = mapPinMainY + 'px';
    mapPinMain.style.left = mapPinMainX + 'px';
    calculateStartCoords(mapPinMain);
  };

  var calculateCoords = function (elem) {
    topPos = elem.offsetTop + elem.offsetHeight + TIP_HEIGHT;
    leftPos = elem.offsetLeft + elem.offsetWidth / 2;
    var currentCoords = Math.floor(leftPos) + ', ' + Math.floor(topPos);
    return currentCoords;
  };

  var calculateStartCoords = function (elem) {
    topPos = elem.offsetTop + elem.offsetHeight / 2;
    leftPos = elem.offsetLeft + elem.offsetWidth / 2;
    var currentCoords = Math.floor(leftPos) + ', ' + Math.floor(topPos);
    address.value = currentCoords;
  };

  mapPinMain.addEventListener('keydown', function () {
    if (window.data.array.length === 0) {
      activateMap();
    }
  });

  mapPinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      mapPinMain.style.top = (mapPinMain.offsetTop - shift.y) + 'px';
      mapPinMain.style.left = (mapPinMain.offsetLeft - shift.x) + 'px';

      if (mapPinMain.offsetTop + OFFSET_HEIGHT + TIP_HEIGHT < window.data.PIN_Y_MIN) {
        mapPinMain.style.top = window.data.PIN_Y_MIN - OFFSET_HEIGHT - TIP_HEIGHT + 'px';
      }

      if (mapPinMain.offsetTop + OFFSET_HEIGHT + TIP_HEIGHT > window.data.PIN_Y_MAX) {
        mapPinMain.style.top = window.data.PIN_Y_MAX - OFFSET_HEIGHT - TIP_HEIGHT + 'px';
      }

      if (mapPinMain.offsetLeft < window.data.PIN_X_MIN) {
        mapPinMain.style.left = window.data.PIN_X_MIN + 'px';
      }

      if (mapPinMain.offsetLeft + OFFSET_WIDTH > window.data.PIN_X_MAX) {
        mapPinMain.style.left = window.data.PIN_X_MAX - OFFSET_WIDTH + 'px';
      }

      address.value = calculateCoords(mapPinMain);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      if (window.data.array.length === 0) {
        activateMap();
      }
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  window.page = {
    map: map,
    activateMap: activateMap,
    mapPinMain: mapPinMain,
    mapFilter: mapFilter,
    inactivateMap: inactivateMap,
    movePinToInitial: movePinToInitial
  };

}());
