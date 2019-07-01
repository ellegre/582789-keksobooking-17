'use strict';

(function () {
  var PROPERTY_TYPES = ['palace', 'flat', 'house', 'bungalo'];
  var ADS_NUMBER = 8;
  var PIN_HEIGHT = 70;
  var PIN_WIDTH = 50;

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
          'type': window.utils.getPropertyType(PROPERTY_TYPES)
        },

        location: {
          'x': window.utils.createRandomNumber(window.data.PIN_X_MIN, window.data.PIN_X_MAX),
          'y': window.utils.createRandomNumber(window.data.PIN_Y_MIN, window.data.PIN_Y_MAX)
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

  var markerTemplate = document
    .querySelector('#pin')
    .content
    .querySelector('button');

  window.insert = function () {
    var fragment = document.createDocumentFragment();
    for (var j = 0; j < propertyList.length; j++) {
      fragment.appendChild(createMarker(propertyList[j]));
    }
    return fragment;
  };

 window.load(function (markers) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < propertyList.length; i++) {
      fragment.appendChild(createMarker(propertyList[j]));
    }
    similarListElement.appendChild(fragment);

    userDialog.querySelector('.setup-similar').classList.remove('hidden');
  });

  var form = document.querySelector('.ad-form');
  form.addEventListener('submit', function (evt) {
    window.upload(new FormData(form), function (response) {
      form.classList.add('hidden');
    });
    evt.preventDefault();
  });


/*
    var successHandler = function (wizards) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < 4; i++) {
      fragment.appendChild(renderWizard(wizards[i]));
    }
    similarListElement.appendChild(fragment);

    userDialog.querySelector('.setup-similar').classList.remove('hidden');
  };

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.load(successHandler, errorHandler);
  */

}());
