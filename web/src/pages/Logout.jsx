import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { logout } from "../services/auth";

class Logout extends Component {
  componentDidMount() {
		logout();
		this.props.history.push("/");
	};

  render() {
    return (
      <div id="app">
      </div>
    );
  }
}

export default withRouter(Logout);
