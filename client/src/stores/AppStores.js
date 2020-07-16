import React, { createContext } from "react";

import FriendsStore from "stores/FriendsStore";

export const FriendsContext = createContext();

export class AppStore {
  constructor() {
    this.friendsStore = new FriendsStore();
    this.storeProviders = this.storeProviders.bind(this);
  }

  storeProviders = props => {
    return (
      <>
        <FriendsContext.Provider value={this.friendsStore}>
          {props.children}
        </FriendsContext.Provider>
      </>
    );
  };
}
