import { combineReducers } from "redux";
import update from "immutability-helper";
import { getDataReducer } from "./ingridients";
import { submitOrderData, constructorBin } from "./order";
import { userData } from "./auth";
import { wsOrderReducer } from "./socket";

export const rootReducer = combineReducers({
  data: getDataReducer,
  order: submitOrderData,
  constructorBin: constructorBin,
  userData: userData,
  orderInfo: wsOrderReducer,
});
