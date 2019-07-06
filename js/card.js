'use strict';
(function () {
  var mapFiltersContainer = document.querySelector('.map__filters-container');

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
    cardElement.querySelector('.popup__type').textContent = propertyTypeTransfer(card.offer.type);
    cardElement.querySelector('.popup__text--capacity').textContent = card.offer.rooms +
    'комнаты для ' + card.offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin
    + ', выезд до ' + card.offer.checkout;
    cardElement.querySelector('.popup__features').innerHTML = getFeaturesList(card.offer.features);
    cardElement.querySelector('.popup__description').textContent = card.offer.description;
    cardElement.querySelector('.popup__photos').setAttribute('src', card.author.avatar);
    cardElement.querySelector('.popup__avatar').src = card.author.avatar;

    return cardElement;
  };



  window.createCardArray = function (arr) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < 5 && i < arr.length; i++) {
      fragment.appendChild(createCard(arr[i]));
    }
    window.map.insertBefore(fragment, window.map.children[1]);


}

 //

  var getPhotosList = function (photosArr) {
    var photosItem = '';
    for (var i = 0; i < photosArr.length; i++) {
      photosItem = '<img src =' + photosArr[i] +
      'width = "45" height = "40 alt="фотография жилья">' + ',' + photosItem;
    }
    return photosItem;
  };

  var propertyTypeTransfer = function (propertyType) {
      switch (propertyType) {
        case 'flat': return 'Квартира';
        case 'bungalo': return 'Бунгало';
        case 'house': return 'Дом';
        case 'palace': return 'Дворец';
        default: return '';
      }
    };

  var getFeaturesList = function (featuresArr) {
  var featuresList = '';
  for (var i = 0; i < featuresArr.length; i++) {
    featuresList = '<li class="feature feature--' +
    featuresArr[i] + '"></li>' + featuresList;
  }
  return featuresList;
};

window.card = {

}

}());
