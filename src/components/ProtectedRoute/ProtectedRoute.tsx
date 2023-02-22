import { FC, ReactNode, useEffect } from "react";
import { useSelector } from "../../services/types/hooks";
import { Redirect, Route, useLocation } from "react-router";
import { getUser } from "../../services/actions/auth";
import { getCookie } from "../../utils/cookie";
import { TUseLocation } from "../App/App";

interface IProtectedRoute {
  forAuth: Boolean;
  component: ReactNode;
  path: string;
}

const ProtectedRoute: FC<IProtectedRoute> = ({
  forAuth,
  component,
  path,
  ...rest
}) => {
  const isAuth = getCookie("accessToken");
  const userData = useSelector((store) => store.userData);
  const location = useLocation<TUseLocation>();

  useEffect(() => {
    getUser();
  }, [isAuth, userData]);

  return (
    <>
      {forAuth && (
        <>
          {userData.request && (
            <>
              <p className="text text_type_main-default">Загружаем данные</p>
            </>
          )}

          {!userData.request && (
            <Route {...rest}>
              {userData.isLoggin ? (
                component
              ) : (
                <Redirect
                  to={{ pathname: "/login", state: { from: location } }}
                />
              )}
            </Route>
          )}
        </>
      )}

      {!forAuth && userData.isLoggin && (
        <Redirect to={location.state ? location.state.from : "/"} />
      )}

      {!forAuth && !userData.isLoggin && <Route {...rest}>{component}</Route>}
    </>
  );
};

export default ProtectedRoute;
