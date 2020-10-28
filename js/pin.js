'use strict';

(() => {
  const mapPins = document.querySelector(`.map__pins`);
  const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
  const mapPinMain = document.querySelector(`.map__pin--main`);

  const mouseButton = {
    left: 1
  };

  const keyboardButtons = {
    Enter: `Enter`,
    Escape: `Escape`
  };


  const addPinEvent = (pinElement, bookingItem) => {
    pinElement.addEventListener(`click`, function () {
      window.map.map.appendChild(window.popup.showPopup(bookingItem));
    });
  };

  const renderPin = function (bookingItem) {
    const pinElement = pinTemplate.cloneNode(true);
    const pinElementImg = pinElement.querySelector(`img`);

    pinElement.style.top = `${bookingItem.location.y}px`;
    pinElement.style.left = `${bookingItem.location.x}px`;
    pinElementImg.setAttribute(`src`, `${bookingItem.author.avatar}`);
    pinElementImg.setAttribute(`alt`, `${bookingItem.offer.title}`);

    addPinEvent(pinElement, bookingItem);

    return pinElement;
  };

  const render = function () {
    const bookings = window.data.getBookings();
    renderPins(bookings);
  };


  const renderPins = function (bookings) {
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < bookings.length; i++) {
      fragment.appendChild(renderPin(bookings[i]));
    }

    mapPins.appendChild(fragment);
  };

  const addMapPinEvent = function () {
    mapPinMain.addEventListener(`mousedown`, function (evt) {
      if (evt.which === mouseButton.left) {
        activete();
        render();
      }
    });

    mapPinMain.addEventListener(`keydown`, function (evt) {
      if (evt.key === keyboardButtons.Enter) {
        activete();
        render();
      }
    });
  };

  window.pin = {
    renderPins,
    addMapPinEvent
  };

})();
