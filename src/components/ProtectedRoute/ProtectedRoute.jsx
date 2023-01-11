import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Redirect, Route, useLocation } from "react-router";
import { getCookie } from "../../utils/cookie";

export default function ProtectedRoute({ forAuth, component, ...rest }) {
  const isAuth = getCookie("accessToken");
  const userData = useSelector((store) => store.userData);
  const [isLoad, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if(userData.request) {
      setLoading(true)
    }
  }, [userData])

  if (forAuth && isLoad) {
    return (
      <>
        {userData.request && (
          <>
            <p className="text text_type_main-default">Загружаем данные</p>
          </>
        )}

        {!userData.request && !userData.failed && (
          <Route
            render={({ location }) =>
              userData.isLoggin ? (
                component
              ) : (
                <Redirect
                  to={{ pathname: "/login", state: { from: location } }}
                />
              )
            }
          />
        )}
      </>
    );
  }

  if (!forAuth && isAuth) {
    return (
      <Route {...rest}>
        <Redirect to={location.state ? location.state.from : "/"} />
      </Route>
    );
  }

  return <Route {...rest}>{component}</Route>;
}
