import { useSelector } from "react-redux";
import { Redirect, Route, useLocation } from "react-router";
import { getCookie } from "../../utils/cookie";

export default function ProtectedRoute({ forAuth, component, ...rest }) {
  const isAuth = getCookie("accessToken");
  const userData = useSelector((store) => store.userData);
  const location = useLocation();

  if (forAuth) {
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
              isAuth ? (
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

  if (!forAuth && !isAuth) {
    return <Route {...rest}>{component}</Route>;
  }
}
