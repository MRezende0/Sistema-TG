import React, { Component } from "react";
import api from "../services/api";
import { NavLink } from "react-router-dom";

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      email: null,
      password: null,
      phone: null,
      course_id: null,
      ra: null,

      error: null,

      courses: [],
    };
  }

  async componentDidMount() {
    const response = await api.get("/course");
    this.setState({ courses: response.data });
  }

  handleSignUp = async (e) => {
    e.preventDefault();
    const { name, email, password, phone, course_id, ra } = this.state;
    try {
      await api.post("/create/student", {
        name,
        email,
        password,
        phone,
        course_id,
        RA: ra,
      });
      this.props.history.push("/signin");
    } catch (err) {
      console.log(err);
      this.setState({ error: "Ocorreu um erro ao registrar sua conta. T.T" });
    }
  };

  render() {
    return (
      <div id="app">
        <section className="s-login">
          <div className="login-banner">
            <div className="background">
              <h3>Um jeito facil e rapido de gerenciar seu tcc ⚡</h3>
              <img src="./img/student.png" alt="" className="student" />

              <div className="circle circle-01">
                <img src="./img/emoji.png" alt="" />
              </div>

              <div className="circle circle-02">
                <img src="./img/emoji-2.png" alt="" />
              </div>
            </div>
          </div>
          <div className="login">
            <div className="container-login">
              <img src="/img/logo.png" className="logo" alt="" />

              <form className="form" onSubmit={this.handleSignUp}>
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
                  <label htmlFor="">RA</label>
                  <div className="input">
                    <input
                      type="text"
                      onChange={(e) => this.setState({ ra: e.target.value })}
                    />
                  </div>
                </div>
                <button className="btn btn-primary">Cadastrar</button>
                <NavLink to="/signin" className="cadastre-se">
                  Já possui conta? <span>Entrar</span>
                </NavLink>
              </form>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default SignUp;
