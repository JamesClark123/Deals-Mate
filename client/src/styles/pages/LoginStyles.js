const LoginStyles = (theme) => ({
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
  },
  createAccount: {
    marginTop: "30px",
  },
  createLink: {
    color: theme.primary,
  },
});

export default LoginStyles;
