import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { Endpoints } from "../../Endpoints";
import SendData from "../../hooks/SendData";

export default function Profile() {
  const [name] = new Cookies().get("user").split("-q1w4/");

  const [stat, updateStat] = useState({});

  useEffect(() => {
    const stat = async () => {
      const resp = await (
        await SendData(Endpoints.host + Endpoints.getStat, { name })
      ).json();
      updateStat(resp);
    };
    stat();
  }, [name]);
  if (stat.name < 1) {
    return <div>loading...</div>;
  }
  return (
    <section className="profile">
      <div>
        <h1>Your profile</h1>
        <div className="profile__stat">
          <div className="profile__name">
            Your name:<i>{stat.name}</i>
          </div>
          <div className="profile__win">
            Win:<i>{stat.win}</i>
          </div>
          <div className="profile__lose">
            Lose:<i>{stat.lose}</i>
          </div>
          <div className="profile__rating">
            Rating:<i>{stat.rating}</i>
          </div>
        </div>
      </div>

      <div>
        <h3>
          Your friend list consists of:{" "}
          {stat.friendList ? stat.friendList.length : null}
        </h3>
        <ul className="profile__list">
          {stat.friendList
            ? stat.friendList.map((item, index) => {
                return (
                  <li className="profile__list--item" key={index}>
                    {index + 1}:{item}
                  </li>
                );
              })
            : null}
        </ul>
      </div>
    </section>
  );
}
