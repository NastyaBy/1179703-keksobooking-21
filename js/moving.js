'use strict';
(() => {
  const getTransformElement = () => {
    window.map.mapPinMain.addEventListener(`mousedown`, function (evt) {
      evt.preventDefault();

      let startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };

      let dragged = false;

      const onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();

        dragged = true;

        let shift = {
          x: startCoords.x - moveEvt.clientX,
          y: startCoords.y - moveEvt.clientY
        };

        startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };

        window.map.mapPinMain.style.top = (window.map.mapPinMain.offsetTop - shift.y) + `px`;
        window.map.mapPinMain.style.left = (window.map.mapPinMain.offsetLeft - shift.x) + `px`;

        if (window.map.mapPinMain.offsetTop < top) {
          window.map.mapPinMain.style.top = `${top}px`;
        } else if (window.map.mapPinMain.offsetTop > bottom) {
          window.map.mapPinMain.style.top = `${bottom}px`;
        } else if (window.map.mapPinMain.offsetLeft < left) {
          window.map.mapPinMain.style.left = `${left}px`;
        } else if (window.map.mapPinMain.offsetLeft > right) {
          window.map.mapPinMain.style.left = `${right}px`;
        }

        window.form.getAddres();
      };

      const onMouseUp = function (upEvt) {
        upEvt.preventDefault();

        document.removeEventListener(`mousemove`, onMouseMove);
        document.removeEventListener(`mouseup`, onMouseUp);

        if (dragged) {
          const onClickPreventDefault = function (clickEvt) {
            clickEvt.preventDefault();
            window.map.mapPinMain.removeEventListener(`click`, onClickPreventDefault);
          };
          window.map.mapPinMain.addEventListener(`click`, onClickPreventDefault);
        }
      };

      document.addEventListener(`mousemove`, onMouseMove);
      document.addEventListener(`mouseup`, onMouseUp);
    });
  };

  window.moving = {
    getTransformElement
  };
})();
