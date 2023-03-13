import React, { Component } from "react";
import api from "../services/api";
import { getToken } from "../services/auth";
import NavBar from "../components/NavBar";
import jwt_decode from "jwt-decode";

class Perfil extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userType: "",

      name: "...",
      email: "...",
      phone: "...",
      course: "...",
      ra: "...",

      group: "...",
      advisor: "...",

      error: null,

      user: null,
    };
  }

  async componentDidMount() {
    const apiToken = getToken();
    const user = await jwt_decode(apiToken);
    this.setState({ userType: user.userType });

    const response = await api.get(`/user/${user.sub}`);
    const data = response.data[0];
    this.setState({
      name: data.name,
      email: data.email,
      phone: data.phone,
      ra: data.ra,
      course: data.course,
    });

    if (user.userType === "student") {
      const response = await api.get("/student/group/list/my");
      const data = response.data;
      if (data.length > 0) {
        this.setState({
          group: data[0].title,
          advisor: data[0].advisor,
        });
      }
    }
  }

  render() {
    return (
      <NavBar>
        <section className="main perfil">
          <div className="container">
            <div className="header">
              <div className="text">
                <h4>Perfil</h4>
                <p>Crie, visualize e edite seu perfil.</p>
              </div>
            </div>

            <div className="notification">
              <img src="./img/icon/bell2.svg" alt="" />
            </div>

            <div className="profile-card">
              <div className="perfil">
                <div className="text">
                  <h4>{this.state.name}</h4>
                  {this.state.userType === "student" ? (
                    <p>Aluno(a) de {this.state.course}</p>
                  ) : this.state.userType === "admin" ? (
                    <p>Administrador</p>
                  ) : (
                    <p>Professor</p>
                  )}
                </div>
              </div>
              {/*<button className="btn-primary">Editar</button>*/}
            </div>

            <div className="info">
              <div className="sessoes perfil">
                <h4>Perfil</h4>

                <ul>
                  <li>
                    <div className="text">
                      <h6>E-mail</h6>
                      <p>{this.state.email}</p>
                    </div>
                  </li>
                  <li>
                    <div className="text">
                      <h6>Contato</h6>
                      <p>{this.state.phone}</p>
                    </div>
                  </li>
                  {this.state.userType === "student" ? (
                    <li>
                      <div className="text">
                        <h6>Registro Acadêmico</h6>
                        <p>{this.state.ra}</p>
                      </div>
                    </li>
                  ) : (
                    ""
                  )}
                </ul>
              </div>

              {this.state.userType === "student" ? (
                <div className="sessoes trabalho">
                  <h4>Trabalho</h4>

                  <ul>
                    <li>
                      <div className="text">
                        <h6>Título Trabalho</h6>
                        <p>{this.state.group}</p>
                      </div>
                    </li>
                    <li>
                      <div className="text">
                        <h6>Orientador(a)</h6>
                        <p>{this.state.advisor}</p>
                      </div>
                    </li>
                  </ul>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </section>
      </NavBar>
    );
  }
}

export default Perfil;
