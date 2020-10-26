'use strict';

const OFFER_TITLE = [`Квартира на проспекте`, `Апартаменты в цетре`, `Просторная квартира`, `Стильные апартаменты`, `Ваш дом`];
const OFFER_TYPE = [`palace`, `flat`, `house`, `bungalow`];
const OFFER_CHECKES = [`12:00`, `13:00`, `14:00`];
const OFFER_FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
const OFFER_DESCRIPTION = [`Во всех апартаментах есть полностью оборудованная кухня с микроволновой печью, гостиный уголок, телевизор с плоским экраном, стиральная машина и собственная ванная комната с душем и феном.`, `Есть холодильник, духовка, плита и чайник.`];
const OFFER_PHOTOS = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];
const SIZE_ARRAY = [`1`, `2`, `3`, `4`, `5`, `6`, `7`, `8`];

const titleLength = {
  MIN: 30,
  MAX: 100
};

const mouseButton = {
  left: 1
};

const keyboardButtons = {
  Enter: `Enter`,
  Escape: `Escape`
};

const MainPinSize = {
  WIDTH: 65,
  HEIGHT: 65,
  AFTER: 22
};

const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
const cardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);
const mapPins = document.querySelector(`.map__pins`);

const map = document.querySelector(`.map`);
const mapPinMain = document.querySelector(`.map__pin--main`);
//  const mapFilters = document.querySelector(`.map__filters`);
const adForm = document.querySelector(`.ad-form`);
const adFormFieldset = document.querySelectorAll(`.ad-form fieldset`);
const addressInput = adForm.querySelector(`#address`);
const titleElement = adForm.querySelector(`#title`);
//  const typeElement = adForm.querySelector(`#type`);
//  const priceElement = adForm.querySelector(`#price`);
const roomsElement = adForm.querySelector(`#room_number`);
const capacityElement = adForm.querySelector(`#capacity`);

let isPageActive = false;

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


const addPinEvent = (pinElement, bookingItem) => {
  pinElement.addEventListener(`click`, function () {
    map.appendChild(renderCard(bookingItem));

  });
};

const renderPin = function (bookingItem) {
  const pinElement = pinTemplate.cloneNode(true);
  const pinElementImg = pinElement.querySelector(`img`);

  pinElement.style.top = `${bookingItem.location.y}px`;
  pinElement.style.left = `${bookingItem.location.x}px`;
  pinElementImg.setAttribute(`src`, `${bookingItem.author.avatar}`);
  pinElementImg.setAttribute(`alt`, `${bookingItem.offer.title}`);

  addPinEvent(pinElement, bookingItem);

  return pinElement;
};


const OffetType = {
  palace: `Дворец`,
  flat: `Квартира`,
  house: `Дом`,
  bungalow: `Бунгало`
};

const getRenderFeature = function (featureElement, bookingItem, cardElement) {
  while (featureElement.firstChild) {
    featureElement.removeChild(featureElement.firstChild);
  }
  for (let i = 0; i < bookingItem.offer.features.length; i++) {
    cardElement.querySelector(`.popup__features`).appendChild(document.createElement(`li`)).classList.add(`popup__feature`, `popup__feature--${bookingItem.offer.features[i]}`);
  }
};

const getRenderPhotos = function (photoElement, bookingItem, cardElement) {
  while (photoElement.firstChild) {
    photoElement.removeChild(photoElement.firstChild);
  }

  for (let i = 0; i < bookingItem.offer.photos.length; i++) {
    const img = document.createElement(`img`);
    img.src = `${bookingItem.offer.photos[i]}`;
    img.alt = `Фото жилья`;
    img.width = 45;
    img.height = 40;
    cardElement.querySelector(`.popup__photos`).appendChild(img).classList.add(`popup__photo`);
  }
};

let cardElement = null;

const closePopup = () => {
  if (cardElement !== null) {
    cardElement.remove();
    cardElement = null;
  }
};

const renderCard = function (bookingItem) {
  closePopup();
  cardElement = cardTemplate.cloneNode(true);
  const featureElement = cardElement.querySelector(`.popup__features`);
  const photoElement = cardElement.querySelector(`.popup__photos`);
  const buttonClose = cardElement.querySelector(`.popup__close`);


  cardElement.querySelector(`.popup__title`).textContent = `${bookingItem.offer.title}`;
  cardElement.querySelector(`.popup__text--address`).textContent = `${bookingItem.offer.address}`;
  cardElement.querySelector(`.popup__text--price`).textContent = `${bookingItem.offer.price} ₽/ночь`;
  cardElement.querySelector(`.popup__type`).textContent = OffetType[`${bookingItem.offer.type}`];
  cardElement.querySelector(`.popup__text--capacity`).textContent = `${bookingItem.offer.rooms} комнаты для ${bookingItem.offer.guests} гостей`;
  cardElement.querySelector(`.popup__text--time`).textContent = `Заезд после ${bookingItem.offer.checkin}, выезд до ${bookingItem.offer.checkout}`;
  cardElement.querySelector(`.popup__description`).textContent = `${bookingItem.offer.description}`;

  getRenderFeature(featureElement, bookingItem, cardElement);
  getRenderPhotos(photoElement, bookingItem, cardElement);

  cardElement.querySelector(`.popup__avatar`).setAttribute(`src`, `${bookingItem.author.avatar}`);

  buttonClose.addEventListener('click', function () {
    closePopup();
  });

  return cardElement;
};

const renderPins = function (bookings) {
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < bookings.length; i++) {
    fragment.appendChild(renderPin(bookings[i]));
  }

  mapPins.appendChild(fragment);
};

const getAddres = function () {
  const valueX = mapPinMain.offsetLeft + Math.floor(MainPinSize.WIDTH / 2);
  const valueY = mapPinMain.offsetTop + Math.floor((!isPageActive ? MainPinSize.HEIGHT / 2 : MainPinSize.HEIGHT + MainPinSize.AFTER));

  return {valueX, valueY};
};

const setAddres = function (valueX, valueY) {
  addressInput.value = `${valueX}, ${valueY}`;
};

const updateAddress = function () {
  const address = getAddres();
  setAddres(address.valueX, address.valueY);
};

const changeElementsState = function () {

  if (isPageActive) {
    map.classList.remove(`map--faded`);
    adForm.classList.remove(`ad-form--disabled`);
  } else {
    map.classList.add(`map--faded`);
    adForm.classList.add(`ad-form--disabled`);
  }

  adFormFieldset.forEach(function (el) {
    el.disabled = !isPageActive;
  });
};

const validateTitle = function () {
  let valueLength = titleElement.value.length;
  let message = ``;

  if (valueLength < titleLength.MIN) {
    message = `Ещё ` + `${(titleLength.MIN - valueLength)}` + ` симв.`;
  } else if (valueLength > titleLength.MAX) {
    message = `Удалите лишние` + `${(valueLength - titleLength.MAX)}` + `симв.`;
  }

  titleElement.setCustomValidity(message);
};

const Rooms = {
  ONE: 1,
  TWO: 2,
  THREE: 3,
  HUNDRED: 100
};

const Capacity = {
  ONE: 1,
  TWO: 2,
  THREE: 3,
  NOTFORGUEST: 0
};

const isRoomCapacityValid = function (roomsValue, capacityValue) {
  let isValid = false;
  if (roomsValue === Rooms.ONE && capacityValue === Capacity.ONE) {
    isValid = true;
  } else if (roomsValue === Rooms.TWO && (capacityValue === Capacity.ONE || capacityValue === Capacity.TWO)) {
    isValid = true;
  } else if (roomsValue === Rooms.THREE && (capacityValue === Capacity.ONE || capacityValue === Capacity.TWO || capacityValue === Capacity.THREE)) {
    isValid = true;
  } else if (roomsValue === Rooms.HUNDRED && capacityValue === Capacity.NOTFORGUEST) {
    isValid = true;
  }
  return isValid;
};

const validateRoomsCapacity = function () {
  const roomsValue = parseInt(roomsElement.value, 10);
  const capacityValue = parseInt(capacityElement.value, 10);

  const isValid = isRoomCapacityValid(roomsValue, capacityValue);

  const roomsMessage = isValid ? `` : `Не верное колличество комнат`;
  roomsElement.setCustomValidity(roomsMessage);

  const capacityMessage = isValid ? `` : `Не верное колличество гостей`;
  capacityElement.setCustomValidity(capacityMessage);

};

const validateForm = function () {
  validateRoomsCapacity();
  adForm.reportValidity();
};

const addFormEvents = function () {
  adForm.addEventListener(`input`, function (evt) {
    switch (evt.target.id) {
      case titleElement.id:
        validateTitle();
        break;
    }
    adForm.reportValidity();
  });
};

adForm.addEventListener(`change`, function (evt) {
  switch (evt.target.id) {
    case roomsElement.id:
      validateRoomsCapacity();
      break;
    case capacityElement.id:
      validateRoomsCapacity();
      break;
  }
  adForm.reportValidity();
});

const addMapPinEvent = function () {
  mapPinMain.addEventListener(`mousedown`, function (evt) {
    if (evt.which === mouseButton.left) {
      activete();
      render();
    }
  });

  mapPinMain.addEventListener(`keydown`, function (evt) {
    if (evt.key === keyboardButtons.Enter) {
      activete();
      render();
    }
  });
};

const render = function () {
  const bookings = getBookings();
  renderPins(bookings);
};

const activete = function () {
  isPageActive = true;
  changeElementsState();
  updateAddress();
};

const deactivate = function () {
  isPageActive = false;
  changeElementsState();
  updateAddress();
};

const start = function () {
  deactivate();
  addMapPinEvent();
  addFormEvents();
  validateForm();
};

start();
