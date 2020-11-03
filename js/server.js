'use strict';

(() => {

  const URL = `https://21.javascript.pages.academy/keksobooking/data`;

  const load = function (onSuccess, onError) {
    const xhr = new XMLHttpRequest();
    xhr.responseType = `json`;

    xhr.open(`GET`, URL);

    xhr.addEventListener(`load`, () => {
      onSuccess(xhr.response);
    });

    xhr.addEventListener(`error`, () => {
      onError(`Произошла ошибка соеденения. Проверьте соеденение с интернетом`);
    });

    xhr.send();
  };

  window.server = {
    load
  };
})();
