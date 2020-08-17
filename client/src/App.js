import React, { Fragment } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import LoginPage from "./pages/Login";
import SignUpPage from "./pages/Signup";
import ProfilePage from "./pages/Profile";
import ListPage from "./pages/Lists";
import Header from "./pages/Header";
import PrivateRoute from "auth/PrivateRoute";
import "./App.css";
import LoggedInRoute from "auth/LoggedinRoute";
import LoadingSpinner from "components/LoadingSpinner";
import ContextProviders from "providers/ContextProviders";

function App() {
  return (
    <BrowserRouter>
      <ContextProviders>
        <Fragment>
          <LoadingSpinner />
          <Header />
          <Switch>
            {/* Auth routes */}
            <LoggedInRoute exact path="/login" component={LoginPage} />
            <LoggedInRoute exact path="/register" component={SignUpPage} />
            <PrivateRoute exact path="/profile" component={ProfilePage} />
            <PrivateRoute exact path="/lists" component={ListPage} />
            {/* End Auth routes */}
            <Route path="/" render={() => <Redirect to="/login" />} />
          </Switch>
        </Fragment>
      </ContextProviders>
    </BrowserRouter>
  );
}

export default App;
