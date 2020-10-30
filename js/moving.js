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

        const Limits = {
          TOP: 130 - window.form.MainPinSize.AFTER,
          RIGHT: 1200 - Math.floor(window.form.MainPinSize.WIDTH),
          BOTTOM: 630,
          LEFT: 0 + Math.floor(window.form.MainPinSize.WIDTH / 2)
        };

        if (window.map.mapPinMain.offsetTop < Limits.TOP) {
          window.map.mapPinMain.style.top = `${Limits.TOP}px`;
        } else if (window.map.mapPinMain.offsetTop > Limits.BOTTOM) {
          window.map.mapPinMain.style.top = `${Limits.BOTTOM}px`;
        } else if (window.map.mapPinMain.offsetLeft < Limits.LEFT) {
          window.map.mapPinMain.style.left = `${Limits.LEFT}px`;
        } else if (window.map.mapPinMain.offsetLeft > Limits.RIGHT) {
          window.map.mapPinMain.style.left = `${Limits.RIGHT}px`;
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
