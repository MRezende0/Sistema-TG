import React, { Component } from "react";
import NavBar from "../components/NavBar";
import api from "../services/api";
import { getToken } from "../services/auth";
import jwt_decode from "jwt-decode";
import moment from "moment";

class Grupos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userType: "",
      groups: [],
    };
  }

  async componentDidMount() {
    const apiToken = getToken();
    const user = await jwt_decode(apiToken);

    this.setState({ userType: user.userType });

    let response;

    response = await api.get("/student/group/list");
    this.setState({ groups: response.data });

    console.log(response.data);
  }

  render() {
    return (
      <NavBar>
        <section class="main grupo">
          <div class="container">
            <div class="header">
              <div class="text">
                <h4>Grupos</h4>
                <p>Grupos aceitos e informações </p>
              </div>
              <div class="notification">
                <img src="./img/icon/bell.svg" alt="" />
              </div>
            </div>

            <div class="cards">
              {this.state.groups.map((group) => (
                <div class="card">
                  <div class="card-header">
                    <h5>{group.title}</h5>
                    <p>{group.course}</p>
                  </div>

                  <div class="info">
                    <div class="text">
                      <p class="titulo">Orientador</p>
                      <p class="texto-info">{group.advisor || "..."}</p>
                    </div>
                    <div class="text">
                      <p class="titulo">Banca</p>
                      <p class="texto-info">
                        {group.presentation
                          ? moment(group.presentation).format(
                              "DD/MM/YYYY hh:mm"
                            )
                          : "A Definir"}
                      </p>
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItens: "center" }}>
                    <img
                      style={{ marginRight: "10px", cursor: "pointer" }}
                      onClick={() =>
                        window.open(
                          `http://localhost/sites/sistema-tg/api/uploads/projects/${group.id}`,
                          "_blank"
                        )
                      }
                      src="./img/icon/download.png"
                      alt=""
                      className="edit"
                    />
                    <h6>Projeto</h6>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </NavBar>
    );
  }
}

export default Grupos;
