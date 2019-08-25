import React, { useState } from "react";
import { makeStyles } from "@material-ui/styles";
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

const friendsPageStyles = makeStyles(theme => ({
  pageContainer: {
    width: "100vw",
    height: "100vh",
    backgroundColor: "WhiteSmoke",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center"
  },
  contentContainer: {
    width: "30vw",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between"
  },
  headerTitleFont: {
    margin: "15vh 0px 0px 0px",
    fontSize: "1em",
    fontWeight: 700
  },
  tabsStyles: {
    marginTop: "30px",
    width: "100%"
  },
  tabStyle: {
    fontWeight: 700
  },
  peopleContainer: {
    width: "100%",
    height: "60vh",
    overflowY: "scroll",
    scrollbarWidth: "none",
    msOverflowStyle: "none",
    "&::-webkit-scrollbar": {
      width: "0px"
    }
  },
  searchStyle: {
    width: "100%",
    background: "white",
    margin: "0px 0px 1px 0px"
  },
  peopleCard: {
    width: "100%",
    height: "90px",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    background: "white",
    marginBottom: "1px"
  },
  avatarAndName: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between"
  },
  avatarStyle: {
    margin: "0px 15px 0px 15px"
  },
  buttonStyle: {
    borderRadius: "20px",
    margin: "0px 20px 0px 0px",
    boxShadow: "none",
    background: "white",
    fontWeight: 700,
    fontSize: ".6em",
    height: "38px",
    "&:hover": {
      background: theme.primary,
      color: "white",
      borderColor: theme.primary
    }
  }
}));

function FriendsPage() {
  const classes = friendsPageStyles();
  const [currentTab, setTab] = useState(0);
  const [currentSearch, setSearch] = useState("");

  function handleChange(event, newTab) {
    setTab(newTab);
  }

  function handleSearchChange(event) {
    setSearch(event.target.value);
  }

  const followingList = [
    "following person 1",
    "following person 2",
    "following person 3",
    "following person 3",
    "following person 3",
    "following person 4",
    "following person 5"
  ];
  const suggestedList = [
    "suggested person",
    "suggested person",
    "suggested person",
    "suggested person",
    "suggested person",
    "suggested person",
    "suggested person"
  ];

  function PeopleCard(props) {
    const { name } = props;
    return (
      <div className={classes.peopleCard}>
        <div className={classes.avatarAndName}>
          <Avatar className={classes.avatarStyle}>
            <AccountCircle />
          </Avatar>
          <p>{name}</p>
        </div>
        <Button variant="outlined" className={classes.buttonStyle} size="large">
          Follow
        </Button>
      </div>
    );
  }

  function makePeoples(list) {
    return list
      .filter(person => person.includes(currentSearch))
      .map((person, index) => <PeopleCard key={index} name={person} />);
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
            ? makePeoples(suggestedList)
            : makePeoples(followingList)}
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