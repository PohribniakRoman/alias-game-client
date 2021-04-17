import { withRouter } from "react-router";
import Navigation from "./Navigation";
import Friends from "./profile/Friends";
import { Route } from "react-router-dom";
import Profile from "./profile/Profile";
import NewGame from "./game/New-game";
import JoinGame from "./game/Join-game";
import Game from "./game/Game";


function Home() {
  return (
    <section className="home">
      <Navigation />
      <Route path="/friends">
        <Friends />
      </Route>
      <Route path="/profile">
        <Profile />
      </Route>
      <Route path="/new-game">
          <NewGame />
      </Route>
      <Route path="/join-game">
          <JoinGame />
      </Route>
      <Route path="/game/:roomId" exact component={Game} />
    </section>
  );
}

export default withRouter(Home);
