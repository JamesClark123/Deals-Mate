import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";

import { useLogin, useShowSnackBar } from "hooks/";
import { Button } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import loginStyles from "styles/pages/LoginStyles";
import { getErrorString } from "js_common";

function Login() {
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const login = useLogin();
  const showSnackBar = useShowSnackBar();
  const classes = loginStyles();

  useEffect(() => {
    document.body.style.backgroundColor = "white";
  }, []);

  const handleChange = (name) => (event) => {
    setState({ ...state, [name]: event.target.value });
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSubmit(event);
    }
  };

  async function handleSubmit(event) {
    event.preventDefault();
    const { email, password } = state;
    const user = { email, password };
    try {
      await login(user);
    } catch (err) {
      const errorMessage = getErrorString(err);
      showSnackBar(errorMessage, { type: "error" });
    }
  }

  const { email, password } = state;
  return (
    <div className={classes.formContainer}>
      <div className={classes.formDetails}>
        <h1>Sign In</h1>
        <TextField
          id="Email"
          label="Email"
          type="email"
          variant="outlined"
          onChange={handleChange("email")}
          onKeyPress={handleKeyPress}
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
          onKeyPress={handleKeyPress}
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

export default withRouter(Login);
