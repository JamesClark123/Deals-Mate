import { makeStyles } from "@material-ui/core/styles";

const addItemBarStyles = makeStyles((theme) => ({
  bodyStart: {
    paddingTop: "100px",
  },
  addNewItem: {
    font: theme.typography.fontFamily,
    fontSize: "2em",
    fontWeight: 500,
    letterSpacing: "0em",
    color: "black",
  },
  tipFont: {
    width: "auto",
    color: "darkgray",
    fontSize: ".8em",
    margin: "10px 0 0 0",
  },
  paperLinkContainer: {
    borderRadius: "50px 0px 0px 50px",
    boxShadow: "none",
    borderRight: "1px solid WhiteSmoke",
    display: "flex",
  },
  linkInput: {
    marginLeft: 25,
    marginTop: 10,
    marginBottom: 10,
    width: "25vw",
    fontSize: ".8em",
  },
  paperListContainer: {
    borderRadius: "0px 50px 50px 0px",
    boxShadow: "none",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  addItemButton: {
    marginLeft: 25,
    marginRight: 10,
    backgroundColor: theme.primary,
    fontSize: ".8em",
    color: "white",
  },
}));

export default addItemBarStyles;
