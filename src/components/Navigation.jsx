import { useState } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
const cookies = new Cookies();

export default function Navigation() {
  const history = useHistory();
  const name = cookies.get("user").split("-q1w4/")[0];
  const [isOpen, setOpen] = useState(false);
  let location = history.location.pathname;
  return (
    <section className="nav">
      <ul className="nav__menu">
        <li className="nav__logo">Alias</li>
        <li
          className={`nav__menu--item ${
            location === "/" ? "active" : ""
          }`}
        >
          {location !== "/" ? (
            <Link to="/">
              <div className="hover"></div>
              <span className="text">Home</span>
            </Link>
          ) : (
            <span className="text">Home</span>
          )}
        </li>
        <li
          className={`nav__menu--item ${
            location === "/joinGame" ? "active" : ""
          }`}
        >
          {location !== "/joinGame" ? (
            <Link to="/joinGame">
              <div className="hover"></div>
              <span className="text">Join game</span>
            </Link>
          ) : (
            <span className="text">Join game</span>
          )}
        </li>
        <li
          className={`nav__menu--item ${
            location === "/newGame" ? "active" : ""
          }`}
        >
          {location !== "/newGame" ? (
            <Link to="/newGame">
              <div className="hover"></div>
              <span className="text">New game</span>
            </Link>
          ) : (
            <span className="text">New game</span>
          )}
        </li>
        <li
          className="nav__menu--item"
          onClick={() => {
            setOpen(!isOpen);
          }}
        >
          {name}
          {isOpen ? (
            <ion-icon name="caret-down-outline"></ion-icon>
          ) : (
            <ion-icon name="caret-up-outline"></ion-icon>
          )}
          <ul className={`nav__menu--item-list ${isOpen ? "" : "none"}`}>
            <li className={`nav__menu--item-list_item log-out ${location === "/friends" ? "selected" : ""}`}>
              {location !== "/friends" ? (
                <Link to="/friends">Friends</Link>
              ) : (
                "Friends"
              )}
            </li>
            <li
              className="nav__menu--item-list_item log-out"
              onClick={() => {
                cookies.remove("user");
                history.push("/login");
              }}
            >
              Log out
              <p>
                <ion-icon name="exit-outline"></ion-icon>
              </p>
            </li>
          </ul>
        </li>
      </ul>
      <nav className="nav__bar"></nav>
    </section>
  );
}
