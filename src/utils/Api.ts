import { getCookie } from "./cookie";

export const burgerApiUrl = "https://norma.nomoreparties.space/api/";

interface IRes {
  ok: boolean;
  status: number;
  json(): any;
  success?: boolean;
}

const checkResponse = (res: IRes) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};

function request(burgerApiUrl: string, options?: object) {
  return fetch(burgerApiUrl, options).then(checkResponse);
}

// Получение ингридиентов для конструктора

export function getDatafromApi(burgerApiUrl: string) {
  return request(`${burgerApiUrl}ingredients`);
}

// Отправка заказа на сервер

export function getOrderDatafromApi(burgerApiUrl: string, idArr: string[]) {
  return request(`${burgerApiUrl}orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getCookie("accessToken"),
    },
    body: JSON.stringify({
      ingredients: idArr,
    }),
  });
}

// Api взаимодействия с личным кабинетом пользователя

interface IUserApi {
  [name: string]: string;
}

export const sendRegistrationUsertoApi = (
  burgerApiUrl: string,
  data: IUserApi
) => {
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

export const setloginUserApi = (burgerApiUrl: string, data: IUserApi) => {
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

export const passwordForgotApi = (burgerApiUrl: string, data: IUserApi) => {
  return request(`${burgerApiUrl}password-reset`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: data.email,
    }),
  });
};

export const passwordResetApi = (burgerApiUrl: string, data: IUserApi) => {
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

export const getUserApi = (burgerApiUrl: string) => {
  return request(`${burgerApiUrl}auth/user`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getCookie("accessToken"),
    },
  });
};

export const changeUserDataApi = (burgerApiUrl: string, data: IUserApi) => {
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

export const refreshTokenApi = (burgerApiUrl: string) => {
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

export const logoutUserApi = (burgerApiUrl: string) => {
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
