'use strict';
(() => {
  const map = document.querySelector(`.map`);
  const mapPins = document.querySelector(`.map__pins`);

  let isPageActive = false;

  const getIsPageActive = () => {
    return isPageActive;
  };

  const addPinEvent = (pinElement, bookingItem) => {
    pinElement.addEventListener(`click`, function () {
      map.appendChild(window.popup.getElement(bookingItem));
    });
  };

  const renderPins = function () {
    window.server.load(function (bookings) {
      const fragment = document.createDocumentFragment();

      for (let i = 0; i < bookings.length; i++) {
        const booking = bookings[i];
        const pinElement = window.pin.getElement(booking);

        addPinEvent(pinElement, booking);

        fragment.appendChild(pinElement);
      }

      mapPins.appendChild(fragment);
    }, function (message) {
      console.error(message);
    });
  };

  const activate = function () {
    if (isPageActive) {
      return;
    }

    isPageActive = true;
    map.classList.remove(`map--faded`);
    window.form.changeState();
    window.moving.updateAddress();
    renderPins();
  };

  window.map = {
    activate,
    getIsPageActive,
  };
})();
