import {
  SET_USER_DATA_EMAIL_TOKEN,
  SET_USER_DATA_FAILED,
  SET_USER_DATA_LOGOUT,
  SET_USER_DATA_REQUEST,
  SET_USER_DATA_SUCCESS,
} from "../actions/auth";
import { TUser, TUserLogout } from "./data";

export interface ISetUserDataRequest {
  readonly type: typeof SET_USER_DATA_REQUEST;
}

export interface ISetUserDataSuccess {
  readonly type: typeof SET_USER_DATA_SUCCESS;
  readonly res: TUser;
}

export interface ISetUserDataFailed {
  readonly type: typeof SET_USER_DATA_FAILED;
}

export interface ISetUserDataLogout {
  readonly type: typeof SET_USER_DATA_LOGOUT;
  readonly res: TUserLogout;
}

export interface ISetUserDataEmailToken {
  readonly type: typeof SET_USER_DATA_EMAIL_TOKEN;
}

export type TSetUserData =
  | ISetUserDataRequest
  | ISetUserDataSuccess
  | ISetUserDataFailed
  | ISetUserDataLogout
  | ISetUserDataEmailToken;
