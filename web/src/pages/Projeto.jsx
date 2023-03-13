import React, { Component } from "react";
import NavBar from "../components/NavBar";
import api from "../services/api";
import { getToken } from "../services/auth";
import jwt_decode from "jwt-decode";

class Projeto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userType: "",
      sub: "",

      group: null,
    };
  }

  async componentDidMount() {
    const apiToken = getToken();
    const user = await jwt_decode(apiToken);
    this.setState({
      userType: user.userType,
      sub: user.sub
    });

    if (user.userType === "student") {
      const response = await api.get("/student/group/list/my");
      const data = response.data;
      if (data.length === 0) {
        this.props.history.push("/grupo");
      } else {
        this.setState({ group: data[0] });
        document.getElementById("editButton").addEventListener("click", () => {
          document.getElementById("edit").click();
        });
      }
    }
  }

  async upload(e) {
    console.log(e)
    var formData = new FormData();
    formData.append("projects", e.target.files[0]);
    await api.post(`student/project/send/zip/${this.state.group.id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }

  render() {
    return (
      <NavBar>
        <section className="main grupo_info">
          <div className="container">
            <div className="header">
              <div className="text">
                <h4>Grupo</h4>
                <p>Crie seu grupo</p>
              </div>
              <div className="notification">
                <img src="./img/icon/bell2.svg" alt="" />
              </div>
            </div>

            <div className="banner-init">
              <h4>{this.state.group && this.state.group.title}</h4>
              <p>{this.state.group && this.state.group.course}</p>
            </div>

            <div className="integrantes">
              <div className="integrantes-row">
                <h6 className="title">Líder do grupo</h6>
                <ul>
                  <li>
                    <div className="integrantes-items">
                      <h6>{this.state.group && this.state.group.leader}</h6>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="integrantes-row">
                <h6 className="title">Professor Orientador</h6>
                <ul>
                  <li>
                    <div className="integrantes-items">
                      <h6>{this.state.group && this.state.group.advisor}</h6>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            <div className="projeto">
              <div className="projeto-header">
                <h6>Repositório</h6>
                <p>Última atualização</p>
              </div>
              <div className="projeto-arquivo">
                <div className="projeto-title">
                  <img src="./img/icon/file-text.png" alt="" />
                  <p>
                  Zip do projeto
                  </p>
                </div>
                <div style={{ display: "flex" }}>
                  <button id="editButton">
                    <img src="./img/icon/edit.svg" alt="" className="edit" />
                  </button>
                  <input id="edit" type="file" hidden onChange={(e) => this.upload(e)} />
                  &#160;&#160;&#160;&#160;&#160;
                  <img 
                    onClick={() => 
                      window.open(
                        `http://localhost/sites/sistema-tg/api/uploads/projects/${this.state.group.id}`, 
                        "_blank"
                      )}
                    src="./img/icon/download.png" 
                    alt="" 
                    className="edit" />
                </div>
              </div>
            </div>

            {/*<div className="projeto">
              <div className="projeto-header">
                <h6>Correções do orientador</h6>
                <p>Última atualização</p>
              </div>
              <div className="projeto-arquivo">
                <div className="projeto-title">
                  <img src="./img/icon/file-text.png" alt="" />
                  <p>
                    Mistura de Agrotóxico em tanques e suas consequências.pdf
                  </p>
                </div>
                <div style={{ display: "flex" }}>
                  <button id="editButton">
                    <img src="./img/icon/edit.svg" alt="" className="edit" />
                  </button>
                  
                  &#160;&#160;&#160;&#160;&#160;
                  <img
                    onClick={() => window.open("someLink", "_blank")}
                    src="./img/icon/eye.svg"
                    alt=""
                    className="edit"
                  />
                </div>
              </div>
            </div>*/}
          </div>
        </section>
      </NavBar>
    );
  }
}

export default Projeto;
