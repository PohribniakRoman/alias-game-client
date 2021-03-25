import Login from "./auth/login";
import Register from "./auth/Register";
import { Route, Redirect } from "react-router-dom";
import { useState } from "react";
import Cookies from 'universal-cookie';

export default function Auth({ updateStatus, ...rest }) {
  const cookies = new Cookies();
  function loginData(data) {
    updateStatus(data);
    let token = data.token.split("-q1w4/")
    
    cookies.set("user",token.join("-q1w4/"),{maxAge:token[1]})
    
    setStatus(data.isAuthenticated.isAuthenticated.isAuth);
  }
  const [status, setStatus] = useState(rest.isAuthenticated);
  return (
    <div>
      {status ? (
        <Redirect push to="/" />
      ) : (
        <section className="auth__wrapper">
          <Route path="/login">
            <Login loginData={loginData} />
          </Route>
          <Route path="/registrate">
            <Register loginData={loginData} />
          </Route>
        </section>
      )}
    </div>
  );
}
