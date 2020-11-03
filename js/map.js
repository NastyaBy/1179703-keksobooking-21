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

  const onLoadEroor = function () {
    const errorElement = document.createElement(`div`);
    errorElement.innerText = `Ошибка при попытке загрузки данных`;
    errorElement.style.position = `absolute`;
    errorElement.style.width = `100%`;
    errorElement.style.height = `40px`;
    errorElement.style.textAlign = `center`;
    errorElement.style.backgroundColor = `#ff000021`;
    errorElement.style.borderWidth = `1px`;
    errorElement.style.borderStyle = `solid`;
    errorElement.style.borderColor = `red`;
    errorElement.style.lineHeight = `40px`;
    errorElement.style.top = `100px`;
    errorElement.style.color = `red`;

    map.appendChild(errorElement);
  };

  const activate = function () {
    if (isPageActive) {
      return;
    }

    isPageActive = true;
    map.classList.remove(`map--faded`);
    window.form.changeState();
    window.moving.updateAddress();
    window.server.load(renderPins, onLoadEroor);
  };

  window.map = {
    activate,
    getIsPageActive,
  };
})();
