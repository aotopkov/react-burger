import update from "immutability-helper";

import {
  SET_ORDER_REQUEST,
  SET_ORDER_SUCCESS,
  SET_ORDER_FAILED,
  CLOSE_ORDER_MODAL,
  ADD_BUN_TO_CONSTRUCTOR,
  ADD_INGRIDIENT_TO_CONSTRUCTOR,
  REMOVE_INGRIDIENT_FROM_CONSTRUCTOR,
  START_MOVE_INGRIDIENT,
  CLEAR_BIN_CONSTRUCTOR,
} from "../actions/order";
import { TOrderConstructor } from "../types/order";
import { TIngridient } from "../types/data";

export type TOrderSet = {
  openModal: Boolean;
  number: number | null;
  success: Boolean;
  orderRequest: Boolean;
  orderFailed: Boolean;
};

type TConstructor = {
  bun: null | TIngridient;
  ingridients: TIngridient[];
};

const initOrderData: TOrderSet = {
  openModal: false,
  number: null,
  success: false,
  orderRequest: false,
  orderFailed: false,
};

const initConstructor: TConstructor = {
  bun: null,
  ingridients: [],
};

export const constructorBin = (
  state: TConstructor = initConstructor,
  action: TOrderConstructor
) => {
  switch (action.type) {
    case ADD_BUN_TO_CONSTRUCTOR: {
      return {
        ...state,
        bun: action.payload,
      };
    }
    case ADD_INGRIDIENT_TO_CONSTRUCTOR: {
      return {
        ...state,
        ingridients: [
          ...state.ingridients,
          { ...action.payload, uuid: action.uuid },
        ],
      };
    }
    case REMOVE_INGRIDIENT_FROM_CONSTRUCTOR: {
      return {
        ...state,
        ingridients: state.ingridients.filter(
          (elem: TIngridient) => elem.uuid !== action.uuid
        ),
      };
    }
    case START_MOVE_INGRIDIENT: {
      return update(state, {
        ingridients: {
          $splice: [
            [action.drag, 1],
            [action.hover, 0, state.ingridients[action.drag]],
          ],
        },
      });
    }
    case CLEAR_BIN_CONSTRUCTOR: {
      return initConstructor;
    }

    default:
      return state;
  }
};

export const submitOrderData = (
  state: TOrderSet = initOrderData,
  action: TOrderConstructor
) => {
  switch (action.type) {
    case SET_ORDER_REQUEST: {
      return { ...state, orderRequest: true };
    }
    case SET_ORDER_SUCCESS: {
      return {
        ...state,
        number: action.res.order.number,
        success: action.res.success,
        orderRequest: false,
        openModal: true,
      };
    }
    case SET_ORDER_FAILED: {
      return { ...state, orderFailed: true, orderRequest: false };
    }
    case CLOSE_ORDER_MODAL: {
      return initOrderData;
    }

    default:
      return state;
  }
};
