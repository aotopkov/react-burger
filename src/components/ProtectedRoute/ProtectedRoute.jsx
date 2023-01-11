import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Route, useLocation } from "react-router";
import { getUser } from "../../services/actions/auth";
import { getCookie } from "../../utils/cookie";

export default function ProtectedRoute({ forAuth, component, ...rest }) {
  const dispatch = useDispatch()
  const isAuth = getCookie("accessToken");
  const userData = useSelector((store) => store.userData);
  const [isLoad, setLoading] = useState(false);
  const location = useLocation()

  const init = () => {
    if (isAuth) {
      dispatch(getUser());
      setLoading(true);
    } else {
      setLoading(true);
    }
  };

  useEffect(() => {
    init();
  }, []);

  if (forAuth) {
    return (
      <>
        {!isLoad && (
          <>
            <p className="text text_type_main-default">Загружаем данные</p>
          </>
        )}

        {isLoad && (
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
        <Redirect to={location.state ? location.state.from : '/'} />
      </Route>
    );
  }

  return <Route {...rest}>{component}</Route>;
}
