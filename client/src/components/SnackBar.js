import React, { useRef } from "react";
import { Snackbar as MUSnackBar, makeStyles } from "@material-ui/core";
import {
  Close,
  InfoOutlined as Info,
  ErrorOutlineOutlined as Error,
} from "@material-ui/icons";

import { useRemoveSnackBar, useCloseSnackBar } from "hooks";

const snackBarStyles = makeStyles((_theme) => ({
  snackBar: {
    padding: "10px",
    position: "absolute",
    bottom: (props) => props.bottom,
    pointerEvents: "all",
    transition: "all 2s",
    "& .MuiTypography-root": {
      backgroundColor: "white",
      border: ({ type }) => (type === "error" ? "2px solid red" : "none"),
      "& .MuiSnackbarContent-message": {
        display: "flex",
      },
    },
  },
  snackBarMessage: {
    display: "inline-flex",
    alignItems: "center",
  },
  leadingIcon: {
    padding: "0 5px 0 0",
  },
}));

function snackBar(msg, id, options) {
  class Snack extends React.Component {
    constructor(props) {
      super(props);
      this.state = { open: true };
      this.options = options;
    }

    close() {
      this.setState({ open: false });
    }

    makeMessage() {
      const classes = this.props.classes;
      return (
        <div className={classes.snackBarMessage}>
          {options.type === "error" ? (
            <Error className={classes.leadingIcon} />
          ) : (
            <Info className={classes.leadingIcon} />
          )}
          {msg}
        </div>
      );
    }

    render() {
      const classes = this.props.classes;
      return (
        <MUSnackBar
          message={this.makeMessage()}
          open={this.state.open}
          onExited={() => this.props.removeSnackBar(id)}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          action={
            !options.timeout || options.showAction ? (
              <Close
                style={{ cursor: "pointer" }}
                onClick={() => this.props.closeSnackBar(id)}
              />
            ) : null
          }
          ClickAwayListenerProps={{ onClickAway: () => {} }}
          transitionDuration={{ appear: 1000, exit: 500, enter: 1000 }}
          className={classes.snackBar}
        />
      );
    }
  }
  return React.forwardRef((props, ref) => {
    const removeSnackBar = useRemoveSnackBar();
    const closeSnackBar = useCloseSnackBar();
    const bottomRef = useRef();
    let { bottom } = props;
    if (!bottom) {
      bottom = bottomRef.current;
    } else {
      bottomRef.current = bottom;
    }
    const classes = snackBarStyles({ ...options, bottom });

    return (
      <Snack
        {...props}
        bottom={bottom}
        classes={classes}
        removeSnackBar={removeSnackBar}
        closeSnackBar={closeSnackBar}
        ref={ref}
      />
    );
  });
}

export default snackBar;
