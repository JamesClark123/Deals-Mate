import { makeStyles } from "@material-ui/core";

const itemCardStyles = makeStyles((theme) => ({
  tileStyle: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    overflow: "hidden",
    backgroundColor: "white",
    height: "10vh",
    padding: `calc(10vh * .1)`,
  },
  contentContainer: {
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  imgContainerStyle: {
    minWidth: "10vh",
    width: "10vh",
    height: "100%",
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  imgStyle: {
    height: "100%",
  },
  iconBlock: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
  },
  itemNameFont: {
    fontSize: "1em",
    fontWeight: 700,
    marginTop: "10px",
    marginBottom: "0px",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    overflow: "hidden",
    width: "100%",
    cursor: "pointer",
  },
  prices: {
    display: "inline-flex",
    alignItems: "center",
  },
  oldPriceFont: {
    fontSize: ".7em",
    margin: "0px",
    textDecoration: "line-through",
    color: (props) => (props.hasNewPrice ? theme.primary : "black"),
  },
  newPriceFont: {
    fontSize: ".8em",
    margin: "0px",
    marginLeft: "2px",
    color: (props) => (props.hasNewPrice ? theme.primary : "black"),
  },
  textBlock: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    width: "calc(95% - 10vh)",
    margin: "0 0 0 10px",
  },
  lowerTextBlock: {
    height: "50%",
    display: "flex",
    flexDirection: "column",
    margin: "1px 0 0 0",
    justifyContent: "space-evenly",
  },
  title: {
    height: "50%",
    display: "flex",
    alignItems: "flex-end",
    width: "100%",
  },
  actionIcon: {
    width: "18px",
    height: "18px",
    cursor: "pointer",
    margin: "0 5px 0 0",
  },
}));

export default itemCardStyles;
