import { getCookie } from "./cookie";

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


export const sendRegistrationUsertoApi = async (burgerApiUrl, data) => {
  return await fetch(`${burgerApiUrl}auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      "email": data.email, 
      "password": data.password, 
      "name": data.name 
  } )
  })
  .then(checkResponse)
}

export const setloginUserApi = async (burgerApiUrl, data) => {
  return await fetch(`${burgerApiUrl}auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      "email": data.email,
      "password": data.password
    })
  })
  .then(checkResponse)
}

export const passwordForgotApi = async (burgerApiUrl, data) => {
  return await fetch(`${burgerApiUrl}password-reset`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      "email" : data
    })
  })
  .then(checkResponse)
}

export const passwordResetApi = async (burgerApiUrl, data) => {
  return await fetch(`${burgerApiUrl}password-reset/reset`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      "password" : data.password,
      "token": data.token
    })
  })
  .then(checkResponse)
}

export const getUserApi = async (burgerApiUrl) => {
  return await fetch(`${burgerApiUrl}auth/user`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getCookie('accessToken')
    }
  })
  .then(checkResponse)
}

export const changeUserDataApi = async (burgerApiUrl, data) => {
  return await fetch(`${burgerApiUrl}auth/user`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getCookie('accessToken')
    },
    body: JSON.stringify({
      "name": data.name,
      "email": data.email
    })
  })
  .then(checkResponse)
}


export const refreshTokenApi = async (burgerApiUrl) => {
  return await fetch(`${burgerApiUrl}auth/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify ({
      "token": getCookie('refreshToken')
    })
  })
  .then(checkResponse)
}

export const logoutUserApi = async (burgerApiUrl) => {
  return await fetch(`${burgerApiUrl}auth/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify ({
      "token": getCookie('refreshToken')
    })
  })
  .then(checkResponse)
}