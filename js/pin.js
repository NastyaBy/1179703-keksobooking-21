'use strict';

const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);

const getElement = (bookingItem) => {
  const {
    location: {x, y},
    author: {avatar},
    offer: {title}} = bookingItem;

  const pinElement = pinTemplate.cloneNode(true);
  const pinElementImg = pinElement.querySelector(`img`);

  pinElement.style.top = `${y}px`;
  pinElement.style.left = `${x}px`;
  pinElementImg.setAttribute(`src`, `${avatar}`);
  pinElementImg.setAttribute(`alt`, `${title}`);

  return pinElement;
};

window.pin = {
  getElement
};
