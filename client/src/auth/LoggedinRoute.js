import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isAuthenticated } from "auth/";

const LoggedInRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Redirect to="/lists" />
      ) : (
        <Component {...props} {...rest} />
      )
    }
  />
);

export default LoggedInRoute;
