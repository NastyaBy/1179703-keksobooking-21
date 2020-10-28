'use strict';
(() => {
  window.map.map = document.querySelector(`.map`);


  const getAddres = function () {
    const valueX = window.pin.mapPinMain.offsetLeft + Math.floor(mainPinSize.WIDTH / 2);
    const valueY = window.pin.mapPinMain.offsetTop + Math.floor((!isPageActive ? mainPinSize.HEIGHT / 2 : mainPinSize.HEIGHT + mainPinSize.AFTER));

    return {valueX, valueY};
  };

  const setAddres = function (valueX, valueY) {
    addressInput.value = `${valueX}, ${valueY}`;
  };

  const updateAddress = function () {
    const address = getAddres();
    setAddres(address.valueX, address.valueY);
  };

  const activete = function () {
    isPageActive = true;
    changeElementsState();
    updateAddress();
    rewritingPlaceholder();
    publishForm();
  };

  window.map = {
    activete,
    updateAddress
  };
})();
