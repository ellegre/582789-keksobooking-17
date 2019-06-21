'use strict';

var PROPERTY_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var ADS_NUMBER = 8;
var PIN_X_MIN = 0;
var PIN_X_MAX = 1200;
var PIN_Y_MIN = 130;
var PIN_Y_MAX = 630;
var PIN_HEIGHT = 70;
var PIN_WIDTH = 50;
var OFFSET_HEIGHT = 65;
var OFFSET_WIDTH = 65;
var TIP_HEIGHT = 22;

var createRandomNumber = function (min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  rand = Math.floor(rand);
  return rand;
};

var getPropertyType = function (arr) {
  var arrRandNumber = Math.floor(Math.random() * arr.length);
  return arr[arrRandNumber];
};

var createAvatars = function () {
  var avatars = [];
  for (var i = 1; i < ADS_NUMBER + 1; i++) {
    if (i < 10) {
      i = '0' + i;
    }
    var avatar = 'img/avatars/user' + i + '.png';
    avatars.push(avatar);
  }
  return avatars;
};

var avatarsList = createAvatars();

var getPropertyList = function (number) {
  var properties = [];
  for (var i = 0; i < number; i++) {
    var property = {
      author: {
        'avatar': avatarsList[i]
      },
      offer: {
        'type': getPropertyType(PROPERTY_TYPES)
      },

      location: {
        'x': createRandomNumber(PIN_X_MIN, PIN_X_MAX),
        'y': createRandomNumber(PIN_Y_MIN, PIN_Y_MAX)
      }
    };
    properties.push(property);
  }
  return properties;
};

var propertyList = getPropertyList(ADS_NUMBER);

var createMarker = function (marker) {
  var markerElement = markerTemplate.cloneNode(true);
  markerElement.style.left = marker.location.x - PIN_WIDTH / 2 + 'px';
  markerElement.style.top = marker.location.y - PIN_HEIGHT + 'px';
  markerElement.querySelector('img').src = marker.author.avatar;
  markerElement.querySelector('img').alt = 'Заголовок объявления';
  return markerElement;
};

var mapPins = document.querySelector('.map__pins');
var markerTemplate = document
  .querySelector('#pin')
  .content
  .querySelector('button');


var fragment = document.createDocumentFragment();

for (var j = 0; j < propertyList.length; j++) {
  fragment.appendChild(createMarker(propertyList[j]));
}

// Активация карты

var map = document.querySelector('.map');
var mapFilter = document.querySelector('.map__filters');
var adForm = document.querySelector('.ad-form');
var adFormHeader = document.querySelector('.ad-form-header');
var address = document.querySelector('#address');
var mapPinMain = document.querySelector('.map__pin--main');

var activateMap = function () {
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
  address.value = leftPos + ', ' + (topPos + OFFSET_HEIGHT / 2 + TIP_HEIGHT);
  mapPins.appendChild(fragment);
};

mapFilter.classList.add('map__filters--disabled');
adFormHeader.classList.add('ad-form-header--disabled');

var formElements = document.querySelectorAll('.ad-form__element');
for (var i = 0; i < formElements.length; i++) {
  var item = formElements[i];
  item.disabled = true;
}

var mapFilters = document.querySelectorAll('.map__filter');
for (j = 0; j < mapFilters.length; j++) {
  var item2 = mapFilters[j];
  item2.disabled = true;
}

var topPos = mapPinMain.offsetTop + OFFSET_HEIGHT / 2;
var leftPos = mapPinMain.offsetLeft + OFFSET_WIDTH / 2;

address.value = leftPos + ', ' + topPos;

mapPinMain.addEventListener('mouseup', function () {
  activateMap();
});

// Валидация формы

address.readonly = true;
var title = document.querySelector('#title');
title.setAttribute('minlength', '30');
title.setAttribute('maxlength', '100');
title.required = true;

var price = document.querySelector('#price');
price.required = true;
price.max = 1000000;

adForm.action = 'https://js.dump.academy/keksobooking';
adForm.method = 'POST';


var propertySelect = {
  'bungalo': 0,
  'flat': 1000,
  'house': 5000,
  'palace': 10000
};

var type = document.querySelector('#type');
type.addEventListener('change', function () {
  price.min = propertySelect[type.value];
  price.placeholder = propertySelect[type.value];
});

var boundSelects = function () {
  var checkIn = document.querySelector('#timein');
  var checkOut = document.querySelector('#timeout');
  checkIn.addEventListener('change', function () {
    checkOut.value = checkIn.value;
  });
  checkOut.addEventListener('change', function () {
    checkIn.value = checkOut.value;
  });
};
boundSelects();

