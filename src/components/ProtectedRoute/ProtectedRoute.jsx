import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router";
import Auth from "../../utils/Auth";

export default function ProtectedRoute({ component }) {
  const { ...auth } = Auth();
  const userData = useSelector((store) => store.userData);
  const [isLoading, setLoading] = useState(false);

  const init = async () => {
    await auth.getUser();
    setLoading(true);
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <>
      {!isLoading && (
        <>
          <p className="text text_type_main-default">Загружаем данные</p>
        </>
      )}

      {isLoading && (
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
