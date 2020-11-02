'use strict';
(() => {

  const adForm = document.querySelector(`.ad-form`);
  const adFormFieldset = document.querySelectorAll(`.ad-form fieldset`);
  const titleElement = adForm.querySelector(`#title`);
  const typeElement = adForm.querySelector(`#type`);
  const priceElement = adForm.querySelector(`#price`);
  const roomsElement = adForm.querySelector(`#room_number`);
  const capacityElement = adForm.querySelector(`#capacity`);
  const addressInput = adForm.querySelector(`#address`);

  const addFormEvent = function () {
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
          rewritingPlaceholder();
          break;
        case priceElement.id:
          validateTypePrice();
          break;
      }
      adForm.reportValidity();
    });
  };

  const validateForm = function () {
    validateRoomsCapacity();
    validateTypePrice();
    adForm.reportValidity();
  };

  const addTitleEvent = function () {
    titleElement.addEventListener(`input`, function () {
      validateTitle();
      // adForm.reportValidity();
    });
  };

  const addEvents = function () {
    addFormEvent();
    addTitleEvent();
  };

  const setAddres = function (valueX, valueY) {
    addressInput.value = `${valueX}, ${valueY}`;
  };

  const changeState = function () {

    if (window.map.getIsPageActive()) {
      adForm.classList.remove(`ad-form--disabled`);
    } else {
      adForm.classList.add(`ad-form--disabled`);
    }

    adFormFieldset.forEach(function (el) {
      el.disabled = !window.map.getIsPageActive();
    });
  };

  const initialize = function () {
    changeState();
    addEvents();
    validateForm();
  };

  // валидвация

  const TitleLength = {
    MIN: 30,
    MAX: 100
  };

  const validateTitle = function () {
    let valueLength = titleElement.value.length;
    let message = ``;

    if (valueLength < TitleLength.MIN) {
      message = `Ещё ` + `${(TitleLength.MIN - valueLength)}` + ` симв.`;
    } else if (valueLength > TitleLength.MAX) {
      message = `Удалите лишние` + `${(valueLength - TitleLength.MAX)}` + `симв.`;
    }

    titleElement.setCustomValidity(message);
    titleElement.reportValidity();
  };

  const TypeOffer = {
    PALACE: `palace`,
    FLAT: `flat`,
    HOUSE: `house`,
    BUNGALOW: `bungalow`
  };

  const MinPrice = {
    PALACE: 10000,
    FLAT: 1000,
    HOUSE: 5000,
    BUNGALOW: 0
  };

  const rewritingPlaceholder = function () {
    const typeValue = typeElement.value;

    if (typeValue === TypeOffer.BUNGALOW) {
      priceElement.setAttribute(`placeholder`, `${MinPrice.BUNGALOW}`);
      priceElement.setAttribute(`min`, `${MinPrice.BUNGALOW}`);
    } else if (typeValue === TypeOffer.FLAT) {
      priceElement.setAttribute(`placeholder`, `${MinPrice.FLAT}`);
      priceElement.setAttribute(`min`, `${MinPrice.FLAT}`);
    } else if (typeValue === TypeOffer.HOUSE) {
      priceElement.setAttribute(`placeholder`, `${MinPrice.HOUSE}`);
      priceElement.setAttribute(`min`, `${MinPrice.HOUSE}`);
    } else if (typeValue === TypeOffer.PALACE) {
      priceElement.setAttribute(`placeholder`, `${MinPrice.PALACE}`);
      priceElement.setAttribute(`min`, `${MinPrice.PALACE}`);
    }
  };


  const isPriceValid = function (typeValue, priceValue) {
    let isValid = false;
    if (typeValue === TypeOffer.BUNGALOW && priceValue >= MinPrice.BUNGALOW) {
      isValid = true;
    } else if (typeValue === TypeOffer.FLAT && priceValue >= MinPrice.FLAT) {
      isValid = true;
    } else if (typeValue === TypeOffer.HOUSE && priceValue >= MinPrice.HOUSE) {
      isValid = true;
    } else if (typeValue === TypeOffer.PALACE && priceValue >= MinPrice.PALACE) {
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
    const typeValue = typeElement.value;
    const priceValue = parseInt(priceElement.value, 10);

    const isValid = isPriceValid(typeValue, priceValue);

    const typeMessage = isValid ? `` : `Не верная цена`;
    typeElement.setCustomValidity(typeMessage);
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

  const CheckInTime = {
    TWELVE: `12:00`,
    THIRTEEN: `13:00`,
    FOURTEEN: `14:00`
  }


  const stayTime = function () {
    const typeValue = typeElement.value;

    if (typeValue === CheckInTime.TWELVE) {


    } else if (typeValue === CheckInTime.THIRTEEN) {


    } else if (typeValue === CheckInTime.FOURTEEN) {


    }
  };


  window.form = {
    changeState,
    initialize,
    setAddres
  };
})();
