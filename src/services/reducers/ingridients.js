import { combineReducers } from "redux";
import update from "immutability-helper";

import {
    GET_DATA_REQUEST,
    GET_DATA_SUCCESS,
    GET_DATA_FAILED,
  } from "../actions/ingridients";

  const initStateData = {
    data: [],
    dataRequest: false,
    dataFailed: false,
    success: false,
  };
  


  export const getDataReducer = (state = initStateData, action) => {
    switch (action.type) {
      case GET_DATA_REQUEST: {
        return { ...state, dataRequest: true };
      }
      case GET_DATA_SUCCESS: {
        return {
          ...state,
          data: action.res.data,
          dataRequest: false,
          success: action.res.success,
        };
      }
      case GET_DATA_FAILED: {
        return { ...state, dataFailed: true, dataRequest: false };
      }
      default:
        return state;
    }
  };

