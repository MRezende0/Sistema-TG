import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { isAuthenticated } from "./services/auth";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Dashboard from "./pages/Dashboard";
import Grupos from "./pages/Grupos";
import Bancas from "./pages/Bancas";
import Perfil from "./pages/Perfil";
import Usuarios from "./pages/Usuarios";
import Tarefas from "./pages/Tarefas";
import Grupo from "./pages/Grupo";
import Logout from "./pages/Logout";
import Projeto from "./pages/Projeto";

const AuthRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated() ? (
        <Redirect to={{ pathname: "/", state: { from: props.location } }} />
      ) : (
        <Component {...props} />
      )
    }
  />
);
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/", state: { from: props.location } }} />
      )
    }
  />
);
const IndexRoute = ({ ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated() ? (
          <Redirect
            to={{ pathname: `/dashboard`, state: { from: props.location } }}
          />
        ) : (
          <Redirect
            to={{ pathname: "/signin", state: { from: props.location } }}
          />
        )
      }
    />
  );
};

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <IndexRoute exact path="/" />

      <AuthRoute path="/signin" component={SignIn} />
      <AuthRoute path="/signup" component={SignUp} />

      <Route path="/undefined">
        <Redirect to="/" />
      </Route>

      <PrivateRoute path="/grupo" component={Grupo} />
      <PrivateRoute path="/dashboard" component={Dashboard} />
      <PrivateRoute path="/grupos" component={Grupos} />
      <PrivateRoute path="/bancas" component={Bancas} />
      <PrivateRoute path="/perfil" component={Perfil} />
      <PrivateRoute path="/usuarios" component={Usuarios} />
      <PrivateRoute path="/tarefas" component={Tarefas} />
      <PrivateRoute path="/projeto" component={Projeto} />

      <PrivateRoute path="/logout" component={Logout} />
      <Route path="*" component={() => <h1>Page not found</h1>} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
