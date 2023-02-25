import {
  SET_USER_DATA_REQUEST,
  SET_USER_DATA_SUCCESS,
  SET_USER_DATA_FAILED,
  SET_USER_DATA_LOGOUT,
  SET_USER_DATA_EMAIL_TOKEN,
} from "../actions/auth";
import { TSetUserData } from "../types/auth";

type TUserData = {
  request: Boolean;
  failed: Boolean;
  isLoggin: Boolean;
  emailToken: Boolean;
  user: {
    email: string;
    name: string;
  };
};

const initUserData: TUserData = {
  request: false,
  failed: false,
  isLoggin: false,
  emailToken: false,
  user: {
    email: "",
    name: "",
  },
};

export const userData = (
  state: TUserData = initUserData,
  action: TSetUserData
) => {
  switch (action.type) {
    case SET_USER_DATA_REQUEST: {
      return { ...state, request: true };
    }
    case SET_USER_DATA_SUCCESS: {
      return {
        ...state,
        request: false,
        failed: false,
        isLoggin: action.res.success,
        user: action.res.user,
      };
    }
    case SET_USER_DATA_FAILED: {
      return {
        ...state,
        request: false,
        failed: true,
      };
    }
    case SET_USER_DATA_EMAIL_TOKEN: {
      return {
        ...state,
        emailToken: true,
      };
    }

    case SET_USER_DATA_LOGOUT: {
      return {
        ...state,
        request: false,
        isLoggin: !action.res.success,
        user: {
          name: "",
          email: "",
        },
      };
    }

    default:
      return state;
  }
};
