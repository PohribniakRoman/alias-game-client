import { withRouter } from "react-router";
import Navigation from "./Navigation";
import Friends from "./profile/Friends";
import { Route } from "react-router-dom";
import Profile from "./profile/Profile";
import NewGame from "./game/New-game";
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
    </section>
  );
}

export default withRouter(Home);
