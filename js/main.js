'use strict';

const getRandomNumber = function (min, max) {
  return min + Math.floor(Math.random() * (max - min));
};

const SIZE_ARRAY = 8;

let items = [];
for (let i = 1; i <= SIZE_ARRAY; i++) {
  items.push(i);
}

let newItems = [];
for (let i = 1; i <= SIZE_ARRAY; i++) {
  let idx = Math.floor(Math.random() * items.length);
  newItems.push(items[idx]);
  items.splice(idx, 1);
}

const offerType = [`palace`, `flat`, `house`, `bungalow`];
const offerCheck = [`12:00`, `13:00`, `14:00`];
const offerFeatures = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
const offerPhotos = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];

const booking = [];

const getBookingItem = function (avatarNumber, offerTitle, offerDescription) {
  const bookingItem = {
    author: {
      avatar: `img/avatars/user0${newItems[avatarNumber]}.png`,
    },
    offer: {
      title: `${newItems[offerTitle]}`,
      address: `{{location.x}}, {{location.y}}`,
      price: getRandomNumber(1000, 500000),
      type: `${getRandomNumber(offerType)}` + ` руб.`,
      rooms: getRandomNumber(1, 5),
      guests: getRandomNumber(1, 12),
      checkin: `${getRandomNumber(offerCheck)}`,
      checkout: `${getRandomNumber(offerCheck)}`,
      features: `${getRandomNumber(offerFeatures)}`,
      description: `${newItems[offerDescription]}`,
      photos: `${newItems[offerPhotos]}`
    },
    location: {
      x: getRandomNumber(31, 1169),
      y: getRandomNumber(130, 630)
    }
  };

  return bookingItem;
};

for (let i = 0; i < 8; i++) {
  const item = getBookingItem(i);
  booking.push(item);
}

const map = document.querySelector(`.map`);
map.classList.remove(`map--faded`);
