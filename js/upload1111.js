'use strict';

(function () {
  var URL = 'https://js.dump.academy/keksobooking/data';

  var onError = function (message) {
    console.error(message);
  };

  var onSuccess = function (data) {
    console.log(data);
  };


 window.load = function (onSuccess, onError) {
  var xhr = new XMLHttpRequest();
  xhr.responseType = 'json';

  xhr.addEventListener('load', function () {
    if (xhr.status === 200) {
      onSuccess(xhr.response);
    } else {
      onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
    }
  });
  xhr.addEventListener('error', function () {
    onError('Произошла ошибка соединения');
  });
  xhr.addEventListener('timeout', function () {
    onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
  });

  xhr.timeout = 10000; // 10s

  xhr.open('GET', URL);
  xhr.send();

  console.log(xhr.response);
  window.load();
};

  window.upload = function (data, onSuccess) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      onSuccess(xhr.response);
    });

    xhr.open('POST', URL);
    xhr.send(data);
  };

/*
  window.load('https://up.htmlacademy.ru/assets/javascript/demo/8-xhr/unknownfile.json', onSuccess, onError);

  window.load('https://up.htmlacademy.ru/assets/javascript/demo/8-xhr/data.json', onSuccess, onError);

  window.load('https://api.github.com/user', onSuccess, onError);
*/
})();

