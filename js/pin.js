'use strict';

(() => {
  const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);

  const getElement = function (bookingItem) {
    const pinElement = pinTemplate.cloneNode(true);
    const pinElementImg = pinElement.querySelector(`img`);

    pinElement.style.top = `${bookingItem.location.y}px`;
    pinElement.style.left = `${bookingItem.location.x}px`;
    pinElementImg.setAttribute(`src`, `${bookingItem.author.avatar}`);
    pinElementImg.setAttribute(`alt`, `${bookingItem.offer.title}`);

    return pinElement;
  };

  window.pin = {
    getElement
  };

})();
