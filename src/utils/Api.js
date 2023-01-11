import { getCookie } from "./cookie";

export const burgerApiUrl = "https://norma.nomoreparties.space/api/";

const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};

const request = (url, options) => {
  return fetch(url, options).then(checkResponse);
};

export function getDatafromApi(burgerApiUrl) {
  return request(`${burgerApiUrl}ingredients`);
}

export function getOrderDatafromApi(burgerApiUrl, idArr) {
  return request(`${burgerApiUrl}orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ingredients: idArr,
    }),
  });
}

export const sendRegistrationUsertoApi = (burgerApiUrl, data) => {
  return request(`${burgerApiUrl}auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: data.email,
      password: data.password,
      name: data.name,
    }),
  });
};

export const setloginUserApi = (burgerApiUrl, data) => {
  return request(`${burgerApiUrl}auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: data.email,
      password: data.password,
    }),
  });
};

export const passwordForgotApi = (burgerApiUrl, data) => {
  return request(`${burgerApiUrl}password-reset`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: data,
    }),
  });
};

export const passwordResetApi = (burgerApiUrl, data) => {
  return request(`${burgerApiUrl}password-reset/reset`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      password: data.password,
      token: data.token,
    }),
  });
};

export const getUserApi = (burgerApiUrl) => {
  return request(`${burgerApiUrl}auth/user`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getCookie("accessToken"),
    },
  });
};

export const changeUserDataApi = (burgerApiUrl, data) => {
  return request(`${burgerApiUrl}auth/user`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getCookie("accessToken"),
    },
    body: JSON.stringify({
      name: data.name,
      email: data.email,
    }),
  });
};

export const refreshTokenApi = (burgerApiUrl) => {
  return request(`${burgerApiUrl}auth/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: getCookie("refreshToken"),
    }),
  });
};

export const logoutUserApi = (burgerApiUrl) => {
  return request(`${burgerApiUrl}auth/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: getCookie("refreshToken"),
    }),
  });
};
