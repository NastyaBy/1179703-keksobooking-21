'use strict';

(() => {

  const UrlLoadData = `https://21.javascript.pages.academy/keksobooking/data`;
  const UrlSaveData = `https://21.javascript.pages.academy/keksobooking`;

  const errorTemplate = document.querySelector(`#error`).content.querySelector(`.error`);
  const successTemplate = document.querySelector(`#success`).content.querySelector(`.success`);

  const errorMessage = (errorText) => {
    const errorFragment = document.createDocumentFragment();
    const newErrMessage = errorTemplate.cloneNode(true);
    newErrMessage.querySelector(`.error__message`).textContent = errorText;
    errorFragment.appendChild(newErrMessage);
    window.map.mapPins.appendChild(errorFragment);
    const errorButton = newErrMessage.querySelector(`button`);
    const onErrorButtonClick = () => {
      newErrMessage.remove();
      errorButton.removeEventListener(`click`, onErrorButtonClick);
    };
    errorButton.addEventListener(`click`, onErrorButtonClick);
  };

  const successMessage = () => {
    const successFragment = document.createDocumentFragment();
    const newSuccessMessage = successTemplate.cloneNode(true);
    successFragment.appendChild(newSuccessMessage);
    document.querySelector(`main`).appendChild(successFragment);
    window.moving.initialize();
    window.form.adForm.reset();
    const outOfSuccessMessage = () => {
      return (evt) => {
        if (evt.code === `Escape` || evt.button === 0) {
          newSuccessMessage.remove();
          document.removeEventListener(`click`, outOfSuccessMessage());
          document.removeEventListener(`keydown`, outOfSuccessMessage());
        }
      };
    };
    document.addEventListener(`click`, outOfSuccessMessage());
    document.addEventListener(`keydown`, outOfSuccessMessage());
  };


  const load = function (onSuccess, onError) {
    const xhr = new XMLHttpRequest();
    xhr.responseType = `json`;

    xhr.open(`GET`, UrlLoadData);

    xhr.addEventListener(`load`, () => {
      let error;
      switch (xhr.status) {
        case 200:
          onSuccess(xhr.response);
          break;

        case 400:
          error = `Неверный запрос`;
          break;
        case 401:
          error = `Пользователь не авторизован`;
          break;
        case 404:
          error = `Ничего не найдено`;
          break;

        default:
          error = `Cтатус ответа: : ` + xhr.status + ` ` + xhr.statusText;
      }

      if (error) {
        onError(error);
      }
    });

    xhr.addEventListener(`error`, () => {
      onError(`Произошла ошибка соединения`);
    });

    xhr.send();
  };

  const getServerRequest = function () {
    const xhr = new XMLHttpRequest();
    xhr.responseType = `json`;

    xhr.open(`POST`, UrlSaveData);
    successMessage();
    errorMessage();
    // new FormData(window.form.adForm);
  };


  window.server = {
    load,
    getServerRequest,

  };
})();
