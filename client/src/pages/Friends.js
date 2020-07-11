import React, { useState, useEffect, useRef, useContext } from "react";
import {
  Tabs,
  Tab,
  Avatar,
  Button,
  TextField,
  InputAdornment
} from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";
import SearchIcon from "@material-ui/icons/Search";
import CancelIcon from "@material-ui/icons/Cancel";
import { getAllUsers } from "../components/api/index.js";
import FriendsData from "../components/friends/FriendsDataModle.js";
import FriendsPageStyles from "index/styles/pages/friends_styles.js";

function FriendsPage() {
  const classes = FriendsPageStyles();
  const [currentTab, setTab] = useState(0);
  const [currentSearch, setSearch] = useState("");
  const [state, setState] = useState({
    downloading: false,
    downloaded: false,
    changedLists: false
  });
  let [friendsData, updateFriendsData] = useState(new FriendsData());

  useEffect(() => {
    setState({ ...state, downloading: true });
    friendsData.downloadAllData(() => {
      setState({ ...state, downloading: false });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleChange(event, newTab) {
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
              ? () =>
                  friendsData.addFollowing(id, () =>
                    setState({ ...state, changedLists: !state.changedLists })
                  )
              : () =>
                  friendsData.removeFollowing(id, () =>
                    setState({ ...state, changedLists: !state.changedLists })
                  )
          }
        >
          {currentTab === 1 ? "Follow" : "Unfollow"}
        </Button>
      </div>
    );
  }

  function makePeoples(list) {
    return list
      .filter(person => person.name.includes(currentSearch))
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
                  style={{ color: "silver", margin: "0px 5px 0px 10px" }}
                >
                  <SearchIcon />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment
                  position="end"
                  style={{
                    color: "silver",
                    margin: "0px 5px 0px 0px",
                    cursor: "pointer"
                  }}
                  onClick={() => setSearch("")}
                >
                  <CancelIcon />
                </InputAdornment>
              ),
              style: { height: "50px" }
            }}
          />

          {currentTab === 1
            ? makePeoples(friendsData.suggestedData)
            : makePeoples(friendsData.followingData)}
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

export default FriendsPage;
