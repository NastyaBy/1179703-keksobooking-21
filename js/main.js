'use strict';

const OFFER_TITLE = [`Квартира на проспекте`, `Апартаменты в цетре`, `Просторная квартира`, `Стильные апартаменты`, `Ваш дом`];
const OFFER_TYPE = [`palace`, `flat`, `house`, `bungalow`];
const OFFER_CHECKES = [`12:00`, `13:00`, `14:00`];
const OFFER_FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
const OFFER_DESCRIPTION = [`Во всех апартаментах есть полностью оборудованная кухня с микроволновой печью, гостиный уголок, телевизор с плоским экраном, стиральная машина и собственная ванная комната с душем и феном.`, `Есть холодильник, духовка, плита и чайник.`];
const OFFER_PHOTOS = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];
const SIZE_ARRAY = [`1`, `2`, `3`, `4`, `5`, `6`, `7`, `8`];
const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const MAX_PRICE = 1000000;

const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
//  const cardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);
const mapPins = document.querySelector(`.map__pins`);

const map = document.querySelector(`.map`);
const mapPinMain = document.querySelector(`.map__pin--main`);
const adForm = document.querySelector(`.ad-form`);
const adFormFieldset = document.querySelectorAll(`.ad-form fieldset`);
const addressInput = adForm.querySelector(`#address`);

const addressPin = function () {
  const locationX = mapPinMain.offsetTop;
  const locationY = mapPinMain.offsetLeft;
  return `${locationX}, ${locationY}`;
};

const disabledAdForm = function () {
  adForm.classList.add(`ad-form--disabled`);

  adFormFieldset.forEach(function (el) {
    el.disabled = true;
  });
  addressInput.value = addressPin();
};

disabledAdForm();

const enabledAdForm = function () {
  adForm.classList.remove(`ad-form--disabled`);

  adFormFieldset.forEach(function (el) {
    el.disabled = false;
  });
};

mapPinMain.addEventListener(`mousedown`, function (evt) {
  if (evt.which === 1) {
    map.classList.remove(`map--faded`);
    enabledAdForm();
  }
});

mapPinMain.addEventListener(`keydown`, function (evt) {
  if (evt.key === `Enter`) {
    map.classList.remove(`map--faded`);
    enabledAdForm();
  }
});

const titleInput = adForm.querySelector(`#title`);
const priceInput = adForm.querySelector(`#price`);

titleInput.addEventListener(`input`, function () {
  let valueLength = titleInput.value.length;
  let message = ``;

  if (valueLength < MIN_TITLE_LENGTH) {
    message = `Ещё ` + `${(MIN_TITLE_LENGTH - valueLength)}` + ` симв.`;
  } else if (valueLength > MAX_TITLE_LENGTH) {
    message = `Удалите лишние` + `${(valueLength - MAX_TITLE_LENGTH)}` + `симв.`;
  }

  titleInput.setCustomValidity(message);

  titleInput.reportValidity();
});

priceInput.addEventListener(`input`, function () {
  let valueLength = priceInput.value.length;
  let message = ``;

  if (valueLength > MAX_PRICE) {
  }

  priceInput.setCustomValidity(message);

  priceInput.reportValidity();
});



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

const booking = [];

for (let i = 0; i < 8; i++) {
  const bookingItem = getBookingItem(i);
  booking.push(bookingItem);
}


//  map.classList.remove(`map--faded`);

const renderPin = function (bookingItem) {
  const pinElement = pinTemplate.cloneNode(true);
  const pinElementImg = pinElement.querySelector(`img`);

  pinElement.style.top = `${bookingItem.location.y}px`;
  pinElement.style.left = `${bookingItem.location.x}px`;
  pinElementImg.setAttribute(`src`, `${bookingItem.author.avatar}`);
  pinElementImg.setAttribute(`alt`, `${bookingItem.offer.title}`);


  return pinElement;
};


// const OffetType = {
//   palace: `Дворец`,
//   flat: `Квартира`,
//   house: `Дом`,
//   bungalow: `Бунгало`
// };
//
// const getRenderFeature = function (featureElement, bookingItem, cardElement) {
//   while (featureElement.firstChild) {
//     featureElement.removeChild(featureElement.firstChild);
//   }
//   for (let i = 0; i < bookingItem.offer.features.length; i++) {
//     cardElement.querySelector(`.popup__features`).appendChild(document.createElement(`li`)).classList.add(`popup__feature`, `popup__feature--${bookingItem.offer.features[i]}`);
//   }
// };
//
// const getRenderPhotos = function (photoElement, bookingItem, cardElement) {
//   while (photoElement.firstChild) {
//     photoElement.removeChild(photoElement.firstChild);
//   }
//
//   for (let i = 0; i < bookingItem.offer.photos.length; i++) {
//     const img = document.createElement(`img`);
//     img.src = `${bookingItem.offer.photos[i]}`;
//     img.alt = `Фото жилья`;
//     img.width = 45;
//     img.height = 40;
//     cardElement.querySelector(`.popup__photos`).appendChild(img).classList.add(`popup__photo`);
//   }
// };

// const renderCard = function (bookingItem) {
//   const cardElement = cardTemplate.cloneNode(true);
//   const featureElement = cardElement.querySelector(`.popup__features`);
//   const photoElement = cardElement.querySelector(`.popup__photos`);
//
//
//   cardElement.querySelector(`.popup__title`).textContent = `${bookingItem.offer.title}`;
//   cardElement.querySelector(`.popup__text--address`).textContent = `${bookingItem.offer.address}`;
//   cardElement.querySelector(`.popup__text--price`).textContent = `${bookingItem.offer.price} ₽/ночь`;
//   cardElement.querySelector(`.popup__type`).textContent = OffetType[`${bookingItem.offer.type}`];
//   cardElement.querySelector(`.popup__text--capacity`).textContent = `${bookingItem.offer.rooms} комнаты для ${bookingItem.offer.guests} гостей`;
//   cardElement.querySelector(`.popup__text--time`).textContent = `Заезд после ${bookingItem.offer.checkin}, выезд до ${bookingItem.offer.checkout}`;
//   cardElement.querySelector(`.popup__description`).textContent = `${bookingItem.offer.description}`;
//
//   getRenderFeature(featureElement, bookingItem, cardElement);
//   getRenderPhotos(photoElement, bookingItem, cardElement);
//
//
//   cardElement.querySelector(`.popup__avatar`).setAttribute(`src`, `${bookingItem.author.avatar}`);
//
//   return cardElement;
// };

const fragment = document.createDocumentFragment();

for (let i = 0; i < 8; i++) {
  fragment.appendChild(renderPin(booking[i]));
}
// fragment.appendChild(renderCard(booking[0]));

mapPins.appendChild(fragment);
