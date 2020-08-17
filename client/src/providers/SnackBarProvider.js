import React, { createContext, useRef, useState } from "react";

import SnackBarsHandler from "components/SnackBarsHandler";

export const SnackBarContext = createContext();

export function SnackBarProvider(props) {
  let ref = React.createRef();

  return (
    <SnackBarContext.Provider value={ref}>
      <SnackBarsHandler ref={ref} />
      {props.children}
    </SnackBarContext.Provider>
  );
}
