import React from "react";
import { AppBar, Toolbar, Grid, Button } from "@material-ui/core";
import { useLocation, useHistory } from "react-router-dom";

import AppIcon from "assets/logo.png";
import headerRightBarStyles from "styles/components/HeaderRightBarStyles";
import { useLogout } from "hooks/";
import HeaderStyles from "styles/pages/HeaderStyles";

// notification styles
// const StyledBadge = withStyles((theme) => ({
//   badge: {
//     top: "25%",
//     right: 5,
//     background: `${theme.primary}`,
//   },
// }))(Badge);

function HeaderRightBar(props) {
  const classes = headerRightBarStyles();
  const { changeLocation } = props;
  const logout = useLogout();

  return (
    <div className={classes.grow}>
      <Button
        className={classes.label}
        onClick={() => {
          changeLocation("/lists");
        }}
      >
        Shopping List
      </Button>
      <Button
        className={classes.profile}
        onClick={() => {
          changeLocation("/profile");
        }}
      >
        Profile
      </Button>
      <Button
        className={classes.profile}
        onClick={() => {
          logout();
        }}
      >
        Sign Out
      </Button>
    </div>
  );
}

function Header() {
  const classes = HeaderStyles();
  const location = useLocation();
  const history = useHistory();

  function changeLocation(loc) {
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
