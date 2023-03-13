import React, { Component } from "react";
import NavBar from "../components/NavBar";
import api from "../services/api";
import { getToken } from "../services/auth";
import jwt_decode from "jwt-decode";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userType: "",

      notifications: [],
    };
  }

  async componentDidMount() {
    let response;
    const apiToken = getToken();
    const user = await jwt_decode(apiToken);
    this.setState({
      userType: user.userType,
    });

    if (user.userType === "student") {
      response = await api.get("/student/group/list/my");
      const data = response.data;
      if (data.length === 0) {
        this.props.history.push("/grupo");
      } else {
        this.props.history.push("/projeto");
      }
    }

    if (user.userType === "admin") {
      this.props.history.push("/grupos");
    }

    response = await api.get("/teacher/my/invitations");
    this.setState({ notifications: response.data });
  }

  async aceitar(link) {
    await api.post("teacher" + link);
    this.props.history.push("/");
  }

  render() {
    return (
      <NavBar>
        <section className="main dashboard dashboard_admin">
          <div className="container">
            <div className="header">
              <div className="text">
                <h4>Dashboard</h4>
                <p>Informações Rápidas</p>
              </div>
              <div className="notification">
                <img src="./img/icon/bell2.svg" alt="" />
              </div>
            </div>

            <div id="entregas" className="list">
              <h5 className="list-title">Convites</h5>

              <ul className="list-card">
                {this.state.notifications.map((notification) => (
                  <div key={notification.id} class="invite">
                    <h6>{notification.message}</h6>
                    <div class="text">
                      <p className="title">{notification.title}</p>
                    </div>
                    <div class="btns">
                      <button
                        class="btn btn-primary"
                        onClick={() => this.aceitar(notification.link)}
                      >
                        Aceitar
                      </button>
                      <button class="btn btn-danger">Recusar</button>
                    </div>
                  </div>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </NavBar>
    );
  }
}

export default Dashboard;
