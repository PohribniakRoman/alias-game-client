import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Endpoints } from "../../Endpoints";
import SendData from "../../hooks/SendData";
import Cookies from "universal-cookie";
const cookies = new Cookies();

export default function Register() {
  const history = useHistory();
  //variables
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  //parse answer
  async function checkCandidate(promise) {
    const resp = await (await promise).json();
    if (resp.registrated) {
      cookies.set("user", resp.token, {
        maxAge: resp.token.split("-q1w4/")[1],
      });
      history.push("/");
    } else {
      alert(resp.message);
    }
  }
  //check and send data
  function SendForm(event) {
    event.preventDefault();
    setLogin(login.trim());
    setPassword(password.trim());
    if (
      login.length > 3 &&
      password.length > 3 &&
      password.length < 16 &&
      login.length < 16
    ) {
      checkCandidate(
        SendData(`${Endpoints.host + Endpoints.register}`, {
          login,
          password,
        })
      );
    } else {
      alert("login or password is shorter than necessary");
    }
  }

  return (
    <section className="auth__wrapper">
      <section className="auth">
        <div className="auth__container">
          <form onSubmit={SendForm}>
            <h1>
              Hello!Welcome to
              <br /> Alias!
            </h1>
            <p>Entyer your details below here</p>
            <input
              type="text"
              value={login}
              onChange={(event) => {
                setLogin(event.target.value);
              }}
              name="login"
              required
              placeholder="Login"
            />
            <input
              placeholder="Password"
              type="password"
              onChange={(event) => {
                setPassword(event.target.value);
              }}
              value={password}
              name="password"
              required
            />
            <input className="" type="submit" value="Sign up" />
          </form>
          <div className="auth__change">
            Already have an account?
            <Link to="/login">
              <b>Signin Now</b>
            </Link>
          </div>
        </div>
        <div className="auth__container">
          <div className="auth__content">
            <h1>Alias and what it means!</h1>
            Alias is a board game, where the objective of the players is to
            explain words to each other. Hence, Alias is similar to Taboo, but
            the only forbidden word in the explanations is the word to be
            explained. The game is played in teams of varying size, and fits
            well as a party game for larger crowds. The game is very
            competitive.
          </div>
        </div>
      </section>
    </section>
  );
}
