import React from "react";
import { AppBar, Toolbar, Grid } from "@material-ui/core";
import { withRouter } from "react-router-dom";
import AppIcon from "../assets/logo.png";
import HeaderRightBar from "../components/header/HeaderRightBar";
import HeaderStyles from "../styles/pages/header_styles";

function Header(props) {
  const classes = HeaderStyles();

  function changeLocation(loc) {
    props.history.push(loc);
  }

  return (
    <AppBar className={classes.topBar}>
      <Toolbar style={{ backgroundColor: "white" }}>
        <Grid
          container
          direction="row"
          spacing={2}
          alignItems="center"
          edge="start"
        >
          <Grid item>
            <img src={AppIcon} alt="logo" className={classes.logo} />
          </Grid>
          <Grid item className={classes.dealsMateGrid}>
            <h1 className={classes.dealsMateName}>DEALS MATE</h1>
          </Grid>
        </Grid>

        {props.location.pathname !== "/register" &&
          props.location.pathname !== "/login" && (
            <HeaderRightBar changeLocation={changeLocation} />
          )}
      </Toolbar>
    </AppBar>
  );
}

export default withRouter(Header);
