'use strict';

const cardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);

const OffetType = {
  palace: `Дворец`,
  flat: `Квартира`,
  house: `Дом`,
  bungalow: `Бунгало`
};

const ESCAPE = `Escape`;

let cardElement = null;

const closeCardElement = () => {
  if (cardElement !== null) {
    cardElement.remove();
    cardElement = null;
    document.removeEventListener(`keydown`, onDocumentKeyDown);
  }
};

const onDocumentKeyDown = (evt) => {
  if (evt.key === ESCAPE) {
    closeCardElement();
  }
};

const getElement = (bookingItem) => {
  const {
    offer: {title, address, price, type, rooms, guests, checkin, checkout, description, features, photos},
    author: {avatar}} = bookingItem;

  closeCardElement();
  cardElement = cardTemplate.cloneNode(true);
  const featureElement = cardElement.querySelector(`.popup__features`);
  const photoElement = cardElement.querySelector(`.popup__photos`);
  const buttonClose = cardElement.querySelector(`.popup__close`);

  cardElement.querySelector(`.popup__title`).textContent = `${title}`;
  cardElement.querySelector(`.popup__text--address`).textContent = `${address}`;
  cardElement.querySelector(`.popup__text--price`).textContent = `${price} ₽/ночь`;
  cardElement.querySelector(`.popup__type`).textContent = OffetType[`${type}`];
  cardElement.querySelector(`.popup__text--capacity`).textContent = `${rooms} комнаты для ${guests} гостей`;
  cardElement.querySelector(`.popup__text--time`).textContent = `Заезд после ${checkin}, выезд до ${checkout}`;
  cardElement.querySelector(`.popup__description`).textContent = `${description}`;

  getRenderFeature(featureElement, features);
  getRenderPhotos(photoElement, photos);

  cardElement.querySelector(`.popup__avatar`).setAttribute(`src`, `${avatar}`);

  document.addEventListener(`keydown`, onDocumentKeyDown);

  buttonClose.addEventListener(`click`, () => {
    closeCardElement();
  });

  return cardElement;
};

const getRenderFeature = (featureElement, features) => {
  featureElement.innerHTML = ``;

  for (let i = 0; i < features.length; i++) {
    const liElement = document.createElement(`li`);
    liElement.classList.add(`popup__feature`, `popup__feature--${features[i]}`);

    featureElement.appendChild(liElement);
  }
};

const getRenderPhotos = (photoElement, photos) => {
  const imgTemplate = photoElement.querySelector(`.popup__photo`);

  photoElement.innerHTML = ``;

  for (let i = 0; i < photos.length; i++) {
    const img = imgTemplate.cloneNode(true);
    img.src = `${photos[i]}`;

    photoElement.appendChild(img);
  }
};

window.popup = {
  getElement,
  closeCardElement
};
