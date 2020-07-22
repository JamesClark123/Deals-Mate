import React, { createContext } from "react";

import DataStore from "stores/DataStore";
import UIStore from "stores/UIStore";

export const DataContext = createContext();
export const UIContext = createContext();

export class StoresProvider extends React.Component {
  constructor(props) {
    super(props);
    this.dataStore = new DataStore();
    this.uiStore = new UIStore();
  }

  render() {
    return (
      <DataContext.Provider value={this.dataStore}>
        <UIContext.Provider value={this.uiStore}>
          {this.props.children}
        </UIContext.Provider>
      </DataContext.Provider>
    );
  }
}
