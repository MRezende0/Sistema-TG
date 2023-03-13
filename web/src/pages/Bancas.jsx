import React, { Component } from "react";
import api from "../services/api";
import { getToken } from "../services/auth";
import jwt_decode from "jwt-decode";
import NavBar from "../components/NavBar";
import moment from "moment";
import Notification from "../components/Notification";

class Bancas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userType: null,
      myBanca: null,
      bancas: [],
      courses: [],
      teachers: [],
      groups: [],

      groupId: null,
      date: null,
      time: null,
      teacher1: null,
      teacher2: null,
    };
  }

  createBanca = async (e) => {
    let response;
    e.preventDefault();
    const { groupId, date, time, teacher1, teacher2 } = this.state;
    const data = {
      groupId,
      presentation: date + " " + time,
      teacher1,
      teacher2,
    };

    response = await api.get(`/student/group/list/id/${groupId}`);
    if (response.data[0].advisor_id !== null) {
      response = await api.post("/admin/create/banca", {
        ...data,
        teacher3: response.data[0].advisor_id,
      });
      if (response.data.message === "Banca criada com sucesso") {
        window.location.reload(false);
      }
    } else {
      alert("Esse Grupo ainda não tem orientador!");
    }
  };

  async remove(id) {
    await api.delete(`/admin/delete/banca/${id}`);
    window.location.reload(false);
  }

  async componentDidMount() {
    let response;
    const apiToken = getToken();
    const user = await jwt_decode(apiToken);
    this.setState({ userType: user.userType });

    if (user.userType === "student") {
      response = await api.get("/student/group/list/my");
      const data = response.data;
      if (data.length > 0) {
        response = await api.get(`/admin/list/banca/${data[0].id}`);
        console.log(response);
        if (response.data.length > 0) {
          this.setState({ myBanca: response.data[0] });
        }
      }
    }

    response = await api.get("/admin/list/banca");
    const data = response.data;
    this.setState({ bancas: data });

    response = await api.get("/course");
    this.setState({ courses: response.data });

    response = await api.get("/user/list/teacher");
    this.setState({ teachers: response.data });

    response = await api.get("/student/group/list");
    this.setState({ groups: response.data });
  }

  toggleModal(e) {
    e.preventDefault();
    var modal = document.querySelector("#modal");
    modal.classList.toggle("onoff");
  }

  render() {
    return (
      <NavBar>
        <section className="main bancas">
          <div className="container">
            <div className="header">
              <div className="text">
                <h4>Bancas</h4>
                <p>Visualize as bancas que ocorrerão na sua instituição.</p>
              </div>
              <Notification />
            </div>

            <div className="s-search">
              <h5 className="title">Todas as Bancas</h5>

              {this.state.userType === "admin" ? (
                <button className="btn-primary" onClick={this.toggleModal}>
                  Cadastrar
                </button>
              ) : (
                ""
              )}
            </div>

            {this.state.myBanca ? (
              <div className="banner">
                <div className="text">
                  <h3>Sua Banca</h3>
                  <h5>{this.state.myBanca.project}</h5>
                </div>

                <div className="info">
                  <div className="info-item">
                    <img src="./img/icon/calendar-white.svg" alt="" />
                    <h6>
                      {moment(this.state.myBanca.presentation).format(
                        "DD/MM/YYYY"
                      )}
                    </h6>
                  </div>
                  <div className="info-item">
                    <img src="./img/icon/clock-white.svg" alt="" />
                    <h6>
                      {moment(this.state.myBanca.presentation).format("hh-mm")}
                    </h6>
                  </div>
                </div>
                <br />
                <br />
                <div className="info">
                  <div className="info-item">
                    <h6>
                      {this.state.myBanca.teacher1} |{" "}
                      {this.state.myBanca.teacher2} |{" "}
                      {this.state.myBanca.teacher3}
                    </h6>
                  </div>
                </div>

                <img src="./img/banner.png" className="banner-img" alt="" />
              </div>
            ) : (
              ""
            )}

            <div className="table">
              <table>
                <thead>
                  <tr>
                    <th>Curso</th>
                    <th>Horário</th>
                    <th>Alunos</th>
                    <th>Tema</th>
                    <th>Banca</th>
                    {this.state.userType === "admin" ? (
                      <th>Opções</th>
                    ) : (
                      <th></th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {this.state.bancas.map((banca) => (
                    <tr key={banca.id}>
                      <td>{banca.course}</td>
                      <td className="white-space">
                        {moment(banca.presentation).format("DD/MM/YYYY hh-mm")}
                      </td>
                      <td className="white-space">
                        <p>{banca.leader}</p>
                      </td>
                      <td className="min-width">{banca.theme}</td>
                      <td className="white-space">
                        <p>{banca.teacher1}</p>
                        <p>{banca.teacher2}</p>
                        <p>{banca.teacher3}</p>
                      </td>
                      {this.state.userType === "admin" ? (
                        <td>
                          <div className="table-btn">
                            <button>
                              <img
                                src="./img/icon/trash.svg"
                                alt=""
                                onClick={() => this.remove(banca.id)}
                              />
                            </button>
                          </div>
                        </td>
                      ) : (
                        <td></td>
                      )}
                      "
                    </tr>
                  ))}
                </tbody>
                <tfoot></tfoot>
              </table>
            </div>
          </div>
        </section>
        <div className="modal" id="modal">
          <div className="background"></div>
          <form className="form modal-content" onSubmit={this.createBanca}>
            <div className="modal-header">
              <p>Cadastro</p>
              <button>
                <img
                  src="./img/icon/times.svg"
                  alt=""
                  onClick={this.toggleModal}
                />
              </button>
            </div>
            <div className="modal-body">
              <div>
                <div className="campo_input">
                  <label htmlFor="group_id">Grupo</label>
                  <div className="input">
                    <select
                      name="group_id"
                      id="group_id"
                      onChange={(e) =>
                        this.setState({ groupId: e.target.value })
                      }
                    >
                      <option value={null} key={null}>
                        Selecione
                      </option>
                      {this.state.groups.map((group) => (
                        <option value={group.id} key={group.id}>
                          {group.title}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="campo_input">
                  <label htmlFor="date">Data</label>
                  <div className="input">
                    <input
                      type="date"
                      id="date"
                      onChange={(e) => this.setState({ date: e.target.value })}
                    />
                  </div>
                </div>

                <div className="campo_input">
                  <label htmlFor="date">Hora</label>
                  <div className="input">
                    <input
                      type="time"
                      id="time"
                      onChange={(e) => this.setState({ time: e.target.value })}
                    />
                  </div>
                </div>

                <div className="campo_input">
                  <label htmlFor="teacher_1">Integrante da Banca</label>
                  <div className="input">
                    <select
                      name="teacher_1"
                      id="teacher_1"
                      onChange={(e) =>
                        this.setState({ teacher1: e.target.value })
                      }
                    >
                      <option value={null} key={null}>
                        Selecione
                      </option>
                      {this.state.teachers.map((teacher) => (
                        <option value={teacher.id} key={teacher.id}>
                          {teacher.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="campo_input">
                  <label htmlFor="teacher_2">Integrante da Banca</label>
                  <div className="input">
                    <select
                      name="teacher_2"
                      id="teacher_2"
                      onChange={(e) =>
                        this.setState({ teacher2: e.target.value })
                      }
                    >
                      <option value={null} key={null}>
                        Selecione
                      </option>
                      {this.state.teachers.map((teacher) => (
                        <option value={teacher.id} key={teacher.id}>
                          {teacher.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-primary">Confirmar</button>
            </div>
          </form>
        </div>
      </NavBar>
    );
  }
}

export default Bancas;
