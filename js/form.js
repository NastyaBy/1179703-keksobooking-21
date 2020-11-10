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
  const timeInSelect = adForm.querySelector(`#timein`);
  const timeOutSelect = adForm.querySelector(`#timeout`);
  // const description = adForm.querySelector(`#description`);
  // const adPhoto = adForm.querySelector(`#images`);
  // const adAvatar = adForm.querySelector(`#avatar`);
  // const featuresCheckboxes = adForm.querySelectorAll(`.feature__checkbox`);

  const successTemplate = document.querySelector(`#success`).content.querySelector(`.success`);
  const errorTemplate = document.querySelector(`#error`).content.querySelector(`.error`);

  let modalMessage = null;

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
        case timeInSelect.id:
          changeTimeOutValue(evt.target.value);
          break;
        case timeOutSelect.id:
          changeTimeInValue(evt.target.value);
          break;
      }
      adForm.reportValidity();
    });

    adForm.addEventListener(`submit`, (evt) => {
      evt.preventDefault();
      window.server.update(onSuccess, onError, new FormData(adForm));
    });

    adForm.querySelector(`.ad-form__reset`).addEventListener(`click`, (evt) => {
      evt.preventDefault();
      resetForm();
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

  const changeTimeOutValue = (value) => {
    timeOutSelect.value = value;
  };

  const changeTimeInValue = (value) => {
    timeInSelect.value = value;
  };

  changeTimeOutValue(timeInSelect.value);


  // 6.12

  // const resetForm = adForm.querySelector(`.ad-form__reset`);
  // const submitForm = adForm.querySelector(`.ad-form__submit`);

  // const ESCAPE = `Escape`;

  // const MouseButton = {
  //   BASIC: 0
  // };

  const newErrMessage = errorTemplate.cloneNode(true);

  // const errorButton = newErrMessage.querySelector(`button`);

  // let errorFragment = null;

  // const onErrorButtonClick = () => {
  //   if (errorFragment) {
  //     newErrMessage.remove();
  //     errorButton.removeEventListener(`click`, onErrorButtonClick);
  //     errorFragment = null;
  //   }
  // };

  const closeModalMessage = () => {
    if (modalMessage) {
      modalMessage.remove();
      modalMessage = null;
      document.addEventListener(`click`, onDocumentClick);
      document.addEventListener(`keydown`, onDocumentKeyDown);
    }
  };

  const onDocumentClick = () => {
    closeModalMessage();
  };

  const onDocumentKeyDown = () => {
    closeModalMessage();
  };

  const addModalMessageEvents = () => {
    document.addEventListener(`click`, onDocumentClick);
    document.addEventListener(`keydown`, onDocumentKeyDown);
  };

  const onSuccess = () => {
    modalMessage = successTemplate.cloneNode(true);
    document.querySelector(`main`).appendChild(modalMessage);
    resetForm();
    addModalMessageEvents();
  };

  const onError = (errorText) => {
    modalMessage = errorTemplate.cloneNode(true);
    newErrMessage.querySelector(`.error__message`).textContent = errorText;
    document.querySelector(`main`).appendChild(modalMessage);
    addModalMessageEvents();
  };

  const resetForm = () => {
    window.map.reset();
    window.popup.close();
    adForm.reset();
    window.moving.reset();
    adForm.classList.add(`ad-form--disabled`);
    changeState();
  };

  window.form = {
    changeState,
    initialize,
    setAddres,
    adForm
  };
})();
