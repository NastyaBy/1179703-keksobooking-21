'use strict';

const titleLength = {
  MIN: 30,
  MAX: 100
};

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


const changeElementsState = function () {

  if (isPageActive) {
    window.map.map.classList.remove(`map--faded`);
    adForm.classList.remove(`ad-form--disabled`);
  } else {
    window.map.map.classList.add(`map--faded`);
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
    priceElement.setAttribute(`placeholder`, `${minPrice.house}`);
    priceElement.setAttribute(`min`, `${minPrice.bungalow}`);
  } else if (typeValue === typeOffer.palace) {
    priceElement.setAttribute(`placeholder`, `${minPrice.palace}`);
    priceElement.setAttribute(`min`, `${minPrice.bungalow}`);
  }
};

const isPriceValid = function (typeValue, priceValue) {
  let isValid = false;
  if (typeValue === typeOffer.bungalow && priceValue >= minPrice.bungalow) {
    isValid = true;
  } else if (typeValue === typeOffer.flat && priceValue >= minPrice.flat) {
    isValid = true;
  } else if (typeValue === typeOffer.house && priceValue >= minPrice.house) {
    isValid = true;
  } else if (typeValue === typeOffer.palace && priceValue >= minPrice.palace) {
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

const deactivate = function () {
  isPageActive = false;
  changeElementsState();
  window.map.updateAddress();
};

const start = function () {
  deactivate();
  window.pin.addMapPinEvent();
  addFormEvents();
  validateForm();
};

start();
