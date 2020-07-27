import React from "react";
import { Route, Redirect } from "react-router-dom";

import { useAuth, useCheckAuth } from "hooks";

function LoggedInRoute({ component: Component, ...rest }) {
  const authContext = useAuth();
  useCheckAuth();

  return (
    <Route
      {...rest}
      render={(props) =>
        authContext.isAuthenticated ? (
          <Redirect to="/lists" />
        ) : (
          <Component {...props} {...rest} />
        )
      }
    />
  );
}

export default LoggedInRoute;
