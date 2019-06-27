'use strict';
(function () {

// Валидация формы

  var price = document.querySelector('#price');
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

  var checkIn = document.querySelector('#timein');
  var checkOut = document.querySelector('#timeout');
  checkIn.addEventListener('change', function () {
    checkOut.value = checkIn.value;
  });
  checkOut.addEventListener('change', function () {
    checkIn.value = checkOut.value;
  });
}());