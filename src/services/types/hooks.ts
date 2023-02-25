import {
  TypedUseSelectorHook,
  useSelector as selectorHook,
  useDispatch as dispatchHook,
} from "react-redux";
import { AppDispatch, AppThunk, RootState } from "./index";

export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

type AppDispatchFunc = () => AppDispatch | AppThunk;
export const useDispatch: AppDispatchFunc = dispatchHook;
