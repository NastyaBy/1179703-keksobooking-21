'use strict';
(() => {

  const publishForm = () => {
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
          break;
        case priceElement.id:
          validateTypePrice();
          break;
      }
      adForm.reportValidity();
    });
  };

  window.form = {
    publishForm
  };
})();
