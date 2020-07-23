import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { useLogin, useAuth } from "hooks/";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const authContext = useAuth();
  useLogin(); // allows us to check authentication on component mount

  return (
    <Route
      {...rest}
      render={(props) =>
        authContext.isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
