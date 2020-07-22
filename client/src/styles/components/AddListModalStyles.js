import { makeStyles } from "@material-ui/core/styles";

const addItemModalStyles = makeStyles(theme => ({
  paperProps: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    background: "WhiteSmoke",
    width: "50vw"
  },
  dialogContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "95%",
    padding: "0px"
  },
  listTitle: {
    backgroundColor: "white",
    width: "75%",
    height: "50px",
    borderRadius: "5px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  inputDiv: {
    textAlign: "center"
  },
  coverFont: {
    textAlign: "center"
  },
  addNewListFont: {
    fontSize: "1em",
    fontWeight: 700,
    marginTop: "30px"
  },
  pasteLinkFont: {
    fontSize: ".8em",
    fontWeight: 700,
    marginTop: "20px"
  },
  selectListFont: {
    fontSize: ".8em",
    fontWeight: 700,
    marginTop: "40px"
  },
  button: {
    fontSize: ".8em",
    fontWeight: 400,
    marginTop: "40px",
    marginBottom: "60px",
    borderRadius: "25px",
    width: "130px",
    backgroundColor: theme.primary,
    color: "white"
  },
  uploadFont: {
    fontSize: ".6em",
    fontWeight: 400,
    maxWidth: "100px",
    textAlign: "center",
    marginTop: "20px",
    marginBottom: "40px"
  }
}));

export default addItemModalStyles;
