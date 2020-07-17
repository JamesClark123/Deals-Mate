import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { withRouter } from "react-router-dom";

import { useLogin } from "auth/AuthContext";
import { Button } from "@material-ui/core";
import Spinner from "components/utils/spinner";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import FormContainer from "styles/pages/login_styles";

function Login(props) {
  const [state, setState] = useState({
    email: "",
    password: "",
    error: "",
    redirectToReferer: false,
    loading: false
  });
  const login = useLogin();

  const handleChange = name => event => {
    setState({ ...state, error: "", [name]: event.target.value });
  };

  function handleSubmit(event) {
    event.preventDefault();
    setState({ ...state, loading: true });
    // define user
    const { email, password } = state;
    const user = { email, password };
    // sign user in
    login(user);
  }

  const { email, password, error, loading, redirectToReferer } = state;
  const { classes } = props;
  return redirectToReferer ? (
    <Redirect to="/lists" />
  ) : (
    <div className={classes.formContainer}>
      <div className={classes.formDetails}>
        <h1>Sign In</h1>
        <div
          className={classes.formAlert}
          style={{ display: error ? "" : "none" }}
        >
          {error}
        </div>
        {loading ? (
          <div>
            <Spinner />
          </div>
        ) : (
          ""
        )}
        <TextField
          id="Email"
          label="Email"
          type="email"
          variant="outlined"
          onChange={handleChange("email")}
          value={email}
          className={classes.formTextArea}
        />
        <TextField
          id="Password"
          label="Password"
          type="password"
          variant="outlined"
          autoComplete="current-password"
          onChange={handleChange("password")}
          value={password}
          className={classes.formTextArea}
        />
        <Button
          variant="contained"
          size="large"
          type="submit"
          buttonstyle={{ borderRadius: 25, width: "15vw" }}
          style={{ borderRadius: 25, width: "15vw" }}
          className={classes.formButton}
          onClick={handleSubmit}
        >
          Log In
        </Button>
        <p className={classes.createAccount}>
          Don't have an account?{" "}
          <Link to="/register" className={classes.createLink}>
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}

export default withRouter(withStyles(FormContainer)(Login));
