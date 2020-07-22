import { makeStyles } from "@material-ui/core/styles";

const listStyles = makeStyles(theme => ({
  gridList: {
    justifyContent: "space-evenly"
  },
  shoppingListsContainer: {
    marginLeft: "10vw",
    marginRight: "10vw",
    marginTop: "10vh"
  },
  shoppingListText: {
    font: theme.typography.fontFamily,
    fontSize: "2em",
    fontWeight: 500,
    letterSpacing: "0em",
    color: "black"
  },
  imageContainer: {
    height: "300px",
    overflow: "hidden",
    borderRadius: "15px 15px 0px 0px"
  },
  titleContainer: {
    width: "100%",
    marginBottom: "0px",
    alignSelf: "center",
    textAlign: "center"
  },
  newListGrid: {
    padding: "0px !important",
    width: "288px !important",
    height: "400px !important",
    marginTop: "20px"
  },
  newList: {
    backgroundColor: "white",
    width: "100%",
    height: "100%",
    borderRadius: "15px 15px 15px 15px"
  },
  addButton: {
    width: "2em",
    height: "2em"
  },
  newListTitle: {
    textAlign: "center"
  },
  countStyle: { marginTop: "5px" },
  listTile: {
    backgroundColor: "white",
    marginRight: "20px",
    borderRadius: "15px",
    marginTop: "20px",
    zIndex: 1,
    padding: "0px !important",
    width: "288px !important",
    height: "400px !important"
  },
  hoverTransition: {
    position: "absolute",
    width: "100%",
    height: "100%",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    borderRadius: "15px",
    zIndex: 2,
    cursor: "pointer",
    backgroundColor: "rbga(0,0,0,0)",
    webkitTransition: "background-color 300ms linear",
    msTransition: "background-color 300ms linear",
    transition: "background-color 300ms linear",
    "&:hover": {
      cursor: "pointer",
      backgroundColor: "rgba(128, 128, 128, 0.20)",
      zIndex: 2,
      webkitTransition: "background-color 300ms linear",
      msTransition: "background-color 300ms linear",
      transition: "background-color 300ms linear"
    }
  }
}));

export default listStyles;
