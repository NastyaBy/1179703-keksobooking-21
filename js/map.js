'use strict';
(() => {
  const map = document.querySelector(`.map`);
  const mapPins = document.querySelector(`.map__pins`);
  const mapFiltersContainer = map.querySelector(`.map__filters-container`);
  const mapFilters = mapFiltersContainer.querySelector(`.map__filters`);
  const mapFiltersSelects = mapFilters.querySelectorAll(`select`);
  const mapFiltersFieldsets = mapFilters.querySelectorAll(`fieldset`);
  const mapFiltersElements = [...mapFiltersSelects, ...mapFiltersFieldsets];

  let pins = [];

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
      pins.push(pinElement);

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

  const changeFormState = () => {
    mapFiltersElements.forEach(function (el) {
      el.disabled = !isPageActive;
    });
  };

  const removePins = () => {
    pins.forEach((pin) => {
      pin.remove();
    });
    pins = [];
  };

  const activate = function () {
    if (isPageActive) {
      return;
    }

    isPageActive = true;
    map.classList.remove(`map--faded`);
    changeFormState();
    window.form.changeState();
    window.moving.updateAddress();
    window.server.load(renderPins, onLoadEroor);
  };

  const reset = () => {
    isPageActive = false;
    changeFormState();
    map.classList.add(`map--faded`);
    removePins();

  };

  const initialize = () => {
    changeFormState();
  };

  window.map = {
    activate,
    getIsPageActive,
    mapPins,
    reset,
    initialize
  };
})();
