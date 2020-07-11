import { makeStyles } from "@material-ui/core/styles";

const profileStyles = makeStyles(theme => ({
  pageContainer: {
    width: "100%",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  pageStart: {
    margin: "0px 0px 0px 0px",
    fontWeight: 400
  },
  avatarStyle: {
    margin: "15px 0px 15px 0px",
    width: "15vh",
    height: "15vh"
  },
  userName: {
    fontSize: "1.5em",
    fontWeight: 400,
    margin: "20px 0px 20px 0px"
  },
  signOutButton: {
    backgroundColor: theme.primary,
    color: "white",
    fontSize: "1em",
    fontWeight: 400,
    borderRadius: "25px"
  }
}));

export default profileStyles;
