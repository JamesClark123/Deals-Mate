import { makeStyles } from "@material-ui/core/styles";

const addItemStyles = makeStyles((theme) => ({
  paperStyles: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    background: "WhiteSmoke",
    width: "50vw",
  },
  dialogContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "95%",
    padding: "0px",
  },
  addNewItemFont: {
    fontSize: "1em",
    fontWeight: 700,
    marginTop: "30px",
  },
  linkProps: {
    width: "100%",
  },
  inputProps: {
    textAlign: "center",
  },
  textField: {
    backgroundColor: "white",
    width: "75%",
    height: "50px",
    borderRadius: "5px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  pasteLinkFont: {
    fontSize: ".8em",
    fontWeight: 700,
    marginTop: "20px",
    textAlign: "center",
  },
  selectListFont: {
    fontSize: ".8em",
    fontWeight: 700,
    marginTop: "40px",
    textAlign: "center",
  },
  button: {
    fontSize: ".8em",
    fontWeight: 400,
    marginTop: "40px",
    marginBottom: "60px",
    borderRadius: "25px",
    width: "130px",
    backgroundColor: theme.primary,
    color: "white",
  },
}));

export default addItemStyles;
