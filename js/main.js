'use strict';

const OFFER_TITLE = [`Квартира на проспекте`, `Апартаменты в цетре`, `Просторная квартира`, `Стильные апартаменты`, `Ваш дом`];
const OFFER_TYPE = [`palace`, `flat`, `house`, `bungalow`];
const OFFER_CHECKES = [`12:00`, `13:00`, `14:00`];
const OFFER_FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
const OFFER_DESCRIPTION = [`Во всех апартаментах есть полностью оборудованная кухня с микроволновой печью, гостиный уголок, телевизор с плоским экраном, стиральная машина и собственная ванная комната с душем и феном. В числе удобств холодильник, духовка, плита и чайник.`];
const OFFER_PHOTOS = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];




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

const getOfferTitle = function () {
  const randomTitle = getRandomNumber(0, OFFER_TITLE.length);
  return OFFER_TYPE[randomTitle];
};

const getOfferType = function () {
  const randomType = getRandomNumber(0, OFFER_TYPE.length);
  return OFFER_TYPE[randomType];
};

const getOfferCheck = function () {
  const randomCheck = getRandomNumber(0, OFFER_CHECKES.length);
  return OFFER_CHECKES[randomCheck];
};

const getOfferFeature = function () {
  const randomFeature = getRandomNumber(0, OFFER_FEATURES.length);
  return OFFER_FEATURES[randomFeature];
};

const getOfferDescription = function () {
  const randomDescription = getRandomNumber(0, OFFER_DESCRIPTION.length);
  return OFFER_DESCRIPTION[randomDescription];
};


const getOfferPhotos = function () {
  const randomPhotos = getRandomNumber(0, OFFER_PHOTOS.length);
  return OFFER_PHOTOS[randomPhotos];
};

const getBookingItem = function (avatarNumber) {
  return {
    author: {
      avatar: `img/avatars/user0${newItems[avatarNumber]}.png`,
    },
    offer: {
      title: getOfferTitle(),
      address: `{{location.x}}, {{location.y}}`,
      price: `${getRandomNumber(1000, 50000)} руб.`,
      type: getOfferType(),
      rooms: getRandomNumber(1, 5),
      guests: getRandomNumber(1, 12),
      checkin: getOfferCheck(),
      checkout: getOfferCheck(),
      features: getOfferFeature(),
      description: getOfferDescription(),
      photos: getOfferPhotos()
    },
    location: {
      x: getRandomNumber(31, 1169),
      y: getRandomNumber(130, 630)
    },
  };
};

const booking = [];

for (let i = 0; i < 8; i++) {
  const bookingItem = getBookingItem(i);
  booking.push(bookingItem);
}

const map = document.querySelector(`.map`);
map.classList.remove(`map--faded`);

console.log(booking);
