'use strict';
(function () {

  var CARD_PHOTO_HEIGHT = 40;
  var CARD_PHOTO_WIDTH = 45;

  var propertyTypeSelect = {
    'bungalo': 'Бунгало',
    'flat': 'Квартира',
    'house': 'Дом',
    'palace': 'Дворец'
  };

  var cardTemplate = document
    .querySelector('#card')
    .content
    .querySelector('article');

  // Создаем карточку

  var createCard = function (card) {
    var cardElement = cardTemplate.cloneNode(true);

    cardElement.querySelector('.popup__title').textContent = card.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = card.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = card.offer.price + '₽/ночь';
    cardElement.querySelector('.popup__type').textContent = propertyTypeSelect[card.offer.type];
    cardElement.querySelector('.popup__text--capacity').textContent = card.offer.rooms +
    ' комнаты для ' + card.offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin
    + ', выезд до ' + card.offer.checkout;
    createFeaturesList(cardElement, card.offer.features);
    cardElement.querySelector('.popup__description').textContent = card.offer.description;
    createPhotosList(cardElement, card.offer.photos);
    cardElement.querySelector('.popup__avatar').src = card.author.avatar;

    return cardElement;
  };


  var createFeaturesList = function (card, arr) {
    var list = card.querySelector('.popup__features');
    list.innerHTML = '';
    for (var i = 0; i < arr.length; i++) {
      var listItem = document.createElement('li');
      listItem.classList.add('feature', 'feature--' + arr[i]);
      list.appendChild(listItem);
    }
  };


  var createPhotosList = function (card, arr) {
    var list = card.querySelector('.popup__photos');
    list.innerHTML = '';
    for (var i = 0; i < arr.length; i++) {
      var listItem = document.createElement('img');
      listItem.classList.add('.popup__photo');
      listItem.width = CARD_PHOTO_WIDTH;
      listItem.height = CARD_PHOTO_HEIGHT;
      listItem.src = arr[i];
      listItem.alt = 'Фотография жилья';
      list.appendChild(listItem);
    }
  };

  window.createCardArray = function (arr) {
    var fragment = document.createDocumentFragment();
    fragment.appendChild(createCard(arr[0]));
    window.map.insertBefore(fragment, window.map.children[1]);
  };


  window.card = {

  };

}());
