'use strict';

(() => {

  const UrlLoadData = `https://21.javascript.pages.academy/keksobooking/data`;
  const UrlSaveData = `https://21.javascript.pages.academy/keksobooking`;

  const getXhr = function (onSuccess, onError) {
    const xhr = new XMLHttpRequest();
    xhr.responseType = `json`;

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
    return xhr;
  };

  const load = function (onSuccess, onError) {
    const xhr = getXhr(onSuccess, onError);

    xhr.open(`GET`, UrlLoadData);
    xhr.send();
  };

  const update = function (onSuccess, onError, data) {
    const xhr = getXhr(onSuccess, onError);

    xhr.open(`POST`, UrlSaveData);
    xhr.send(data);
    // window.form.successMessage();
    // window.form.errorMessage();
  };


  window.server = {
    load,
    update
  };
})();
