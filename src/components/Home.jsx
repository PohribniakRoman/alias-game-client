import { withRouter } from "react-router";
import Navigation from "./Navigation";
import Friends from "./profile/Friends";
import { Route } from "react-router-dom";
function Home() {
  return (
    <section className="home">
      <Navigation />
      <Route path="/friends">
        <Friends />
      </Route>
    </section>
  );
}

export default withRouter(Home);
