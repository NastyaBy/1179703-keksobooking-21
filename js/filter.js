'use strict';
(() => {

  const housingTypeFilter = window.map.mapFilters.querySelector(`#housing-type`);
  const housingPriceFilter = window.map.mapFilters.querySelector(`#housing-price`);
  const housingRoomsFilter = window.map.mapFilters.querySelector(`#housing-rooms`);
  const housingGuestsFilter = window.map.mapFilters.querySelector(`#housing-guests`);
  const housingFeaturesList = window.map.mapFilters.querySelectorAll(`.map__checkbox`);

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

    });
  };

  const filterPinsByRooms = (value) => {
    bookings = bookings.filter((bookingItem) => {

    });
  };

  const filterPinsByGuests = (value) => {
    bookings = bookings.filter((bookingItem) => {

    });
  };

})();
