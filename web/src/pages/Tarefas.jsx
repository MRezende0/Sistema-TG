import React, { Component } from "react";
import NavBar from "../components/NavBar";

class Dashboard extends Component {
  render() {
    return (
      <NavBar>
        <section class="main dashboard">
          <div class="container">
            <div class="header">
              <div class="text">
                <h4>Entregas</h4>
                <p>Veja e entregue tarefas</p>
              </div>
              <button class="btn-primary">Criar tarefa</button>
            </div>

            <div class="title-blue">
              <h5>Pendentes</h5>
            </div>

            <div class="list">
              <ul class="list-card">
                <li class="list-card-item">
                  <div class="text">
                    <h5>Tema</h5>
                    <p>Vence 19 de setembro de 2021 às 15h30</p>
                  </div>
                  <button class="btn-outline">Exibir</button>
                </li>
              </ul>

              <ul class="list-card">
                <li class="list-card-item">
                  <div class="text">
                    <h5>Resumo</h5>
                    <p>Vence 19 de setembro de 2021 às 15h30</p>
                  </div>
                  <button class="btn-outline">Exibir</button>
                </li>
              </ul>
            </div>

            <div class="title-blue">
              <h5>Entregues</h5>
              <div class="input">
                <div class="campo_input">
                  <div class="input">
                    <input type="select" placeholder="Todos" />
                  </div>
                </div>
              </div>
            </div>

            <div class="list">
              <ul class="list-card">
                <li class="list-card-item">
                  <div class="text">
                    <h5>Tema</h5>
                    <p>Aceito</p>
                  </div>
                  <img src="./img/icon/coment3.svg" alt="" />
                </li>
              </ul>

              <ul class="list-card">
                <li class="list-card-item">
                  <div class="text">
                    <h5>Resumo</h5>
                    <p>Entregue</p>
                  </div>
                  <img src="./img/icon/coment3.svg" alt="" />
                </li>
              </ul>
            </div>
          </div>
        </section>
      </NavBar>
    );
  }
}

export default Dashboard;
