import { makeStyles } from "@material-ui/styles";

const headerStyles = makeStyles((theme) => ({
  topBar: {
    boxShadow: "none",
  },
  toolBar: {
    backgroundColor: "white",
  },
  logoAndName: {
    display: "flex",
    cursor: "pointer",
  },
  logo: {
    width: "30px",
  },
  dealsMateGrid: {
    marginLeft: "20px",
  },
  dealsMateName: {
    font: theme.typography.fontFamily,
    fontSize: "1em",
    fontWeight: 250,
    letterSpacing: "0.5em",
    color: "black",
  },
}));

export default headerStyles;
