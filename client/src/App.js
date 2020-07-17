import React, { Fragment, useEffect } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import LoginPage from "./pages/Login";
import SignUpPage from "./pages/Signup";
import ProfilePage from "./pages/Profile";
import ListPage from "./pages/Lists";
import Header from "./pages/Header";
import FriendsPage from "./pages/Friends";
import PrivateRoute from "auth/PrivateRoute";
import "./App.css";
import LoggedInRoute from "auth/LoggedinRoute";
import { setAuthToken, useLogin } from "auth/AuthContext";
import ContextProviders from "ContextProviders";

function App() {
  return (
    <BrowserRouter>
      <ContextProviders>
        <Fragment>
          <Header />
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/login" />} />
            {/* Auth routes */}
            <LoggedInRoute exact path="/login" component={LoginPage} />
            <LoggedInRoute exact path="/register" component={SignUpPage} />
            <PrivateRoute exact path="/friends" component={FriendsPage} />
            <PrivateRoute exact path="/profile" component={ProfilePage} />
            <PrivateRoute exact path="/lists" component={ListPage} />
          </Switch>
        </Fragment>
      </ContextProviders>
    </BrowserRouter>
  );
}

export default App;
