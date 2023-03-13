import React, { Component } from "react";
import api from "../services/api";
import NavBar from "../components/NavBar";
import Notification from "../components/Notification";

class Usuarios extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      email: null,
      password: null,
      phone: null,
      course_id: null,
      type: null,

      error: null,

      courses: [],
      types: [],

      users: [],
    };
  }

  async deleteUser(id) {
    await api.delete(`/user/remove/${id}`);
    window.location.reload(false);
  }

  createUser = async (e) => {
    e.preventDefault();
    const { name, email, password, phone, course_id, type } = this.state;
    const data = { name, email, password, phone, course_id, type };

    const response = await api.post("/user/add", data);
    if (response.data.menssage === "Cadastrado com successo!") {
      window.location.reload(false);
    }
  }

  async componentDidMount() {
    let response = await api.get("/user/list/all");
    const data = response.data;
    this.setState({ users: data });

    response = await api.get("/course");
    this.setState({ courses: response.data });
  }

  toggleModal(e) {
    e.preventDefault()
    var modal = document.querySelector("#modal");
    modal.classList.toggle("onoff");
  }

  render() {
    return (
      <NavBar>
        <section className="main usuarios">
          <div className="container">
            <div className="header">
              <div className="text">
                <h4>Usuários</h4>
                <p>Crie, visualize, delete e edite usuários.</p>
              </div>
              <Notification />
            </div>

            <div className="s-search">
              <div className="search">
                <div className="campo_input">
                </div>

                <p>{this.state.users.length} resultados</p>
              </div>

              <button className="btn-primary" onClick={this.toggleModal}>
                Cadastrar
              </button>
            </div>

            <div className="table">
              <table>
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>Tipo</th>
                    <th>Email</th>
                    <th>Celular</th>
                    <th>Curso</th>
                    <th>Opções</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.users.map((user) => (
                    <tr key={user.id}>
                      <td>{user.name}</td>
                      <td>{user.type}</td>
                      <td>{user.email}</td>
                      <td>{user.phone}</td>
                      <td>{user.course}</td>
                      <td>
                        <div className="table-btn">
                          <button onClick={() => this.deleteUser(user.id)}>
                            <img src="./img/icon/trash.svg" alt="" />
                          </button>
                        </div>
                      </td>
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
          <form className="modal-content" onSubmit={this.createUser}>
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
              <div className="form">
                <div className="campo_input">
                  <label htmlFor="">Nome</label>
                  <div className="input">
                    <input
                      type="name"
                      onChange={(e) => this.setState({ name: e.target.value })}
                    />
                  </div>
                </div>
                <div className="campo_input">
                  <label htmlFor="">Email</label>
                  <div className="input">
                    <input
                      type="email"
                      onChange={(e) => this.setState({ email: e.target.value })}
                    />
                  </div>
                </div>
                <div className="campo_input">
                  <label htmlFor="">Senha</label>
                  <div className="input">
                    <input
                      type="password"
                      onChange={(e) =>
                        this.setState({ password: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="campo_input">
                  <label htmlFor="">Telefone/Celular</label>
                  <div className="input">
                    <input
                      type="text"
                      onChange={(e) => this.setState({ phone: e.target.value })}
                    />
                  </div>
                </div>
                <div className="campo_input">
                  <label htmlFor="">Curso</label>
                  <div className="input">
                    <select
                      name="course_id"
                      id="course_id"
                      onChange={(e) =>
                        this.setState({ course_id: e.target.value })
                      }
                    >
                      <option value={null} key={null}>
                        Selecione
                      </option>
                      {this.state.courses.map((course) => (
                        <option value={course.id} key={course.id}>
                          {course.title}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="campo_input">
                  <label htmlFor="">Tipo de Usuário</label>
                  <div className="input">
                    <select
                      name="type_id"
                      id="type_id"
                      onChange={(e) =>
                        this.setState({ type: e.target.value })
                      }
                    >
                      <option value={null} key={null}>
                        Selecione
                      </option>
                      <option value="admin" key="admin">
                        Administrador
                      </option>
                      <option value="teacher" key="teacher">
                        Professor
                      </option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div div className="modal-footer">
              <button className="btn-primary" type="submit">
                Confirmar
              </button>
            </div>
          </form>
        </div>
      </NavBar>
    );
  }
}

export default Usuarios;
