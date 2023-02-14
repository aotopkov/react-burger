import {
  ADD_BUN_TO_CONSTRUCTOR,
  ADD_INGRIDIENT_TO_CONSTRUCTOR,
  CLEAR_BIN_CONSTRUCTOR,
  CLOSE_ORDER_MODAL,
  REMOVE_INGRIDIENT_FROM_CONSTRUCTOR,
  SET_ORDER_FAILED,
  SET_ORDER_REQUEST,
  SET_ORDER_SUCCESS,
  START_MOVE_INGRIDIENT,
} from "../actions/order";

export interface ISetOrderRequest {
  readonly type: typeof SET_ORDER_REQUEST;
}

export interface ISetOrderSuccess {
  readonly type: typeof SET_ORDER_SUCCESS;
  readonly res: any
}

export interface ISetOrderFailed {
  readonly type: typeof SET_ORDER_FAILED;
}

export interface ICloseOrderModal {
  readonly type: typeof CLOSE_ORDER_MODAL;
}

export interface IAddBunToConstructor {
  readonly type: typeof ADD_BUN_TO_CONSTRUCTOR;
  readonly payload: any
}

export interface IAddIngridientToConstructor {
  readonly type: typeof ADD_INGRIDIENT_TO_CONSTRUCTOR;
  readonly payload: any;
  readonly uuid: string
}

export interface IRemoveIngridientFromConstructor {
  readonly type: typeof REMOVE_INGRIDIENT_FROM_CONSTRUCTOR;
  readonly uuid: string
}

export interface IStartMoveIngridient {
  readonly type: typeof START_MOVE_INGRIDIENT;
  readonly drag: any;
  readonly hover: any
}

export interface IClearBinConstructor {
  readonly type: typeof CLEAR_BIN_CONSTRUCTOR;
}

export type TOrderConstructor =
  | ISetOrderRequest
  | ISetOrderSuccess
  | ISetOrderFailed
  | ICloseOrderModal
  | IAddBunToConstructor
  | IAddIngridientToConstructor
  | IRemoveIngridientFromConstructor
  | IStartMoveIngridient
  | IClearBinConstructor;
