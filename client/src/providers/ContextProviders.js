import React from "react";
import { MuiThemeProvider } from "@material-ui/core";

import { theme } from "themes/theme";
import { StoresProvider } from "providers/StoresProvider";
import { AuthContextProvider } from "providers/AuthProvider";
import { SnackBarProvider } from "providers/SnackBarProvider";

export default function ContextProviders(props) {
  return (
    <StoresProvider>
      <MuiThemeProvider theme={theme}>
        <AuthContextProvider>
          <SnackBarProvider>{props.children}</SnackBarProvider>
        </AuthContextProvider>
      </MuiThemeProvider>
    </StoresProvider>
  );
}
