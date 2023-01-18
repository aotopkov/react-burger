import { combineReducers } from "redux";
import update from "immutability-helper";

import {
    SET_ORDER_REQUEST,
    SET_ORDER_SUCCESS,
    SET_ORDER_FAILED,
    CLOSE_ORDER_MODAL,
    ADD_BUN_TO_CONSTRUCTOR,
    ADD_INGRIDIENT_TO_CONSTRUCTOR,
    REMOVE_INGRIDIENT_FROM_CONSTRUCTOR,
    MOVE_INGRIDIENT,
    CLEAR_BIN_CONSTRUCTOR
  } from "../actions/order";

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

  const initConstructor = {
    bun: null,
    ingridients: [],
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
            (elem) => elem.uuid !== action.uuid
          ),
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
      case CLEAR_BIN_CONSTRUCTOR: {
        return initConstructor;
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
  