'use strict';

(() => {
  window.data = {};

  window.data.OFFER_TITLE = [`Квартира на проспекте`, `Апартаменты в цетре`, `Просторная квартира`, `Стильные апартаменты`, `Ваш дом`];
  window.data.OFFER_TYPE = [`palace`, `flat`, `house`, `bungalow`];
  window.data.OFFER_CHECKES = [`12:00`, `13:00`, `14:00`];
  window.data.OFFER_FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
  window.data.OFFER_DESCRIPTION = [`Во всех апартаментах есть полностью оборудованная кухня с микроволновой печью, гостиный уголок, телевизор с плоским экраном, стиральная машина и собственная ванная комната с душем и феном.`, `Есть холодильник, духовка, плита и чайник.`];
  window.data.OFFER_PHOTOS = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];
  window.data.SIZE_ARRAY = [`1`, `2`, `3`, `4`, `5`, `6`, `7`, `8`];

  window.data.titleLength = {
    MIN: 30,
    MAX: 100
  };

  window.data.mouseButton = {
    left: 1
  };

  window.data.keyboardButtons = {
    Enter: `Enter`,
    Escape: `Escape`
  };

  window.data.mainPinSize = {
    WIDTH: 65,
    HEIGHT: 65,
    AFTER: 22
  };

  window.data.pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
  window.data.cardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);
  window.data.mapPins = document.querySelector(`.map__pins`);

  window.data.map = document.querySelector(`.map`);
  window.data.mapPinMain = document.querySelector(`.map__pin--main`);
  window.data.mapFilters = document.querySelector(`.map__filters`);
  window.data.adForm = document.querySelector(`.ad-form`);
  window.data.adFormFieldset = document.querySelectorAll(`.ad-form fieldset`);
  window.data.addressInput = window.data.adForm.querySelector(`#address`);
  window.data.titleElement = window.data.adForm.querySelector(`#title`);
  window.data.typeElement = window.data.adForm.querySelector(`#type`);
  window.data.priceElement = window.data.adForm.querySelector(`#price`);
  window.data.roomsElement = window.data.adForm.querySelector(`#room_number`);
  window.data.capacityElement = window.data.adForm.querySelector(`#capacity`);

})();
