import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { getToken } from "../services/auth";
import jwt_decode from "jwt-decode";

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userType: "",

      error: null,
    };
  }

  async componentDidMount() {
    const apiToken = getToken();
    const user = await jwt_decode(apiToken);

    this.setState({ userType: user.userType });
  }

  render() {
    return (
      <div id="app">
        <nav>
          <img src="./img/logo.png" className="logo" alt="" />
          <ul>
            {this.state.userType === "teacher" ? (
              <li>
                <NavLink to={`/dashboard`} activeClassName="btn-active">
                  <img src="./img/icon/dashboard.png" alt="" />
                  Dashboard
                </NavLink>
              </li>
            ) : (
              ""
            )}
            {this.state.userType === "student" ? (
              <li>
                <NavLink to={`/projeto`} activeClassName="btn-active">
                  <img src="./img/icon/users.png" alt="" />
                  Meu Grupo
                </NavLink>
              </li>
            ) : (
              ""
            )}
            {this.state.userType === "teacher" ||
            this.state.userType === "admin" ? (
              <li>
                <NavLink to={`/grupos`} activeClassName="btn-active">
                  <img src="./img/icon/users.png" alt="" />
                  Grupos
                </NavLink>
              </li>
            ) : (
              ""
            )}
            <li>
              <NavLink to={`/bancas`} activeClassName="btn-active">
                <img src="./img/icon/calendar.png" alt="" />
                Banca
              </NavLink>
            </li>
            {this.state.userType === "admin" ? (
              <li>
                <NavLink to={`/usuarios`} activeClassName="btn-active">
                  <img src="./img/icon/users.png" alt="" />
                  Usuários
                </NavLink>
              </li>
            ) : (
              ""
            )}
            <li>
              <NavLink to={`/perfil`} activeClassName="btn-active">
                <img src="./img/icon/user.png" alt="" />
                Perfil
              </NavLink>
            </li>
            {/*<li>
              <NavLink to={`/tarefas`} activeClassName="btn-active">
                <img src="./img/icon/check-square.png" alt="" />
                Tarefa
              </NavLink>
            </li>*/}
            <li>
              <NavLink to={`/logout`} activeClassName="btn-active">
                <img src="./img/icon/logout.png" alt="" />
                Sair
              </NavLink>
            </li>
          </ul>
        </nav>
        {this.props.children}
      </div>
    );
  }
}

export default NavBar;
