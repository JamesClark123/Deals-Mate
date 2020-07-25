import React, { useState } from "react";
import { Button } from "@material-ui/core";

import ProfileStyles from "styles/pages/ProfileStyles";
import { useDataStore, useDeleteAccount } from "hooks";

function Profile() {
  const classes = ProfileStyles();
  const dataStore = useDataStore();
  const deleteAccount = useDeleteAccount();

  const [safeToDelete, setSafe] = useState(false);

  return (
    <div className={classes.pageContainer}>
      <h1 className={classes.pageStart}>Profile</h1>
      <h1 className={classes.userName}>{dataStore.user.name}</h1>
      <Button
        onClick={() => {
          safeToDelete ? setSafe(false) : setSafe(true);
        }}
        className={classes.signOutButton}
        size="large"
      >
        {safeToDelete ? "Cancel" : "Delete Account"}
      </Button>
      {safeToDelete && (
        <Button
          onClick={() => {
            deleteAccount();
          }}
          className={classes.signOutButton}
          size="large"
        >
          Delete
        </Button>
      )}
    </div>
  );
}

export default Profile;
