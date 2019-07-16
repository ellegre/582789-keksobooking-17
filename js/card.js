'use strict';
(function () {

  var CARD_PHOTO_HEIGHT = 40;
  var CARD_PHOTO_WIDTH = 45;
  var cardTemplate = document.querySelector('#card').content.querySelector('article');

  // Function for creating DOM-element

  var createCard = function (card) {

    // Function for creating the list of features

    var createFeaturesList = function (featuresList) {
      var list = cardElement.querySelector('.popup__features');
      list.innerHTML = '';
      featuresList.forEach(function (feature) {
        var listItem = document.createElement('li');
        listItem.classList.add('feature', 'feature--' + feature);
        list.appendChild(listItem);
      });
    };

    // Function for creating the list of photos

    var createPhotosList = function (photosList) {
      var list = cardElement.querySelector('.popup__photos');
      list.innerHTML = '';
      photosList.forEach(function (photo) {
        var listItem = document.createElement('img');
        listItem.classList.add('.popup__photo');
        listItem.width = CARD_PHOTO_WIDTH;
        listItem.height = CARD_PHOTO_HEIGHT;
        listItem.src = photosList[photo];
        listItem.alt = 'Фотография жилья';
        list.appendChild(listItem);
      });
    };
    var cardElement = cardTemplate.cloneNode(true);
    cardElement.querySelector('.popup__title').textContent = card.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = card.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = card.offer.price + '₽';
    cardElement.querySelector('.popup__type').textContent = window.data.AccomodationType[card.offer.type].name;
    cardElement.querySelector('.popup__text--capacity').textContent = card.offer.rooms +
    ' комнаты для ' + card.offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin
    + ', выезд до ' + card.offer.checkout;
    createFeaturesList(card.offer.features);
    cardElement.querySelector('.popup__description').textContent = card.offer.description;

    createPhotosList(card.offer.photos);
    cardElement.querySelector('.popup__avatar').src = card.author.avatar;


    var popupClose = cardElement.querySelector('.popup__close');
    popupClose.addEventListener('click', closeCard);
    popupClose.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.data.ESC_KEYCODE) {
        closeCard();
      }
    });
    document.addEventListener('keydown', cardEscPressHandler);
    return cardElement;
  };


  // Function for closing the card

  var closeCard = function () {
    var cardPopup = document.querySelector('.map__card');
    if (!cardPopup) {
      return;
    }
    cardPopup.remove();
    document.removeEventListener('keydown', cardEscPressHandler);
  };


  // Function for opening the card

  var openCard = function (card) {
    var mapCard = window.map.map.querySelector('.map__card');
    if (mapCard) {
      closeCard();
    }
    var fragment = document.createDocumentFragment();
    fragment.appendChild(createCard(card));
    window.map.map.insertBefore(fragment, window.map.map.children[1]);
  };

  // Handler for Esc

  var cardEscPressHandler = function (evt) {
    if (evt.keyCode === window.data.ESC_KEYCODE) {
      closeCard();
    }
  };

  window.card = {
    openCard: openCard,
    closeCard: closeCard
  };

}());
