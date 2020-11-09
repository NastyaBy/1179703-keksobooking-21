'use strict';
(() => {

  const housingTypeFilter = window.map.mapFilters.querySelector(`#housing-type`);
  const housingPriceFilter = window.map.mapFilters.querySelector(`#housing-price`);
  const housingRoomsFilter = window.map.mapFilters.querySelector(`#housing-rooms`);
  const housingGuestsFilter = window.map.mapFilters.querySelector(`#housing-guests`);
  const housingFeaturesList = window.map.mapFilters.querySelectorAll(`.map__checkbox`);

  const PRICE = {
    MIDDLE_MIN: 10000,
    MIDDLE_MAX: 50000,
    LOW_MAX: 10000,
    HIGH_MIN: 50000
  };

  let bookings = [];

  const successHandler = function (data) {
    bookings = data;
    window.map.renderPins(bookings);
  };

  const filterPinsByType = (value) => {
    bookings = bookings.filter((bookingItem) => {
      return bookingItem.offer.type === value;
    });
  };

  const filterPinsByPrice = (value) => {
    bookings = bookings.filter((bookingItem) => {
      switch (value) {
        case `middle`:
          return (bookingItem.offer.price >= PRICE.MIDDLE_MIN) && (bookingItem.offer.price <= PRICE.MIDDLE_MAX);
        case `low`:
          return bookingItem.offer.price < PRICE.LOW_MAX;
        case `high`:
          return bookingItem.offer.price > PRICE.HIGH_MIN;
        default:
          return false;
      }
    });
  };

  const filterPinsByRooms = (value) => {
    bookings = bookings.filter((bookingItem) => {
      return bookingItem.offer.price === Number(value);
    });
  };

  const filterPinsByGuests = (value) => {
    bookings = bookings.filter((bookingItem) => {
      return bookingItem.offer.price === Number(value);
    });
  };


  const addFilterEvent = function () {
    window.map.mapFilters.addEventListener(`change`, function (evt) {
      switch (evt.target.value) {
        case housingTypeFilter.value:
          filterPinsByType();
          break;
        case housingPriceFilter.value:
          filterPinsByPrice();
          break;
        case housingRoomsFilter.value:
          filterPinsByRooms();
          break;
        case housingGuestsFilter.value:
          filterPinsByGuests();
          break;
      }
    });
  };
})();
