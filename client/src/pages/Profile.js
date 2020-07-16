import React, { useEffect, useState } from "react";
import { getUser } from "api/";
import { authentication, logout } from "auth/";
import { Avatar, Button } from "@material-ui/core";
import LoadingSpinner from "components/utils/LoadingSpinner.js";
import ProfileStyles from "styles/pages/profile_styles";

function Profile(props) {
  const classes = ProfileStyles();
  const [state, setState] = useState({
    user: "",
    error: "",
    loading: true
  });

  useEffect(() => {
    onMount();
  }, []);

  function onMount() {
    const token = authentication().token;
    getUser(token).then(data => {
      if (data.error) {
        setState({ user: { name: "" }, error: data.error, loading: false });
      } else {
        console.log(data);
        setState({ error: "", user: data, loading: false });
      }
    });
  }

  return (
    <div className={classes.pageContainer}>
      {state.loading && <LoadingSpinner />}
      <h1 className={classes.pageStart}>Profile</h1>
      <Avatar className={classes.avatarStyle} />
      <h1 className={classes.userName}>{state.user.name}</h1>
      <Button
        onClick={() => {
          logout();
          props.history.push("/");
        }}
        className={classes.signOutButton}
        size="large"
      >
        Sign Out
      </Button>
    </div>
  );
}

export default Profile;
