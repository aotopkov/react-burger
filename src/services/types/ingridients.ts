import {
  GET_DATA_FAILED,
  GET_DATA_REQUEST,
  GET_DATA_SUCCESS,
} from "../actions/ingridients";
import { TIngridient } from "./data";

export interface IGetDataRequest {
  readonly type: typeof GET_DATA_REQUEST;
}

export interface IGetDataSuccess {
  readonly type: typeof GET_DATA_SUCCESS;
  readonly res: {
    readonly success: Boolean;
    readonly data: ReadonlyArray<TIngridient>;
  };
}

export interface IGetDataFailed {
  readonly type: typeof GET_DATA_FAILED;
}

export type TGetData = IGetDataRequest | IGetDataSuccess | IGetDataFailed;
