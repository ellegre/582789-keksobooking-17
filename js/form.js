'use strict';
(function () {

  var adForm = document.querySelector('.ad-form'); // window.map.adForm
  var price = adForm.querySelector('#price');
  var type = adForm.querySelector('#type');
  var roomNumber = adForm.querySelector('#room_number');
  var capacity = adForm.querySelector('#capacity');
  var capacityOptions = capacity.querySelectorAll('option');
  var adFormReset = adForm.querySelector('.ad-form__reset');

  // Sending the form

  adForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.upload.send(onLoad, onError, new FormData(adForm));
  });

  // Validation of my advertisement

  var roomCapacity = {
    '1': ['1'],
    '2': ['1', '2'],
    '3': ['1', '2', '3'],
    '100': ['0']
  };

  var changeCapacity = function () {
    capacityOptions.forEach(function (option) {
      option.disabled = true;
      option.selected = false;

      if (roomCapacity[roomNumber.value].indexOf(option.value) > -1) {
        option.disabled = false;
        option.selected = true;
      }
    });
  };

  changeCapacity();
  roomNumber.addEventListener('change', function () {
    changeCapacity();
  });

  type.addEventListener('change', function () {
    price.min = window.data.AccomodationType[type.value.toUpperCase()].price;
    price.placeholder = window.data.AccomodationType[type.value.toUpperCase()].price;
  });

  var checkIn = document.querySelector('#timein');
  var checkOut = document.querySelector('#timeout');
  checkIn.addEventListener('change', function () {
    checkOut.value = checkIn.value;
  });
  checkOut.addEventListener('change', function () {
    checkIn.value = checkOut.value;
  });


  // Successfull form sending

  var onLoad = function () {
    var successTemplate = document.querySelector('#success').content.querySelector('.success');

    var success = successTemplate.cloneNode(true);
    var fragment = document.createDocumentFragment();
    var main = document.querySelector('main');
    fragment.appendChild(success);
    main.appendChild(fragment);

    var successMessage = main.querySelector('.success');
    successMessage.addEventListener('click', function () {
      successMessage.remove();
      adForm.reset();
      window.page.movePinToInitial();
    });

    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.data.ESC_KEYCODE) {
        successMessage.remove();
        adForm.reset();
        window.page.movePinToInitial();
      }
    });
    resetForm();
  };

  // Function for inactivate forms

  var resetForm = function () {
    adForm.reset();
    window.page.inactivateMap();
    window.utils.clearPins();
    window.card.close();
    window.page.movePinToInitial();
    window.data.array = [];
    changeCapacity();
  };

  adFormReset.addEventListener('click', function () {
    resetForm();
  });

  // Unsuccessful form sending

  var onError = function () {
    var errorTemplate = document.querySelector('#error').content.querySelector('.error');

    var error = errorTemplate.cloneNode(true);
    var fragment = document.createDocumentFragment();
    var main = document.querySelector('main');
    fragment.appendChild(error);
    main.appendChild(fragment);

    // Press on button 'Попробовать снова'

    var errorButton = document.querySelector('.error__button');
    var errorMessage = document.querySelector('.error');

    var onClickError = function () {
      errorMessage.remove();
      resetForm();
    };

    errorButton.addEventListener('click', function () {
      onClickError();
    });

    errorMessage.addEventListener('click', function () {
      onClickError();
    });

    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.data.ESC_KEYCODE) {
        onClickError();
        document.removeEventListener('keydown', onClickError);
      }
    });
  };

}());
