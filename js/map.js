'use strict';
(() => {

  const map = document.querySelector(`.map`);
  const mapPins = document.querySelector(`.map__pins`);
  const mapFiltersContainer = map.querySelector(`.map__filters-container`);
  const mapFilters = mapFiltersContainer.querySelector(`.map__filters`);
  const mapFiltersSelects = mapFilters.querySelectorAll(`select`);
  const mapFiltersFieldsets = mapFilters.querySelectorAll(`fieldset`);
  const mapFiltersElements = [...mapFiltersSelects, ...mapFiltersFieldsets];

  const housingTypeFilter = mapFilters.querySelector(`#housing-type`);
  const housingPriceFilter = mapFilters.querySelector(`#housing-price`);
  const housingRoomsFilter = mapFilters.querySelector(`#housing-rooms`);
  const housingGuestsFilter = mapFilters.querySelector(`#housing-guests`);

  let pins = [];
  let bookings = [];

  let isPageActive = false;

  const getIsPageActive = () => {
    return isPageActive;
  };

  const addPinEvent = (pinElement, bookingItem) => {
    pinElement.addEventListener(`click`, function () {
      map.appendChild(window.popup.getElement(bookingItem));
    });
  };

  const addFilterEvent = function () {
    mapFilters.addEventListener(`change`, function () {
      showPins();
    });
  };

  const getHousingFeatures = () => {
    return Array.from(mapFilters.querySelectorAll(`#housing-features input:checked`)).map((item) => item.value);
  };

  const showPins = () => {
    const filtredPins = window.filter.getFiltredBookings(bookings, housingTypeFilter.value, housingPriceFilter.value, housingRoomsFilter.value, housingGuestsFilter.value, getHousingFeatures());
    renderPins(filtredPins);
  };

  const renderPins = function (filtredPins) {
    removePins();

    const fragment = document.createDocumentFragment();

    for (let i = 0; i < filtredPins.length; i++) {
      const booking = filtredPins[i];
      const pinElement = window.pin.getElement(booking);
      pins.push(pinElement);

      addPinEvent(pinElement, booking);

      fragment.appendChild(pinElement);
    }

    mapPins.appendChild(fragment);
  };

  const onLoadSuccess = (items) => {
    bookings = items;
    showPins();
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
    window.server.load(onLoadSuccess, onLoadEroor);
  };

  const reset = () => {
    isPageActive = false;
    changeFormState();
    map.classList.add(`map--faded`);
    removePins();
    mapFilters.reset();
  };

  const initialize = () => {
    changeFormState();
    addFilterEvent();
  };

  window.map = {
    activate,
    getIsPageActive,
    mapPins,
    mapFilters,
    reset,
    initialize
  };
})();
