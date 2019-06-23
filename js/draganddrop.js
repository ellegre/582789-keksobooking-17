'use strict';

var dialogHandle = document.querySelector('.map__pin--main');
dialogHandle.addEventListener('mousedown', function (evt) {
  evt.preventDefault();

  var startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };

  var dragged = false;

  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();
    dragged = true;
    var shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };

    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    }

  dialogHandle.style.top = (dialogHandle.offsetTop - shift.y) + 'px';
  dialogHandle.style.left = (dialogHandle.offsetLeft - shift.x) + 'px';
  }


  var onMouseUp = function (upEvt) {
    upEvt.preventDefault ();

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  }

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);

})



