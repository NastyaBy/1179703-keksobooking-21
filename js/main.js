'use strict';

const OFFER_TITLE = [`Квартира на проспекте`, `Апартаменты в цетре`, `Просторная квартира`, `Стильные апартаменты`, `Ваш дом`];
const OFFER_TYPE = [`palace`, `flat`, `house`, `bungalow`];
const OFFER_CHECKES = [`12:00`, `13:00`, `14:00`];
const OFFER_FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
const OFFER_DESCRIPTION = [`Во всех апартаментах есть полностью оборудованная кухня с микроволновой печью, гостиный уголок, телевизор с плоским экраном, стиральная машина и собственная ванная комната с душем и феном. В числе удобств холодильник, духовка, плита и чайник.`];
const OFFER_PHOTOS = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];
const SIZE_ARRAY = 8;

const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
const mapPins = document.querySelector(`.map__pins`);

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
  for (let i = 0; i < randomItemsCount; i++) {
    const randomItem = getRandomItem(items);
    randomItems.push(randomItem);
  }
  return randomItems;
};

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


const getBookingItem = function (avatarNumber) {
  return {
    author: {
      avatar: `img/avatars/user0${newItems[avatarNumber]}.png`,
    },
    offer: {
      title: getRandomItems(OFFER_TITLE),
      address: `{{location.x}}, {{location.y}}`,
      price: `${getRandomNumber(1000, 500000)} руб.`,
      type: getRandomItems(OFFER_TYPE),
      rooms: getRandomNumber(1, 3),
      guests: getRandomNumber(1, 12),
      checkin: getRandomItems(OFFER_CHECKES),
      checkout: getRandomItems(OFFER_CHECKES),
      features: getRandomItems(OFFER_FEATURES),
      description: getRandomItems(OFFER_DESCRIPTION),
      photos: getRandomItems(OFFER_PHOTOS)
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


const renderPin = function (bookingItem) {
  const pinElement = pinTemplate.cloneNode(true);
  const pinElementImg = pinElement.querySelector(`img`);

  pinElement.style.top = `${bookingItem.location.y - 40}px`;
  pinElement.style.left = `${bookingItem.location.x - 20}px`;
  pinElementImg.setAttribute(`src`, `${bookingItem.author.avatar}`);
  pinElementImg.setAttribute(`alt`, `${bookingItem.offer.title}`);

  return pinElement;
};

const fragment = document.createDocumentFragment();
for (let i = 0; i < 8; i++) {
  fragment.appendChild(renderPin(booking[i]));
}
mapPins.appendChild(fragment);
