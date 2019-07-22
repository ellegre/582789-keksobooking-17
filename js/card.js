'use strict';
(function () {

  var CARD_PHOTO_HEIGHT = 40;
  var CARD_PHOTO_WIDTH = 45;
  var cardTemplate = document.querySelector('#card').content.querySelector('article');

  // Function for creating the list of features

  var createFeaturesList = function (cardElement, featuresList) {
    var list = cardElement.querySelector('.popup__features');
    list.innerHTML = '';
    featuresList.forEach(function (feature) {
      var listItem = document.createElement('li');
      listItem.classList.add('popup__feature', 'popup__feature--' + feature);
      list.appendChild(listItem);
    });
  };

  // Function for creating the list of photos

  var createPhotosList = function (cardElement, photosList) {
    var list = cardElement.querySelector('.popup__photos');
    list.innerHTML = '';
    photosList.forEach(function (photo) {
      var listItem = document.createElement('img');
      listItem.classList.add('popup__photo');
      listItem.width = CARD_PHOTO_WIDTH;
      listItem.height = CARD_PHOTO_HEIGHT;
      listItem.src = photo;
      listItem.alt = 'Фотография жилья';
      list.appendChild(listItem);
    });
  };

  // Function for creating DOM-element

  var createCard = function (card) {
    var cardElement = cardTemplate.cloneNode(true);
    cardElement.querySelector('.popup__title').textContent = card.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = card.offer.address;
    if (card.offer.price) {
      var price = cardElement.querySelector('.popup__text--price');
      var span = document.createElement('span');
      span.textContent = '/ночь';
      price.textContent = card.offer.price + ' ₽';
      price.appendChild(span);
    }
    cardElement.querySelector('.popup__type').textContent = window.data.AccomodationType[(card.offer.type).toUpperCase()].name;
    cardElement.querySelector('.popup__text--capacity').textContent = card.offer.rooms +
    ' комнаты для ' + card.offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin
    + ', выезд до ' + card.offer.checkout;
    if (card.offer.features) {
      createFeaturesList(cardElement, card.offer.features);
    }
    if (card.offer.description) {
      cardElement.querySelector('.popup__description').textContent = card.offer.description;
    }
    if (card.author.avatar) {
      createPhotosList(cardElement, card.offer.photos);
      cardElement.querySelector('.popup__avatar').src = card.author.avatar;
    }
    var popupClose = cardElement.querySelector('.popup__close');
    popupClose.addEventListener('click', closeCard);
    popupClose.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.data.ESC_KEYCODE) {
        closeCard();
      }
    });
    document.addEventListener('keydown', onCardEscPress);
    return cardElement;
  };

  // Function for closing the card

  var closeCard = function () {
    var cardPopup = document.querySelector('.map__card');
    if (!cardPopup) {
      return;
    }
    cardPopup.remove();
    document.removeEventListener('keydown', onCardEscPress);
  };

  // Function for opening the card

  var openCard = function (card) {
    var mapCard = window.page.map.querySelector('.map__card');
    if (mapCard) {
      closeCard();
    }
    var fragment = document.createDocumentFragment();
    fragment.appendChild(createCard(card));
    window.page.map.insertBefore(fragment, window.page.map.children[1]);
  };

  // Handler for Esc

  var onCardEscPress = function (evt) {
    if (evt.keyCode === window.data.ESC_KEYCODE) {
      closeCard();
    }
  };

  window.card = {
    open: openCard,
    close: closeCard
  };

}());
