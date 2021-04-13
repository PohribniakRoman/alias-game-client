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
        <li className={`nav__menu--item ${location === "/" ? "active" : ""}`}>
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
            location === "/join-game" ? "active" : ""
          }`}
        >
          {location !== "/join-game" ? (
            <Link to="/join-game">
              <div className="hover"></div>
              <span className="text">Join game</span>
            </Link>
          ) : (
            <span className="text">Join game</span>
          )}
        </li>
        <li
          className={`nav__menu--item ${
            location === "/new-game" ? "active" : ""
          }`}
        >
          {location !== "/new-game" ? (
            <Link to="/new-game">
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
          {location !== "/profile" ? (
              <Link to="/profile">
                <li className="nav__menu--item-list_item">Profile</li>
              </Link>
            ) : (
              <li className="nav__menu--item-list_item selected">Profile</li>
            )}
            {location !== "/friends" ? (
              <Link to="/friends">
                <li className="nav__menu--item-list_item">Friends</li>
              </Link>
            ) : (
              <li className="nav__menu--item-list_item selected">Friends</li>
            )}
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
    </section>
  );
}
