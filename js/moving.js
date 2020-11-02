'use strict';
(() => {

  const MouseButton = {
    LEFT: 1
  };

  const MainPinSize = {
    WIDTH: 65,
    HEIGHT: 65,
    AFTER: 22
  };

  // const Limits = {
  //   TOP: 130 - MainPinSize.AFTER,
  //   RIGHT: 1200 - Math.floor(MainPinSize.WIDTH / 2),
  //   BOTTOM: 630,
  //   LEFT: 0 - Math.floor(MainPinSize.WIDTH / 2)
  // };

  const ENTER = `Enter`;

  const mapPinMain = document.querySelector(`.map__pin--main`);

  const getAddres = function (offsetTop, offsetLeft) {
    const valueX = offsetLeft + Math.floor(MainPinSize.WIDTH / 2);
    const valueY = offsetTop + Math.floor((!window.map.getIsPageActive() ? MainPinSize.HEIGHT / 2 : MainPinSize.HEIGHT + MainPinSize.AFTER));

    return {valueX, valueY};
  };

  const updateAddress = function () {
    const {offsetTop, offsetLeft} = mapPinMain;

    const address = getAddres(offsetTop, offsetLeft);
    window.form.setAddres(address.valueX, address.valueY);
  };

  const addEvents = () => {

    mapPinMain.addEventListener(`keydown`, function (evt) {
      if (evt.key === ENTER) {
        window.map.activate();
      }
    });

    mapPinMain.addEventListener(`mousedown`, function (evt) {
      evt.preventDefault();

      if (evt.which === MouseButton.LEFT) {
        window.map.activate();
      }

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

        const offsetTop = mapPinMain.offsetTop - shift.y;
        const offsetLeft = mapPinMain.offsetLeft - shift.x;

        const {valueX, valueY} = getAddres(offsetTop, offsetLeft);

        const isAddresValid = valueX >= 0 && valueX <= 1200 && valueY >= 130 && valueY <= 630;

        if (isAddresValid) {
          mapPinMain.style.top = `${offsetTop}px`;
          mapPinMain.style.left = `${offsetLeft}px`;

          window.form.setAddres(valueX, valueY);
        }

        // if (mapPinMain.offsetTop < Limits.TOP) {
        //   mapPinMain.style.top = `${Limits.TOP}px`;
        // } else if (mapPinMain.offsetTop > Limits.BOTTOM) {
        //   mapPinMain.style.top = `${Limits.BOTTOM}px`;
        // } else if (mapPinMain.offsetLeft < Limits.LEFT) {
        //   mapPinMain.style.left = `${Limits.LEFT}px`;
        // } else if (mapPinMain.offsetLeft > Limits.RIGHT) {
        //   mapPinMain.style.left = `${Limits.RIGHT}px`;
        // }

        // window.form.getAddres();
      };

      const onMouseUp = function (upEvt) {
        upEvt.preventDefault();

        document.removeEventListener(`mousemove`, onMouseMove);
        document.removeEventListener(`mouseup`, onMouseUp);

        if (dragged) {
          const onClickPreventDefault = function (clickEvt) {
            clickEvt.preventDefault();
            mapPinMain.removeEventListener(`click`, onClickPreventDefault);
          };
          mapPinMain.addEventListener(`click`, onClickPreventDefault);
        }
      };

      document.addEventListener(`mousemove`, onMouseMove);
      document.addEventListener(`mouseup`, onMouseUp);
    });
  };

  const initialize = () => {
    updateAddress();
    addEvents();
  };

  window.moving = {
    initialize,
    updateAddress
  };
})();
