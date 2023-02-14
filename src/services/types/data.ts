//тип для ингридиента

export type TIngridient = {
  _id: string;
  readonly name: string;
  readonly type: string;
  readonly proteins: number;
  readonly fat: number;
  readonly carbohydrates: number;
  readonly calories: number;
  readonly price: number;
  readonly image_mobile: string;
  readonly image_large: string;
  readonly image: string;
  readonly __v: number;
};

//тип для данных о пользователе

export type TUser = {
  readonly success: Boolean;
  readonly user: {
    readonly email: string;
    readonly name: string;
  };
};

export type TUserLogin = TUser & {
  readonly accessToken: string;
  readonly refreshToken: string;
};

export type TUserLogout = Omit<TUser, "user">;

//тип данных для заказа

export type TOrderData = {
  readonly _id: string;
  readonly ingridients: ReadonlyArray<string>;
  readonly status: string;
  readonly name: string;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly number: number;
};
