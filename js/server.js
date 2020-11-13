'use strict';

const UrlData = {
  LOAD: `https://21.javascript.pages.academy/keksobooking/data`,
  SAVE: `https://21.javascript.pages.academy/keksobooking`
};

const ErrorXhr = {
  OK: 200,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404
};

const getXhr = (onSuccess, onError) => {
  const xhr = new XMLHttpRequest();
  xhr.responseType = `json`;

  xhr.addEventListener(`load`, () => {
    let error;
    switch (xhr.status) {
      case ErrorXhr.OK:
        onSuccess(xhr.response);
        break;

      case ErrorXhr.BAD_REQUEST:
        error = `Неверный запрос`;
        break;
      case ErrorXhr.UNAUTHORIZED:
        error = `Пользователь не авторизован`;
        break;
      case ErrorXhr.NOT_FOUND:
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

