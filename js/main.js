'use strict';

//  const mapFilters = document.querySelector(`.map__filters`);

let isPageActive = false;

const deactivate = function () {
  isPageActive = false;
  window.form.changeElementsState();
  window.map.updateAddress();
};

const start = function () {
  deactivate();
  window.pin.addMapPinEvent();
  window.form.addFormEvents();
  window.form.validateForm();
};

start();
