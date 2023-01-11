import {
  burgerApiUrl,
  changeUserDataApi,
  getUserApi,
  logoutUserApi,
  refreshTokenApi,
  sendRegistrationUsertoApi,
  setloginUserApi,
} from "./../../utils/Api";
import { deleteCookie, setCookie } from "./../../utils/cookie";

export const SET_USER_DATA_REQUEST = "SET_USER_DATA_REQUEST";
export const SET_USER_DATA_SUCCESS = "SET_USER_DATA_SUCCESS";
export const SET_USER_DATA_FAILED = "SET_USER_DATA_FAILED";
export const SET_USER_DATA_LOGOUT = "SET_USER_DATA_LOGOUT";
export const SET_USER_DATA_EMAIL_TOKEN = "SET_USER_DATA_EMAIL_TOKEN";

//Регистрация пользователя

export function setRegUser(data) {
  return function (dispatch) {
    dispatch({
      type: SET_USER_DATA_REQUEST,
    });
    sendRegistrationUsertoApi(burgerApiUrl, data)
      .then((res) => {
        if (res && res.success) {
          let accessToken = res.accessToken.split("Bearer ")[1];
          let refreshToken = res.refreshToken;
          if (accessToken) {
            setCookie("accessToken", accessToken);
          }
          if (refreshToken) {
            setCookie("refreshToken", refreshToken);
          }
          dispatch({
            type: SET_USER_DATA_SUCCESS,
            res: res,
          });
        } else {
          dispatch({
            type: SET_USER_DATA_FAILED,
          });
        }
      })
      .catch((err) => {
        console.log(`ошибка ${err}`);
      });
  };
}

//Авторизация пользователя

export function loginUser(data) {
  return function (dispatch) {
    dispatch({
      type: SET_USER_DATA_REQUEST,
    });
    setloginUserApi(burgerApiUrl, data)
      .then((res) => {
        if (res && res.success) {
          let accessToken = res.accessToken.split("Bearer ")[1];
          let refreshToken = res.refreshToken;
          if (accessToken) {
            setCookie("accessToken", accessToken);
          }
          if (refreshToken) {
            setCookie("refreshToken", refreshToken);
          }
          dispatch({
            type: SET_USER_DATA_SUCCESS,
            res: res,
          });
        } else {
          dispatch({
            type: SET_USER_DATA_FAILED,
          });
        }
      })
      .catch((err) => {
        console.log(`ошибка ${err}`);
        dispatch({
          type: SET_USER_DATA_FAILED,
        });
      });
  };
}

//Получение данных пользователя по токену

export function getUser() {
  return function (dispatch) {
    getUserApi(burgerApiUrl)
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: SET_USER_DATA_SUCCESS,
            res: res,
          });
        } else {
          dispatch({
            type: SET_USER_DATA_FAILED,
          });
        }
      })
      .catch((err) => {
        console.log(`ошибка ${err}`);
        dispatch(refreshToken());
      });
  };
}

//обновление Токена

export function refreshToken() {
  return function (dispatch) {
    refreshTokenApi(burgerApiUrl)
      .then((res) => {
        if (res && res.success) {
          let accessToken = res.accessToken.split("Bearer ")[1];
          let refreshToken = res.refreshToken;
          if (accessToken) {
            setCookie("accessToken", accessToken);
          }
          if (refreshToken) {
            setCookie("refreshToken", refreshToken);
          }
          dispatch(getUser());
        } else {
          dispatch({
            type: SET_USER_DATA_FAILED,
          });
        }
      })
      .catch((err) => {
        console.log(`ошибка ${err}`);
        deleteCookie("accessToken");
        deleteCookie("refreshToken");
      });
  };
}

//Смена данных в профиле

export function changeUserData(data) {
  return function (dispatch) {
    dispatch({
      type: SET_USER_DATA_REQUEST,
    });
    changeUserDataApi(burgerApiUrl, data)
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: SET_USER_DATA_SUCCESS,
            res: res,
          });
        } else {
          dispatch({
            type: SET_USER_DATA_FAILED,
          });
        }
      })
      .catch(async (err) => {
        console.log(`ошибка ${err}. Обновляем Токен`);
        dispatch(
          refreshToken().then((res) => {
            if (res && res.success) {
              changeUserData(data);
            }
          })
        );
      })
      .finally(() => {
        dispatch(getUser());
      });
  };
}

//Выход

export function logoutUser() {
  return function (dispatch) {
    dispatch({
      type: SET_USER_DATA_REQUEST,
    });
    logoutUserApi(burgerApiUrl)
      .then((res) => {
        if (res && res.success) {
          deleteCookie("accessToken");
          deleteCookie("refreshToken");
          dispatch({
            type: SET_USER_DATA_LOGOUT,
            res: res,
          });
        }
      })
      .catch((err) => {
        console.log(`ошибка ${err}`);
      });
  };
}
