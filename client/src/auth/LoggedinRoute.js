import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "providers/AuthProvider";

function LoggedInRoute({ component: Component, ...rest }) {
  const authContext = useContext(AuthContext);
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
