import React, { Fragment, createContext } from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { theme } from "./themes/theme";
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect,
  useHistory
} from "react-router-dom";
import LoginPage from "./pages/Login";
import SignUpPage from "./pages/Signup";
import ProfilePage from "./pages/Profile";
import ListPage from "./pages/Lists";
import Header from "./pages/Header";
import FriendsPage from "./pages/Friends";
import PrivateRoute from "auth/PrivateRoute";
import "./App.css";
import LoggedInRoute from "auth/LoggedinRoute";
import { setAuthToken } from "auth/";
import { AppStore } from "stores/AppStores";

const appStore = new AppStore();
const routerContext = createContext();

class App extends React.Component {
  componentDidMount() {
    setAuthToken();
  }
  render() {
    return (
      <BrowserRouter>
        <routerContext.Provider value={loc => useHistory().push(loc)}>
          <MuiThemeProvider theme={theme}>
            <appStore.storeProviders>
              <Fragment>
                <Header />
                <Switch>
                  <Route
                    exact
                    path="/"
                    render={() => <Redirect to="/login" />}
                  />
                  {/* Auth routes */}
                  <LoggedInRoute exact path="/login" component={LoginPage} />
                  <LoggedInRoute
                    exact
                    path="/register"
                    component={SignUpPage}
                  />
                  <PrivateRoute exact path="/friends" component={FriendsPage} />
                  <PrivateRoute exact path="/profile" component={ProfilePage} />
                  <PrivateRoute exact path="/lists" component={ListPage} />
                </Switch>
              </Fragment>
            </appStore.storeProviders>
          </MuiThemeProvider>
        </routerContext.Provider>
      </BrowserRouter>
    );
  }
}

export default App;
