import React, { Component } from "react";
import { getToken } from "../services/auth";
import jwt_decode from "jwt-decode";
import api from "../services/api";

class Notification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userType: "",

      notifications: [],
    };
  }

  toggleModal(e) {
    e.preventDefault()
    var modal = document.querySelector(".notification-menu");
    modal.classList.toggle("onoff");
  }

  async componentDidMount() {
    const apiToken = getToken();
    const user = await jwt_decode(apiToken);

    this.setState({ userType: user.userType });


    const response = await api.get(`/user/notifications/${user.sub}`);
    this.setState({ notifications: response.data })
  }

  render() {
    return (
      <>
      <div className="notification">
        <div className="notification-btn" onClick={this.toggleModal}>
            <img src="../../../img/icon/bell.svg" alt="" />
            <div className="alert"></div>
        </div>

        <div className="notification-menu">
            <div className="notification-menu-header">
                <p>Notificações</p>
            <img src="../../../img/icon/times.svg" alt="" onClick={this.toggleModal} />
            </div>
            <ul>
              {this.state.notifications.map((notification) => (
                <li key={notification.id}>{notification.message}</li>
              ))}
            </ul>
        </div>
      </div>
      </>
    )
  }
}

export default Notification;
