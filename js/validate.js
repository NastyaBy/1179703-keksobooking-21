'use strict';
(() => {
  const titleLength = {
    MIN: 30,
    MAX: 100
  };

  const validateTitle = function () {
    let valueLength = window.form.titleElement.value.length;
    let message = ``;

    if (valueLength < titleLength.MIN) {
      message = `Ещё ` + `${(titleLength.MIN - valueLength)}` + ` симв.`;
    } else if (valueLength > titleLength.MAX) {
      message = `Удалите лишние` + `${(valueLength - titleLength.MAX)}` + `симв.`;
    }

    window.form.titleElement.setCustomValidity(message);
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
      window.form.priceElement.setAttribute(`placeholder`, `${minPrice.bungalow}`);
      window.form.priceElement.setAttribute(`min`, `${minPrice.bungalow}`);
    } else if (typeValue === typeOffer.flat) {
      window.form.priceElement.setAttribute(`placeholder`, `${minPrice.flat}`);
      window.form.priceElement.setAttribute(`min`, `${minPrice.bungalow}`);
    } else if (typeValue === typeOffer.house) {
      window.form.priceElement.setAttribute(`placeholder`, `${minPrice.house}`);
      window.form.priceElement.setAttribute(`min`, `${minPrice.bungalow}`);
    } else if (typeValue === typeOffer.palace) {
      window.form.priceElement.setAttribute(`placeholder`, `${minPrice.palace}`);
      window.form.priceElement.setAttribute(`min`, `${minPrice.bungalow}`);
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

  const validateTypePrice = function () {
    const typeValue = window.form.typeElement.value;
    const priceValue = parseInt(window.form.priceElement.value, 10);

    const isValid = isPriceValid(typeValue, priceValue);

    const typeMessage = isValid ? `` : `Не верная цена`;
    window.form.typeElement.setCustomValidity(typeMessage);
  };

  const validateRoomsCapacity = function () {
    const roomsValue = parseInt(window.form.roomsElement.value, 10);
    const capacityValue = parseInt(window.form.capacityElement.value, 10);

    const isValid = isRoomCapacityValid(roomsValue, capacityValue);

    const roomsMessage = isValid ? `` : `Не верное колличество комнат`;
    window.form.roomsElement.setCustomValidity(roomsMessage);

    const capacityMessage = isValid ? `` : `Не верное колличество гостей`;
    window.form.capacityElement.setCustomValidity(capacityMessage);

  };

  window.validate = {
    rewritingPlaceholder,
    validateTitle,
    validateTypePrice,
    validateRoomsCapacity
  };
})();
