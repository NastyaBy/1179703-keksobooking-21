'use strict';
(() => {
  window.form.adForm = document.querySelector(`.ad-form`);
  const adFormFieldset = document.querySelectorAll(`.ad-form fieldset`);
  window.form.titleElement = window.form.adForm.querySelector(`#title`);
  window.form.typeElement = window.form.adForm.querySelector(`#type`);
  window.form.priceElement = window.form.adForm.querySelector(`#price`);
  window.form.roomsElement = window.form.adForm.querySelector(`#room_number`);
  window.form.capacityElement = window.form.adForm.querySelector(`#capacity`);

  const publishForm = () => {
    window.form.adForm.addEventListener(`change`, function (evt) {
      switch (evt.target.id) {
        case window.form.roomsElement.id:
          window.validate.validateRoomsCapacity();
          break;
        case window.form.capacityElement.id:
          window.validate.validateRoomsCapacity();
          break;
        case window.form.typeElement.id:
          window.validate.validateTypePrice();
          break;
        case window.form.priceElement.id:
          window.validate.validateTypePrice();
          break;
      }
      window.form.adForm.reportValidity();
    });
  };

  const validateForm = function () {
    window.validate.validateRoomsCapacity();
    window.validate.validateTypePrice();
    window.form.adForm.reportValidity();
  };

  const addFormEvents = function () {
    window.form.adForm.addEventListener(`input`, function (evt) {
      switch (evt.target.id) {
        case window.form.titleElement.id:
          window.validate.validateTitle();
          break;
      }
      window.form.adForm.reportValidity();
    });
  };


  let isPageActive = false;

  const changeElementsState = function () {

    if (isPageActive) {
      window.map.map.classList.remove(`map--faded`);
      window.form.adForm.classList.remove(`ad-form--disabled`);
    } else {
      window.map.map.classList.add(`map--faded`);
      window.form.adForm.classList.add(`ad-form--disabled`);
    }

    adFormFieldset.forEach(function (el) {
      el.disabled = !isPageActive;
    });
  };

  window.form = {
    changeElementsState,
    publishForm,
    validateForm,
    addFormEvents
  };
})();
