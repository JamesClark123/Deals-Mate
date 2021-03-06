import { makeStyles } from "@material-ui/core";

const SignupStyles = makeStyles((theme) => ({
  formContainer: {
    width: "100vw",
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  formDetails: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  formAlert: {
    color: "red",
  },
  formSuccess: {
    color: "green",
  },
  formTextArea: {
    marginTop: "40px",
    width: "25vw",
    minWidth: "240px",
  },
  formButton: {
    marginTop: "30px",
    minWidth: "110px",
    maxWidth: "185px",
    backgroundColor: theme.primary,
    color: "white",
    borderRadius: 25,
    width: "15vw",
  },
  createAccount: {
    marginTop: "30px",
  },
  createLink: {
    color: theme.primary,
  },
}));

export default SignupStyles;
