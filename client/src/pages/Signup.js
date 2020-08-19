import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";

import signupStyles from "styles/pages/SignupStyles";
import { useShowSnackBar, useRegister } from "hooks";
import { getErrorString } from "js_common";

function Signup() {
  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
  });
  const classes = signupStyles();
  const showSnackBar = useShowSnackBar();
  const register = useRegister();

  const handleChange = (name) => (event) => {
    setState({ ...state, [name]: event.target.value });
  };

  async function handleRegister(user) {
    try {
      setState({
        name: "",
        email: "",
        password: "",
      });
      await register(user);
      showSnackBar(
        "New account created, check your email for a confirmation link."
      );
    } catch (err) {
      const errorMessage = getErrorString(err);
      showSnackBar(errorMessage, { type: "error" });
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const { name, email, password } = state;
    // define user
    const user = {
      name,
      email,
      password,
    };

    handleRegister(user);
  };

  return (
    <div className={classes.formContainer}>
      <div className={classes.formDetails}>
        <h1>Sign Up</h1>
        <TextField
          id="Name"
          label="Name"
          autoFocus={true}
          variant="outlined"
          onChange={handleChange("name")}
          value={state.name}
          className={classes.formTextArea}
        />
        <TextField
          id="Email"
          label="Email"
          variant="outlined"
          onChange={handleChange("email")}
          value={state.email}
          className={classes.formTextArea}
        />
        <TextField
          id="Password"
          label="Password"
          type="password"
          variant="outlined"
          autoComplete="current-password"
          onChange={handleChange("password")}
          value={state.password}
          className={classes.formTextArea}
        />
        <Button
          variant="contained"
          size="large"
          type="submit"
          style={{ borderRadius: 25, width: "15vw" }}
          className={classes.formButton}
          onClick={handleSubmit}
        >
          Register
        </Button>
        <p className={classes.createAccount}>
          Already have an account?{" "}
          <Link to="/" className={classes.createLink}>
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
