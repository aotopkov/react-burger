import { TWsConnection } from "../types/socket";
import { TSetUserData } from "../types/auth";
import { TGetData } from "../types/ingridients";
import { TOrderConstructor } from "../types/order";

export type TAppActions =
  | TSetUserData
  | TGetData
  | TOrderConstructor
  | TWsConnection;
