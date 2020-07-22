import React from "react";
import { AppBar, Toolbar, Grid } from "@material-ui/core";
import { useLocation, useHistory } from "react-router-dom";

import AppIcon from "assets/logo.png";
import HeaderRightBar from "components/HeaderRightBar";
import HeaderStyles from "styles/pages/HeaderStyles";

function Header(props) {
  const classes = HeaderStyles();
  const location = useLocation();
  const history = useHistory();

  function changeLocation(loc) {
    console.log("HERHERHER");
    history.push(loc);
  }

  return (
    <AppBar className={classes.topBar}>
      <Toolbar className={classes.toolBar}>
        <Grid
          container
          direction="row"
          spacing={2}
          alignItems="center"
          edge="start"
        >
          <div
            onClick={() => history.push("/lists")}
            className={classes.logoAndName}
          >
            <Grid item>
              <img src={AppIcon} alt="logo" className={classes.logo} />
            </Grid>
            <Grid item className={classes.dealsMateGrid}>
              <h1 className={classes.dealsMateName}>DEALS MATE</h1>
            </Grid>
          </div>
        </Grid>

        {location.pathname !== "/register" &&
          location.pathname !== "/login" && (
            <HeaderRightBar changeLocation={changeLocation} />
          )}
      </Toolbar>
    </AppBar>
  );
}

export default Header;
