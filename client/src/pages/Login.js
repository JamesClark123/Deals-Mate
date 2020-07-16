import React from "react";
import { Link, Redirect } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { setToken, login } from "auth/";
import { Button } from "@material-ui/core";
import Spinner from "components/utils/spinner";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import FormContainer from "styles/pages/login_styles";

class Login extends React.Component {
  state = {
    email: "",
    password: "",
    error: "",
    redirectToReferer: false,
    loading: false
  };

  componentDidMount() {
    document.body.style.backgroundColor = "white";
  }

  handleChange = name => event => {
    this.setState({ error: "" });
    this.setState({ [name]: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.setState({ loading: true });
    // define user
    const { email, password } = this.state;
    const user = { email, password };
    // sign user up
    login(user).then(data => {
      if (data.error) {
        this.setState({ error: data.error, loading: false });
      }
      // authenticate data
      setToken(data, () => {
        this.setState({
          redirectToReferer: true,
          loading: false
        });
      });
    });
  };

  render() {
    const { email, password, error, loading, redirectToReferer } = this.state;
    const { classes } = this.props;

    if (redirectToReferer) {
      return <Redirect to="/lists" />;
    }

    return (
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
            onChange={this.handleChange("email")}
            value={email}
            className={classes.formTextArea}
          />
          <TextField
            id="Password"
            label="Password"
            type="password"
            variant="outlined"
            autoComplete="current-password"
            onChange={this.handleChange("password")}
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
            onClick={this.handleSubmit}
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
}

export default withRouter(withStyles(FormContainer)(Login));
