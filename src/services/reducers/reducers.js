import { combineReducers } from "redux";

import {
  GET_DATA_REQUEST,
  GET_DATA_SUCCESS,
  GET_DATA_FAILED,
  SET_ORDER_REQUEST,
  SET_ORDER_SUCCESS,
  SET_ORDER_FAILED,
  CLOSE_ORDER_MODAL,
  OPEN_MODAL_INGRIDIENT,
  CLOSE_MODAL_INGRIDIENT
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
    data: {}
}
  

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
        order: { ...state, number: action.res.order.number },
        success: action.res.success,
        orderRequest: false,
        openModal: true
      };
    }
    case SET_ORDER_FAILED: {
      return { ...state, orderFailed: true, orderRequest: false };
    }
    case CLOSE_ORDER_MODAL: {
        return {state: initOrderData}
    }

    default:
      return state;
  }
};

export const ingridientData = (state = initIngridientModal, action) => {
    switch (action.type) {
        case OPEN_MODAL_INGRIDIENT: {
            return {...state,
                openModal: true,
                data: action.payload
            }
        }
        case CLOSE_MODAL_INGRIDIENT: {
            return {state: initIngridientModal}
        }
        default: return state
    }
}

export const rootReducer = combineReducers({
  data: getDataReducer,
  order: submitOrderData,
  ingridient: ingridientData
});
