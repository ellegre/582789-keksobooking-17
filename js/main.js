'use strict';

var PROPERTY_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var ADS_NUMBER = 8;
var PIN_X_MIN = 100;
var PIN_X_MAX = 1100;
var PIN_Y_MIN = 130;
var PIN_Y_MAX = 630;
var PIN_HEIGHT = 84;
var PIN_WIDTH = 72;

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

var map = document.querySelector('.map');
map.classList.remove('map--faded');


var createMarker = function (marker) {
  var markerElement = markerTemplate.cloneNode(true);
  markerElement.style.left = marker.location.x - PIN_HEIGHT + 'px';
  markerElement.style.top = marker.location.y - PIN_WIDTH / 2 + 'px';
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

mapPins.appendChild(fragment);
