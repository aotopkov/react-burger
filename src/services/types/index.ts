import { store } from "../store";
import { ThunkAction } from "redux-thunk";
import { Action, ActionCreator } from "redux";
import { TAppActions } from "../actions";

export type RootState = ReturnType<typeof store.getState>;

export type AppThunk<TReturn = void> = ActionCreator<
  ThunkAction<TReturn, Action, RootState, TAppActions>
>;

export type AppDispatch = typeof store.dispatch;
