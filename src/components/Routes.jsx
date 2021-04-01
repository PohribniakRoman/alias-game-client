import { BrowserRouter, Route, Switch } from "react-router-dom";
import ProtectedRoute from "../hooks/ProtectedRoute";
import Home from "./Home";
import Login from "./auth/login";
import Register from "./auth/Register";

export default function Routes() {
  return (
    <BrowserRouter>
      <section className="auth__wrapper">
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/registrate">
            <Register />
          </Route>
          <ProtectedRoute component={Home} path="/home" />
        </Switch>
      </section>
    </BrowserRouter>
  );
}
