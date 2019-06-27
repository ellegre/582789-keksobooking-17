'use strict';

(function () {
  var PROPERTY_TYPES = ['palace', 'flat', 'house', 'bungalo'];
  var ADS_NUMBER = 8;

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
          'type': window.data.getPropertyType(PROPERTY_TYPES)
        },

        location: {
          'x': window.data.createRandomNumber(window.data.PIN_X_MIN, window.data.PIN_X_MAX),
          'y': window.data.createRandomNumber(window.data.PIN_Y_MIN, window.data.PIN_Y_MAX)
        }
      };
      properties.push(property);
    }
    return properties;
  };

  var propertyList = getPropertyList(ADS_NUMBER);

  var createMarker = function (marker) {
    var markerElement = markerTemplate.cloneNode(true);
    markerElement.style.left = marker.location.x - window.data.PIN_WIDTH / 2 + 'px';
    markerElement.style.top = marker.location.y - window.data.PIN_HEIGHT + 'px';
    markerElement.querySelector('img').src = marker.author.avatar;
    markerElement.querySelector('img').alt = 'Заголовок объявления';
    return markerElement;
  };


  var markerTemplate = document
    .querySelector('#pin')
    .content
    .querySelector('button');


  for (var j = 0; j < propertyList.length; j++) {
    window.data.fragment.appendChild(createMarker(propertyList[j]));
  }

}());
