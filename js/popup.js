'use strict';
(() => {
  const cardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);

  const OffetType = {
    palace: `Дворец`,
    flat: `Квартира`,
    house: `Дом`,
    bungalow: `Бунгало`
  };

  const ESCAPE = `Escape`;

  let cardElement = null;

  const close = () => {
    if (cardElement !== null) {
      cardElement.remove();
      cardElement = null;
      document.removeEventListener(`keydown`, onDocumentKeyDown);
    }
  };

  const onDocumentKeyDown = (evt) => {
    if (evt.key === ESCAPE) {
      close();
    }
  };

  const getElement = function (bookingItem) {
    close();
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
      close();
    });

    return cardElement;
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

  window.popup = {
    getElement
  };
})();
