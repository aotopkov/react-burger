import { useDispatch } from "react-redux";
import {
  SET_USER_DATA_FAILED,
  SET_USER_DATA_LOGOUT,
  SET_USER_DATA_REQUEST,
  SET_USER_DATA_SUCCESS,
} from "../services/actions/actions";
import {
  burgerApiUrl,
  changeUserDataApi,
  getUserApi,
  logoutUserApi,
  refreshTokenApi,
  sendRegistrationUsertoApi,
  setloginUserApi,
} from "./Api";
import { deleteCookie, setCookie } from "./cookie";

export default function Auth() {
  const dispatch = useDispatch();

  //Регистрация пользователя

  const setRegUser = async (data) => {
    dispatch({
      type: SET_USER_DATA_REQUEST,
    });
    await sendRegistrationUsertoApi(burgerApiUrl, data)
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

  //Авторизация пользователя

  const loginUser = async (data) => {
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

  //Получение данных пользователя по токену

  const getUser = async () => {
    await getUserApi(burgerApiUrl)
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
        refreshToken();
      });
  };

  //обновление Токена

  const refreshToken = async () => {
    await refreshTokenApi(burgerApiUrl)
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
          getUser();
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

  //Смена данных в профиле

  const changeUserData = async (data) => {
    dispatch({
      type: SET_USER_DATA_REQUEST,
    });
    await changeUserDataApi(burgerApiUrl, data)
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
        await refreshToken().then((res) => {
          if (res && res.success) {
            changeUserData(data);
          }
        });
      })
      .finally(async () => {
        await getUser();
      });
  };

  //Выход

  const logoutUser = async () => {
    dispatch({
      type: SET_USER_DATA_REQUEST,
    });
    await logoutUserApi(burgerApiUrl)
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

  return {
    getUser,
    setRegUser,
    loginUser,
    changeUserData,
    logoutUser,
  };
}
