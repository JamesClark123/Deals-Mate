import React from "react";
import { Button, Badge } from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { withStyles } from "@material-ui/styles";
import HeaderNotification from "./header/HeaderNotification.js";
import { useLogout } from "hooks/";
import headerRightBarStyles from "styles/components/HeaderRightBarStyles";

const StyledBadge = withStyles((theme) => ({
  badge: {
    top: "25%",
    right: 5,
    background: `${theme.primary}`,
  },
}))(Badge);

function HeaderRightBar(props) {
  const classes = headerRightBarStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const notificationElements = ["a", "b", "c", "d", "e"];
  const { changeLocation } = props;
  const logout = useLogout();

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

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
      {/* <Button
        className={classes.label}
        onClick={() => {
          changeLocation("/friends");
        }}
      >
        Friends
      </Button>
      {notificationElements.length > 0 ? (
        <StyledBadge variant="dot">
          <Button className={classes.label} onClick={handleClick}>
            Notifications
          </Button>
        </StyledBadge>
      ) : (
        <Button className={classes.label} disabled>
          Notifications
        </Button>
      )}
      <HeaderNotification
        anchorEl={anchorEl}
        handleClose={handleClose}
        elements={notificationElements}
      /> */}
      {/* <AccountCircle className={classes.accountCircle} /> */}
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

export default HeaderRightBar;
