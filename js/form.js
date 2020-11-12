'use strict';

const FILE_TYPES = [`jpg`, `jpeg`, `png`];
const DEFAULT_AVATAR_IMAGE = `img/muffin-grey.svg`;

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
const avatarLoad = adForm.querySelector(`#avatar`);
const avatarPreviewImg = adForm.querySelector(`.ad-form-header__preview img`);
const adPicLoad = adForm.querySelector(`#images`);
const adPicPreview = adForm.querySelector(`.ad-form__photo`);


const successTemplate = document.querySelector(`#success`).content.querySelector(`.success`);
const errorTemplate = document.querySelector(`#error`).content.querySelector(`.error`);

const TitleLength = {
  MIN: 30,
  MAX: 100
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

let modalMessage = null;

const addFormEvent = () => {
  adForm.addEventListener(`change`, (evt) => {
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

const loadImage = (evt, cb) => {
  const file = evt.target.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((ending) => {
    return fileName.endsWith(ending);
  });

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener(`load`, () => {
      cb(reader.result);
    });
    reader.readAsDataURL(file);
  }
};

const loadAvatarImage = (result) => {
  avatarPreviewImg.src = result;
};

const loadAdPicImage = (result) => {
  adPicPreview.style.backgroundImage = `url(${result})`;
  adPicPreview.style.backgroundSize = `contain`;
  adPicPreview.style.backgroundRepeat = `no-repeat`;
  adPicPreview.style.backgroundPositionX = `50%`;
  adPicPreview.style.backgroundPositionY = `50%`;
};

const addLoadImagesEvents = () => {
  avatarLoad.addEventListener(`change`, (evt) => {
    loadImage(evt, loadAvatarImage);
  });
  adPicLoad.addEventListener(`change`, (evt) => {
    loadImage(evt, loadAdPicImage);
  });
};

const validateForm = () => {
  validateRoomsCapacity();
  validateTypePrice();
  adForm.reportValidity();
};

const addTitleEvent = () => {
  titleElement.addEventListener(`input`, () => {
    validateTitle();
  });
};

const addEvents = () => {
  addFormEvent();
  addTitleEvent();
};

const setAddres = (valueX, valueY) => {
  addressInput.value = `${valueX}, ${valueY}`;
};

const changeState = () => {

  if (window.map.getIsPageActive()) {
    adForm.classList.remove(`ad-form--disabled`);
  } else {
    adForm.classList.add(`ad-form--disabled`);
  }

  adFormFieldset.forEach((el) => {
    el.disabled = !window.map.getIsPageActive();
  });
};

const initialize = () => {
  changeState();
  addEvents();
  addLoadImagesEvents();
  validateForm();
};

const validateTitle = () => {
  const valueLength = titleElement.value.length;
  let message = ``;

  if (valueLength < TitleLength.MIN) {
    message = `Ещё ` + `${(TitleLength.MIN - valueLength)}` + ` симв.`;
  } else if (valueLength > TitleLength.MAX) {
    message = `Удалите лишние` + `${(valueLength - TitleLength.MAX)}` + `симв.`;
  }

  titleElement.setCustomValidity(message);
  titleElement.reportValidity();
};

const rewritingPlaceholder = () => {
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

const isPriceValid = (typeValue, priceValue) => {
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


const isRoomCapacityValid = (roomsValue, capacityValue) => {
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

const validateTypePrice = () => {
  const typeValue = typeElement.value;
  const priceValue = parseInt(priceElement.value, 10);

  const isValid = isPriceValid(typeValue, priceValue);

  const typeMessage = isValid ? `` : `Не верная цена`;
  typeElement.setCustomValidity(typeMessage);
};

const validateRoomsCapacity = () => {
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

const closeModalMessage = () => {
  if (modalMessage) {
    modalMessage.remove();
    modalMessage = null;
    document.removeEventListener(`click`, onDocumentClick);
    document.removeEventListener(`keydown`, onDocumentKeyDown);
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

const onError = () => {
  modalMessage = errorTemplate.cloneNode(true);
  document.querySelector(`main`).appendChild(modalMessage);
  addModalMessageEvents();
};

const resetForm = () => {
  window.map.reset();
  window.popup.closeCardElement();
  loadAvatarImage(DEFAULT_AVATAR_IMAGE);
  adPicPreview.style.backgroundImage = ``;
  adForm.reset();
  window.moving.reset();
  adForm.classList.add(`ad-form--disabled`);
  changeState();
};

window.form = {
  changeState,
  initialize,
  setAddres
};
