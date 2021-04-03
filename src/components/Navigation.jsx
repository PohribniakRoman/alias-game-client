import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import Cookies from 'universal-cookie';
const cookies = new Cookies();

export default function Navigation() {
  const history = useHistory();
  return (
    <section className="nav">
      <ul className="nav__menu">
        <li className="nav__logo">Alias</li>
        <li
          className={`nav__menu--item ${
            history.location.pathname === "/" ? "active" : ""
          }`}
        >
          {history.location.pathname !== "/" ? (
            <Link to="/">
              {" "}
              <div className="hover"></div>
              <span className="text">Home</span>
            </Link>
          ) : (
            <span className="text">Home</span>
          )}
        </li>
        <li
          className={`nav__menu--item ${
            history.location.pathname === "/profile" ? "active" : ""
          }`}
        >
          {history.location.pathname !== "/profile" ? (
            <Link to="/profile">
              {" "}
              <div className="hover"></div>
              <span className="text">My profile</span>
            </Link>
          ) : (
            <span className="text">My profile</span>
          )}
        </li>
        <li
          className={`nav__menu--item ${
            history.location.pathname === "/friends" ? "active" : ""
          }`}
        >
          {history.location.pathname !== "/friends" ? (
            <Link to="/friends">
              {" "}
              <div className="hover"></div>
              <span className="text">Friends</span>
            </Link>
          ) : (
            <span className="text">Friends</span>
          )}
        </li>
        <li className="nav__menu--item" onClick={()=>{
            cookies.remove("user")
            history.push("/login")
        }}>
            Log out <p><ion-icon name="exit-outline"></ion-icon></p>
        </li>
      </ul>
      <nav className="nav__bar"></nav>
    </section>
  );
}
