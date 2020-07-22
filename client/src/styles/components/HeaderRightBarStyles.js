import { makeStyles } from "@material-ui/styles";

const headerRightBarStyles = makeStyles((theme) => ({
  grow: {
    display: "flex",
    justifyContent: "flex-end",
    flexDirection: "row",
    flexGrow: "1",
    alignItems: "center",
  },
  label: {
    marginLeft: "15px",
    font: theme.typography.fontFamily,
    fontSize: ".6em",
    fontWeight: 250,
    letterSpacing: "0em",
    color: "black",
    whiteSpace: "nowrap",
  },
  badgeColor: {
    color: theme.primary,
  },
  accountCircle: {
    color: theme.primary,
    width: "1.5em",
    height: "1.5em",
    marginLeft: "40px",
  },
  profile: {
    marginLeft: "5px",
    font: theme.typography.fontFamily,
    fontSize: ".6em",
    fontWeight: 250,
    letterSpacing: "0.1em",
    color: "black",
    whiteSpace: "nowrap",
  },
}));

export default headerRightBarStyles;
