'use strict';

const UrlData = {
  LOAD: `https://21.javascript.pages.academy/keksobooking/data`,
  SAVE: `https://21.javascript.pages.academy/keksobooking`
};

const getXhr = (onSuccess, onError) => {
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

const load = (onSuccess, onError) => {
  const xhr = getXhr(onSuccess, onError);

  xhr.open(`GET`, UrlData.LOAD);
  xhr.send();
};

const update = (onSuccess, onError, data) => {
  const xhr = getXhr(onSuccess, onError);

  xhr.open(`POST`, UrlData.SAVE);
  xhr.send(data);
};

window.server = {
  load,
  update
};

