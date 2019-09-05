import React from "react";
import { getUser } from "../api";
import { isAuthenticated, logout } from "../auth";

const ProfileContainer = theme => ({});

class Profile extends React.Component {
  state = {
    user: "",
    error: ""
  };

  componentDidMount() {
    const token = isAuthenticated().token;
    const userId = isAuthenticated().user._id;

    getUser(userId, token).then(data => {
      if (data.error) {
        this.setState({ error: data.error });
      } else {
        this.setState({ user: data });
      }
    });
  }

  render() {
    const { user } = this.state;

    return (
      <div>
        <h1>Profile Page</h1>
        <h1>Name: {user.name}</h1>
        <button
          onClick={() => {
            logout();
            this.props.history.push("/");
          }}
        >
          Logout
        </button>
      </div>
    );
  }
}

export default Profile;