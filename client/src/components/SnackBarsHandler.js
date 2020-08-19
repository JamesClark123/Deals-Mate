import React from "react";
import { observer } from "mobx-react";
import { useLocation } from "react-router-dom";

import { useUIStore } from "hooks";
import snackBar from "components/SnackBar";

@observer
class SnackBarsHandler extends React.Component {
  maxLength = 5;
  defaultOptions = {
    timeout: 5000,
    removeOnPageChange: true,
    showAction: false,
    type: "info",
  };

  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      this.closeOnPageChange();
    }
  }

  closeOnPageChange() {
    this.props.uiStore.snackBars.forEach((el) => {
      if (el.ref.current.options.removeOnPageChange) {
        this.closeSnackBar(el.id);
      }
    });
  }

  makeSnackBar(msg, options) {
    const snackRef = React.createRef();
    const id = Symbol();
    const Snack = snackBar(msg, id, options);

    return {
      SnackBar: Snack,
      msg: msg,
      ref: snackRef,
      open: true,
      id,
    };
  }

  removeSnackBar(snackId) {
    const index = this.props.uiStore.snackBars.findIndex(
      ({ id }) => id === snackId
    );
    if (index < 0) return;
    this.props.uiStore.snackBars.splice(index, 1);
  }

  closeSnackBar(snackId) {
    const index = this.props.uiStore.snackBars.findIndex(
      ({ id }) => id === snackId
    );
    if (index < 0) return;
    this.props.uiStore.snackBars[index].ref.current.close();
    this.props.uiStore.snackBars[index].open = false;
  }

  closeSnackBarAt(id, timeout) {
    setTimeout(() => {
      this.closeSnackBar(id);
    }, timeout);
  }

  showSnackBar(msg, options = {}) {
    options = {
      ...this.defaultOptions,
      ...options,
    };
    if (this.props.uiStore.snackBars.find((el) => el.msg === msg)) return;
    const newSnack = this.makeSnackBar(msg, options);
    this.props.uiStore.snackBars.push(newSnack);
    if (options.timeout) this.closeSnackBarAt(newSnack.id, options.timeout);
    if (this.props.uiStore.snackBars.length > this.maxLength)
      this.closeSnackBar(this.props.uiStore.snackBars[0].id);
  }

  renderSnackBars() {
    let visibleCount = 0;
    let elements = [];
    for (const { SnackBar, msg, ref, open } of this.props.uiStore.snackBars) {
      elements.push(
        <SnackBar
          key={msg}
          ref={ref}
          bottom={open ? `${visibleCount * 60 + 5}px` : ""}
        />
      );
      if (open) visibleCount++;
    }
    return elements;
  }

  render() {
    return <>{this.renderSnackBars()}</>;
  }
}

const _SnackBarsHandler = React.forwardRef((props, ref) => {
  const uiStore = useUIStore();
  const location = useLocation();

  return (
    <SnackBarsHandler
      {...props}
      uiStore={uiStore}
      location={location}
      ref={ref}
    />
  );
});

export default _SnackBarsHandler;
