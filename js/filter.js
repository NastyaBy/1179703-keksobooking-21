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
    return value === ANY_VALUE || (pin.offer.price >= PRICE.MIDDLE_MIN) && (pin.offer.price <= PRICE.MIDDLE_MAX)
      || pin.offer.price < PRICE.LOW_MAX || pin.offer.price > PRICE.HIGH_MIN;
  };

  const filterPinsByRooms = (pin, value) => {
    return value === ANY_VALUE || pin.offer.price === Number(value);
  };

  const filterPinsByGuests = (pin, value) => {
    return value === ANY_VALUE || pin.offer.price === Number(value);
  };


  const getFiltredBookings = (bookings, housingTypeValue, housingPriceValue, housingRoomsValue, housingGuestsValue) => {
    const filtredPins = [];

    for (let i = 0; i < bookings.length; i++) {
      const pin = bookings[i];

      const IsPinAvaliableType = filterPinsByType(pin, housingTypeValue);
      const IsPinAvaliablPrice = filterPinsByPrice(pin, housingPriceValue);
      const IsPinAvaliableRooms = filterPinsByRooms(pin, housingRoomsValue);
      const IsPinAvaliableGuest = filterPinsByGuests(pin, housingGuestsValue);


      if (IsPinAvaliableType) {
        filtredPins.push(pin);
      }

      if (IsPinAvaliablPrice) {
        filtredPins.push(pin);
      }

      if (IsPinAvaliableRooms) {
        filtredPins.push(pin);
      }

      if (IsPinAvaliableGuest) {
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
