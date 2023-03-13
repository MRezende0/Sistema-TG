import React, { Component } from "react";
import NavBar from "../components/NavBar";
import api from "../services/api";

class Grupo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: null,

      theme_id: null,
      student_id: null,
      user_id: null,

      teacher_id: null,

      error: null,

      themes: [],
      students: [],
      teachers: [],
    };
  }

  async componentDidMount() {
    let response;

    response = await api.get("/user/themes/list");
    this.setState({ themes: response.data });

    // estudantes
    response = await api.get("/user/list/student");
    this.setState({ students: response.data });

    //professores
    response = await api.get("/user/list/teacher");
    this.setState({ teachers: response.data });
  }

  toggleModal(e) {
    e.preventDefault()
    var modal = document.querySelector("#modal");
    modal.classList.toggle("onoff");
  }

  create = async (e) => {
    e.preventDefault();
    const { title, theme_id, student_id, teacher_id } = this.state;
    const data = { termId: 1, title, themeId: theme_id };

    let response = await api.post("/student/group/create", data);
    if (response.data.message === "Grupo criado com sucesso") {
      await api.post("/student/group/invitation", {
        groupId: response.data.id,
        studentId: student_id,
      });
      await api.post("/student/invite/advisor", {
        groupId: response.data.id,
        teacherId: teacher_id,
      });

      this.props.history.push("/projeto");
    }
  };

  render() {
    return (
      <>
        <NavBar></NavBar>
        <section className="main grupo_aluno">
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

            <div className="start">
              <img src="./img/grupo.png" alt="" />
              <div className="text">
                <h3>Aqui inicia sua tragetória</h3>
                <p>
                  Crie seu grupo, convide um orientador e começe sua tragetória
                </p>
                <button className="btn-primary" onClick={this.toggleModal}>
                  Começar
                </button>
              </div>
            </div>
          </div>
        </section>

        <div className="modal" id="modal">
          <div className="background"></div>
          <form className="modal-content" onSubmit={this.create}>
            <div className="modal-header">
              <p>Cadastro</p>
              <button onClick={this.toggleModal}>
                <img src="./img/icon/times.svg" alt="" />
              </button>
            </div>
            <div className="modal-body">
              <div className="campo_input">
                <label htmlFor="title">Título</label>
                <div className="input">
                  <input
                    type="text"
                    id="title"
                    onChange={(e) => this.setState({ title: e.target.value })}
                    placeholder="Digite o título do seu trabalho"
                  />
                </div>
              </div>
              <div className="campo_input">
                <label htmlFor="theme">Tema</label>
                <div className="input">
                  <select
                    name="theme_id"
                    id="theme_id"
                    onChange={(e) =>
                      this.setState({ theme_id: e.target.value })
                    }
                  >
                    <option value={null} key={null}>
                      Selecione
                    </option>
                    {this.state.themes.map((theme) => (
                      <option value={theme.id} key={theme.id}>
                        {theme.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="campo_input">
                <label htmlFor="">Solicite um Orientador</label>
                <div className="input">
                  <select
                    name="teacher_id"
                    id="teacher_id"
                    onChange={(e) =>
                      this.setState({ teacher_id: e.target.value })
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
                <label htmlFor="">Solicite o outro integrante do grupo</label>
                <div className="input">
                  <select
                    name="student_id"
                    id="student_id"
                    onChange={(e) =>
                      this.setState({ student_id: e.target.value })
                    }
                  >
                    <option value={null} key={null}>
                      Selecione
                    </option>
                    {this.state.students.map((student) => (
                      <option value={student.id} key={student.id}>
                        {student.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-primary">Confirmar</button>
            </div>
          </form>
        </div>
      </>
    );
  }
}

export default Grupo;
