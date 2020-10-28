'use strict';

(() => {
  const OFFER_TITLE = [`Квартира на проспекте`, `Апартаменты в цетре`, `Просторная квартира`, `Стильные апартаменты`, `Ваш дом`];
  const OFFER_TYPE = [`palace`, `flat`, `house`, `bungalow`];
  const OFFER_CHECKES = [`12:00`, `13:00`, `14:00`];
  const OFFER_FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
  const OFFER_DESCRIPTION = [`Во всех апартаментах есть полностью оборудованная кухня с микроволновой печью, гостиный уголок, телевизор с плоским экраном, стиральная машина и собственная ванная комната с душем и феном.`, `Есть холодильник, духовка, плита и чайник.`];
  const OFFER_PHOTOS = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];
  const SIZE_ARRAY = [`1`, `2`, `3`, `4`, `5`, `6`, `7`, `8`];

  const getRandomNumber = function (min, max) {
    return min + Math.floor(Math.random() * (max - min));
  };

  const getRandomItem = function (items) {
    const randomIndex = getRandomNumber(0, items.length);
    return items[randomIndex];
  };

  const getRandomItems = function (items) {
    const randomItems = [];
    const randomItemsCount = getRandomNumber(0, items.length);

    while (randomItems.length < randomItemsCount) {
      const randomItem = getRandomItem(items);

      if (!randomItems.includes(randomItem)) {
        randomItems.push(randomItem);
      }
    }
    return randomItems;
  };

  const getBookingItem = function () {
    return {
      author: {
        avatar: `img/avatars/user0${getRandomItem(SIZE_ARRAY)}.png`,
      },
      offer: {
        title: getRandomItem(OFFER_TITLE),
        address: `${location.x}, ${location.y}`,
        price: `${getRandomNumber(1000, 500000)}`,
        type: getRandomItem(OFFER_TYPE),
        rooms: getRandomNumber(1, 3),
        guests: getRandomNumber(1, 12),
        checkin: getRandomItem(OFFER_CHECKES),
        checkout: getRandomItem(OFFER_CHECKES),
        features: getRandomItems(OFFER_FEATURES),
        description: getRandomItem(OFFER_DESCRIPTION),
        photos: getRandomItems(OFFER_PHOTOS)
      },
      location: {
        x: getRandomNumber(31, 1169),
        y: getRandomNumber(130, 630)
      },
    };
  };

  const getBookings = function () {
    const booking = [];

    for (let i = 0; i < 8; i++) {
      const bookingItem = getBookingItem(i);
      booking.push(bookingItem);
    }
    return booking;
  };

  window.data = {
    getRandomNumber,
    getRandomItem,
    getRandomItems,
    getBookingItem,
    getBookings
  };


})();
