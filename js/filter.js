'use strict';
(() => {

  const MAX_PIN_COUNT = 5;

  const ANY_VALUE = `any`;

  const PRICE = {
    MIDDLE_MIN: 10000,
    MIDDLE_MAX: 50000,
    LOW_MAX: 10000,
    HIGH_MIN: 50000
  };

  // let bookings = [];

  // const successHandler = function (data) {
  //   bookings = data;
  //   window.map.renderPins(bookings);
  // };

  const filterPinsByType = (pin, value) => {
    return value === ANY_VALUE || pin.offer.type === value;

    // bookings = bookings.filter((bookingItem) => {
    //   return bookingItem.offer.type === value;
    // });
  };

  const filterPinsByPrice = (pin, value) => {
    switch (value) {
      case `middle`:
        return (pin.offer.price >= PRICE.MIDDLE_MIN) && (pin.offer.price <= PRICE.MIDDLE_MAX);
      case `low`:
        return pin.offer.price < PRICE.LOW_MAX;
      case `high`:
        return pin.offer.price > PRICE.HIGH_MIN;
      default:
        return value === ANY_VALUE;
    }
  };

  const filterPinsByRooms = (pin, value) => {
    return value === ANY_VALUE || pin.offer.rooms === Number(value);
  };

  const filterPinsByGuests = (pin, value) => {
    return value === ANY_VALUE || pin.offer.guests <= Number(value);
  };

  const filterPinsByFeatures = (pin, housingFeatures) => {
    return housingFeatures.every((feature) => pin.offer.features.includes(feature));
  };


  const getFiltredBookings = (bookings, housingTypeValue, housingPriceValue, housingRoomsValue, housingGuestsValue, housingFeatures) => {
    const filtredPins = [];

    for (let i = 0; i < bookings.length; i++) {
      const pin = bookings[i];

      const isPinAvaliable = filterPinsByType(pin, housingTypeValue) &&
        filterPinsByPrice(pin, housingPriceValue) &&
        filterPinsByRooms(pin, housingRoomsValue) &&
        filterPinsByGuests(pin, housingGuestsValue) &&
        filterPinsByFeatures(pin, housingFeatures);

      if (isPinAvaliable) {
        filtredPins.push(pin);
      }

      if (filtredPins.length === MAX_PIN_COUNT) {
        break;
      }
    }
    return filtredPins;
  };

  // const addFilterEvent = function () {
  //   window.map.mapFilters.addEventListener(`change`, function (evt) {
  //     switch (evt.target.value) {
  //       case housingTypeFilter.value:
  //         filterPinsByType();
  //         break;
  //       case housingPriceFilter.value:
  //         filterPinsByPrice();
  //         break;
  //       case housingRoomsFilter.value:
  //         filterPinsByRooms();
  //         break;
  //       case housingGuestsFilter.value:
  //         filterPinsByGuests();
  //         break;
  //     }
  //   });
  // };

  window.filter = {
    getFiltredBookings
  };

})();
