import { makeStyles } from "@material-ui/styles";

const friendsPageStyles = makeStyles(theme => ({
  pageContainer: {
    width: "100vw",
    height: "100vh",
    backgroundColor: "WhiteSmoke",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center"
  },
  inputAdornment: {
    color: "silver",
    margin: "0px 5px 0px 10px"
  },
  endInputAdornment: {
    color: "silver",
    margin: "0px 5px 0px 0px",
    cursor: "pointer"
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
    height: "50px",
    justifyContent: "center",
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

export default friendsPageStyles;
