import React, { Component } from "react";
import api from "../services/api";
import { login } from "../services/auth";
import { NavLink } from "react-router-dom";

class SignIn extends Component {
  state = {
    email: null,
    password: null,
    
    error: null,
  };

  handleSignIn = async (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    try {
      const response = await api.post("/user/login", {
        email,
        password,
      });
      if (response.data.token) {
        login(response.data.token);
        this.props.history.push("/");
      } else {
        console.log(response.data);
      }
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
              <h4>Um jeito facil e rapido de gerenciar seu tcc.</h4>

              <form className="form" onSubmit={this.handleSignIn}>
                <div className="campo_input">
                  <label htmlFor="">Email</label>
                  <div className="input">
                    <input type="email" onChange={(e) => this.setState({ email: e.target.value })} />
                  </div>
                </div>
                <div className="campo_input">
                  <label htmlFor="">Senha</label>
                  <div className="input">
                    <input type="password" onChange={(e) => this.setState({ password: e.target.value })} />
                  </div>
                </div>
                <button className="btn btn-primary">Entrar</button>
                <NavLink to="/signUp" className="cadastre-se">
                  Ainda não possui conta? <span>Cadastrar-se</span>
                </NavLink>
              </form>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default SignIn;
