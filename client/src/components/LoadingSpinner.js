import React from "react";
import { observer } from "mobx-react";

import { makeStyles } from "@material-ui/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useUIStore } from "hooks/";

const loadingSpinnerStyles = makeStyles((theme) => ({
  loadingContainer: {
    width: "100vw",
    height: "100vh",
    zIndex: 2000,
    backgroundColor: "rgb(245, 245, 245, .7)",
    position: "absolute",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    opacity: ({ loading }) => (loading ? "1" : "0"),
    pointerEvents: ({ loading }) => (loading ? "all" : "none"),
    transition: "all 1s",
  },
  loadingProgress: {
    color: theme.primary,
  },
}));

function LoadingSpinner() {
  const uiStore = useUIStore();
  const classes = loadingSpinnerStyles({ loading: uiStore.loading });

  return (
    <>
      <div className={classes.loadingContainer}>
        {" "}
        <CircularProgress className={classes.loadingProgress} />{" "}
      </div>
    </>
  );
}

export default observer(LoadingSpinner);
