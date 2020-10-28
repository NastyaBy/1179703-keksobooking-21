'use strict';

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

const mainPinSize = {
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
const typeElement = adForm.querySelector(`#type`);
const priceElement = adForm.querySelector(`#price`);
const roomsElement = adForm.querySelector(`#room_number`);
const capacityElement = adForm.querySelector(`#capacity`);

let isPageActive = false;

const addPinEvent = (pinElement, bookingItem) => {
  pinElement.addEventListener(`click`, function () {
    map.appendChild(showPopup(bookingItem));
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

const getRenderFeature = function (featureElement, features) {
  featureElement.innerHTML = ``;

  for (let i = 0; i < features.length; i++) {
    const liElement = document.createElement(`li`);
    liElement.classList.add(`popup__feature`, `popup__feature--${features[i]}`);

    featureElement.appendChild(liElement);
  }
};

const getRenderPhotos = function (photoElement, photos) {
  const imgTemplate = photoElement.querySelector(`.popup__photo`);

  photoElement.innerHTML = ``;

  for (let i = 0; i < photos.length; i++) {
    const img = imgTemplate.cloneNode(true);
    img.src = `${photos[i]}`;

    photoElement.appendChild(img);
  }

};

let cardElement = null;

const closePopup = () => {
  if (cardElement !== null) {
    cardElement.remove();
    cardElement = null;
    document.removeEventListener(`keydown`, onDocumentKeyDown);
  }
};

const showPopup = function (bookingItem) {
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

  getRenderFeature(featureElement, bookingItem.offer.features);
  getRenderPhotos(photoElement, bookingItem.offer.photos);

  cardElement.querySelector(`.popup__avatar`).setAttribute(`src`, `${bookingItem.author.avatar}`);

  document.addEventListener(`keydown`, onDocumentKeyDown);

  buttonClose.addEventListener(`click`, function () {
    closePopup();
  });

  return cardElement;
};

const onDocumentKeyDown = (evt) => {
  if (evt.key === keyboardButtons.Escape) {
    closePopup();
  }
};

const renderPins = function (bookings) {
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < bookings.length; i++) {
    fragment.appendChild(renderPin(bookings[i]));
  }

  mapPins.appendChild(fragment);
};

const getAddres = function () {
  const valueX = mapPinMain.offsetLeft + Math.floor(mainPinSize.WIDTH / 2);
  const valueY = mapPinMain.offsetTop + Math.floor((!isPageActive ? mainPinSize.HEIGHT / 2 : mainPinSize.HEIGHT + mainPinSize.AFTER));

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

const typeOffer = {
  palace: `palace`,
  flat: `flat`,
  house: `house`,
  bungalow: `bungalow`
};

const minPrice = {
  palace: 10000,
  flat: 1000,
  house: 5000,
  bungalow: 0
};

const rewritingPlaceholder = function (typeValue) {
  if (typeValue === typeOffer.bungalow) {
    priceElement.setAttribute(`placeholder`, `${minPrice.bungalow}`);
    priceElement.setAttribute(`min`, `${minPrice.bungalow}`);
  } else if (typeValue === typeOffer.flat) {
    priceElement.setAttribute(`placeholder`, `${minPrice.flat}`);
    priceElement.setAttribute(`min`, `${minPrice.bungalow}`);
  } else if (typeValue === typeOffer.house) {
    priceElement.setAttribute(`placeholder`, `${mapPins.house}`);
    priceElement.setAttribute(`min`, `${minPrice.bungalow}`);
  } else if (typeValue === typeOffer.palace) {
    priceElement.setAttribute(`placeholder`, `${mapPins.palace}`);
    priceElement.setAttribute(`min`, `${minPrice.bungalow}`);
  }
};

const isPriceValid = function (typeValue, priceValue) {
  let isValid = false;
  if (typeValue === typeOffer.bungalow && priceValue >= minPrice.bungalow) {
    isValid = true;
  } else if (typeValue === typeOffer.flat && priceValue >= minPrice.flat) {
    isValid = true;
  } else if (typeValue === typeOffer.house && priceValue >= mapPins.house) {
    isValid = true;
  } else if (typeValue === typeOffer.palace && priceValue >= mapPins.palace) {
    isValid = true;
  }
  return isValid;
};

const validateTypePrice = function () {
  const typeValue = typeElement.value;
  const priceValue = parseInt(priceElement.value, 10);

  const isValid = isPriceValid(typeValue, priceValue);

  const typeMessage = isValid ? `` : `Не верная цена`;
  typeElement.setCustomValidity(typeMessage);
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
  validateTypePrice();
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
const publishForm = () => {
  adForm.addEventListener(`change`, function (evt) {
    switch (evt.target.id) {
      case roomsElement.id:
        validateRoomsCapacity();
        break;
      case capacityElement.id:
        validateRoomsCapacity();
        break;
      case typeElement.id:
        validateTypePrice();
        break;
      case priceElement.id:
        validateTypePrice();
        break;
    }
    adForm.reportValidity();
  });
};


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
  const bookings = window.data.getBookings();
  renderPins(bookings);
};

const activete = function () {
  isPageActive = true;
  changeElementsState();
  updateAddress();
  rewritingPlaceholder();
  publishForm();
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
