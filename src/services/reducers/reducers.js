import { combineReducers } from "redux";
import update from "immutability-helper";

import {
  GET_DATA_REQUEST,
  GET_DATA_SUCCESS,
  GET_DATA_FAILED,
  SET_ORDER_REQUEST,
  SET_ORDER_SUCCESS,
  SET_ORDER_FAILED,
  CLOSE_ORDER_MODAL,
  OPEN_MODAL_INGRIDIENT,
  CLOSE_MODAL_INGRIDIENT,
  ADD_BUN_TO_CONSTRUCTOR,
  ADD_INGRIDIENT_TO_CONSTRUCTOR,
  REMOVE_INGRIDIENT_FROM_CONSTRUCTOR,
  MOVE_INGRIDIENT,
} from "../actions/actions";

const initStateData = {
  data: [],
  dataRequest: false,
  dataFailed: false,
};

const initOrderData = {
  openModal: false,
  name: "",
  order: {
    number: "",
  },
  success: false,
  orderRequest: false,
  orderFailed: false,
};

const initIngridientModal = {
  openModal: false,
  data: {},
};

const initConstructor = {
  bun: null,
  ingridients: [],
};

export const getDataReducer = (state = initStateData, action) => {
  switch (action.type) {
    case GET_DATA_REQUEST: {
      return { ...state, dataRequest: true };
    }
    case GET_DATA_SUCCESS: {
      return { ...state, data: action.data, dataRequest: false };
    }
    case GET_DATA_FAILED: {
      return { ...state, dataFailed: true, dataRequest: false };
    }
    default:
      return state;
  }
};

export const submitOrderData = (state = initOrderData, action) => {
  switch (action.type) {
    case SET_ORDER_REQUEST: {
      return { ...state, orderRequest: true };
    }
    case SET_ORDER_SUCCESS: {
      return {
        ...state,
        order: { ...state.order, number: action.res.order.number },
        success: action.res.success,
        orderRequest: false,
        openModal: true,
      };
    }
    case SET_ORDER_FAILED: {
      return { ...state, orderFailed: true, orderRequest: false };
    }
    case CLOSE_ORDER_MODAL: {
      return { state: initOrderData };
    }

    default:
      return state;
  }
};

export const ingridientData = (state = initIngridientModal, action) => {
  switch (action.type) {
    case OPEN_MODAL_INGRIDIENT: {
      return {
        openModal: true,
        data: action.payload,
      };
    }
    case CLOSE_MODAL_INGRIDIENT: {
      return { state: initIngridientModal };
    }
    default:
      return state;
  }
};

export const constructorBin = (state = initConstructor, action) => {
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
        ingridients: [...state.ingridients, action.payload],
      };
    }
    case REMOVE_INGRIDIENT_FROM_CONSTRUCTOR: {
      return {
        ...state,
        ingridients: [
          ...state.ingridients.slice(0, action.index),
          ...state.ingridients.slice(action.index + 1),
        ],
      };
    }
    case MOVE_INGRIDIENT: {
      return update(state, {
        ingridients: {
          $splice: [
            [action.drag, 1],
            [action.hover, 0, state.ingridients[action.drag]],
          ],
        },
      });
    }

    default:
      return state;
  }
};

export const rootReducer = combineReducers({
  data: getDataReducer,
  order: submitOrderData,
  ingridient: ingridientData,
  constructorBin: constructorBin,
});
