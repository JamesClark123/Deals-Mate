import React, { createContext } from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { useHistory } from "react-router-dom";

import { theme } from "themes/theme";
import { AppStore } from "stores/AppStores";
import { AuthContextProvider } from "auth/AuthContext";

const appStore = new AppStore();

export default function ContextProviders(props) {
  return (
    <AuthContextProvider>
      <MuiThemeProvider theme={theme}>
        <appStore.storeProviders>{props.children}</appStore.storeProviders>
      </MuiThemeProvider>
    </AuthContextProvider>
  );
}
