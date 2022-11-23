export const burgerApiUrl = "https://norma.nomoreparties.space/api/";

const checkResponse =(res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

export function getDatafromApi(burgerApiUrl) {
  return fetch(`${burgerApiUrl}ingredients`).then(checkResponse);
}

export function getOrderDatafromApi(burgerApiUrl, idArr) {
  return fetch(`${burgerApiUrl}orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ingredients: idArr,
    }),
  })
  .then(checkResponse);
}
