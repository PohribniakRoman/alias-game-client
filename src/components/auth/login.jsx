import { useState } from "react";
import { Link } from "react-router-dom";
import { Endpoints } from "../../Endpoints";
import SendData from "../../hooks/SendData";

function trimmer(str) {
  return str
    .split("")
    .filter((char) => char !== " ")
    .join("")
    .toLocaleLowerCase();
}

export default function Login({ loginData }) {
  //variables
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  //parse answer
  async function checkCandidate(promise) {
    const resp = await (await promise).json();
    loginData(resp);
  }
  //check and send data
  function SendForm(event) {
    event.preventDefault();
    if (trimmer(login).length > 6 && trimmer(password).length > 6) {
      checkCandidate(
        SendData(`${Endpoints.host + Endpoints.login}`, {
          login: trimmer(login),
          password: trimmer(password),
        })
      );
    } else {
      alert("Login or password is shorter than necessary");
    }
  }

  return (
    <section className="auth">
      <div className="auth__container">
        <form onSubmit={SendForm}>
          <h1>
            Hello!Welcome back to
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
          <input className="" type="submit" value="Login" />
        </form>
        <div className="auth__change">
          Don't have an account yet?{" "}
          <Link to="/registrate">
            <b>Signup Now</b>
          </Link>
        </div>
      </div>
      <div className="auth__container">
        <div className="auth__content">
          <h1>Alias and what it means!</h1>
          Alias is a board game, where the objective of the players is to
          explain words to each other. Hence, Alias is similar to Taboo, but the
          only forbidden word in the explanations is the word to be explained.
          The game is played in teams of varying size, and fits well as a party
          game for larger crowds. The game is very competitive.
        </div>
      </div>
    </section>
  );
}
