import { useState, useEffect } from "react";
import SendData from "../../hooks/SendData";
import { Endpoints } from "../../Endpoints";
import Cookies from "universal-cookie";
const cookies = new Cookies();

export default function Friends() {
  const [friends, updateList] = useState([]);
  const [myFriends, updateMyFriends] = useState([]);
  const [counter, updateCounter] = useState(0);

  const currentName = cookies.get("user").split("-q1w4/")[0];
  useEffect(() => {
    const resp = async () => {
      const dataFetch = await (
        await fetch(Endpoints.host + Endpoints.friedns)
      ).json();
      updateList(dataFetch.nameList);
    };
    resp();
    const getFriends = async () => {
      const dataFetch = await (
        await SendData(Endpoints.host + Endpoints.getAllFriends, {
          name: cookies.get("user").split("-q1w4/")[0],
        })
      ).json();
      updateMyFriends(
        dataFetch.filter((element) => typeof element === "string")
      );
    };
    getFriends();
  }, []);
  if (friends.length < 1 && myFriends.length < 1) {
    return null;
  }
  return (
    <ul className="friends">
      <h1>Friends</h1>
        <b>All users counter:{friends.length - 1}</b>
        <i>Your friends:{counter}</i>
      {friends.map((name, index) => {
        const added = myFriends.includes(name.login);
        if (name.login !== currentName) {
          return (
            <li className="friends__item" key={name.id}>
              <p>{name.login}</p>
              <button
                className={`friends__item--button-add ${added ? "none" : ""}`}
                id="addToFriend"
                onClick={(event) => {
                  updateCounter(counter+1);
                  event.target.classList.add("none");
                  event.target
                    .closest("li")
                    .querySelector("#removeFromFriend")
                    .classList.remove("none");
                  const name = event.target.closest("li").querySelector("p")
                    .innerText;
                  SendData(Endpoints.host + Endpoints.addFriends, {
                    friendToAdd: name,
                    name: currentName,
                  });
                }}
              >
                Add
              </button>
              <button
                id="removeFromFriend"
                className={`friends__item--button-remove ${
                  added ? "" : "none"
                }`}
                onClick={(event) => {
                  updateCounter(counter-1);
                  event.target.classList.add("none");
                  event.target
                    .closest("li")
                    .querySelector("#addToFriend")
                    .classList.remove("none");
                  const name = event.target.closest("li").querySelector("p")
                    .innerText;
                  SendData(Endpoints.host + Endpoints.removeFriend, {
                    friendToRemove: name,
                    name: currentName,
                  });
                }}
              >
                Remove
              </button>
            </li>
          );
        } else {
          return null;
        }
      })}
    </ul>
  );
}
