/**
 * This is a sample from a WIP website I'm developing called DealsMate that will allow people to watch prices on Amazon products.
 * The sample is of a front-end page for searching for friends.
 * I felt it would be a interesting sample to show off some of the newer concepts in React,
 * such as functional components and hooks.
 */

import React, { useState, useEffect } from "react";
import { observer } from "mobx-react";
import {
  Tabs,
  Tab,
  Avatar,
  Button,
  TextField,
  InputAdornment,
} from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";
import SearchIcon from "@material-ui/icons/Search";
import CancelIcon from "@material-ui/icons/Cancel";
import FriendsPageStyles from "styles/pages/friends_styles";
import { useDataStore } from "hooks/";

function FriendsPage() {
  const dataStore = useDataStore(); // hook into a mobx store
  const classes = FriendsPageStyles(); // in-js styles generated with material-ui
  const [currentTab, setTab] = useState(0);
  const [currentSearch, setSearch] = useState("");

  useEffect(() => {
    dataStore.downloadAllData();
  }); // useEffect can be used in this way to load some data once when a component loads

  function handleChange(_event, newTab) {
    setTab(newTab);
  }

  function handleSearchChange(event) {
    setSearch(event.target.value);
  }

  function PeopleCard(props) {
    const { name, id } = props;
    return (
      <div className={classes.peopleCard}>
        <div className={classes.avatarAndName}>
          <Avatar className={classes.avatarStyle}>
            <AccountCircle />
          </Avatar>
          <p>{name}</p>
        </div>
        <Button
          variant="outlined"
          className={classes.buttonStyle}
          size="large"
          onClick={
            currentTab === 1
              ? () => dataStore.addFollowing(id)
              : () => dataStore.removeFollowing(id)
          }
        >
          {currentTab === 1 ? "Follow" : "Unfollow"}
        </Button>
      </div>
    );
  }

  function makePeoples(list) {
    return list
      .filter((person) => person.name.includes(currentSearch))
      .map((person, index) => (
        <PeopleCard key={index} name={person.name} id={person._id} />
      ));
  }

  function SearchArea() {
    return (
      <>
        <div className={classes.peopleContainer}>
          <TextField
            value={currentSearch}
            autoFocus={true}
            placeholder="search"
            className={classes.searchStyle}
            onChange={handleSearchChange}
            InputProps={{
              disableUnderline: true,
              startAdornment: (
                <InputAdornment
                  position="start"
                  className={classes.inputAdornment}
                >
                  <SearchIcon />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment
                  position="end"
                  className={classes.endInputAdornment}
                  onClick={() => setSearch("")}
                >
                  <CancelIcon />
                </InputAdornment>
              ),
            }}
          />

          {currentTab === 1
            ? makePeoples(dataStore.suggestedData)
            : makePeoples(dataStore.followingData)}
        </div>
      </>
    );
  }

  return (
    <div className={classes.pageContainer}>
      <div className={classes.contentContainer}>
        <h1 className={classes.headerTitleFont}>Friends</h1>
        <Tabs
          value={currentTab}
          onChange={handleChange}
          variant="fullWidth"
          className={classes.tabsStyles}
        >
          <Tab label="following" className={classes.tabStyle} />
          <Tab label="suggested" className={classes.tabStyle} />
        </Tabs>
        <SearchArea />
      </div>
    </div>
  );
}

export default observer(FriendsPage); // linking the react component to be 'reactive' to mobx store changes
