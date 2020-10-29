'use strict';
(() => {
  const map = document.querySelector(`.map`);
  const mapPinMain = document.querySelector(`.map__pin--main`);
  const mapPins = document.querySelector(`.map__pins`);

  let isPageActive = false;

  const MouseButton = {
    LEFT: 1
  };

  const KeyboardButtons = {
    ENTER: `Enter`,
    ESCAPE: `Escape`
  };

  const getIsPageActive = () => {
    return isPageActive;
  };

  const addPinEvent = (pinElement, bookingItem) => {
    pinElement.addEventListener(`click`, function () {
      map.appendChild(window.popup.getElement(bookingItem));
    });
  };

  const render = function () {
    const bookings = window.data.getBookings();
    renderPins(bookings);
  };

  const renderPins = function (bookings) {
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < bookings.length; i++) {
      const booking = bookings[i];
      const pinElement = window.pin.getElement(booking);

      addPinEvent(pinElement, booking);

      fragment.appendChild(pinElement);
    }

    mapPins.appendChild(fragment);
  };

  const activate = function () {
    if (isPageActive) {
      return;
    }

    isPageActive = true;
    map.classList.remove(`map--faded`);
    window.form.changeState();
    render();
    //  window.validate.rewritingPlaceholder();

  };

  const addEvents = function () {
    mapPinMain.addEventListener(`mousedown`, function (evt) {
      if (evt.which === MouseButton.LEFT) {
        activate();
      }
    });

    mapPinMain.addEventListener(`keydown`, function (evt) {
      if (evt.key === KeyboardButtons.ENTER) {
        activate();
      }
    });
  };

  // const reset = function () {
  //   map.classList.add(`map--faded`);
  // };

  const initialize = function () {
    addEvents();
  };

  window.map = {
    activate,
    getIsPageActive,
    mapPinMain,
    initialize
  };
})();
