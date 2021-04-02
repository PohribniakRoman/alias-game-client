import { withRouter } from "react-router";
import Navigation from "./Navigation";

function Home() {
  return (
    <section className="home">
      <Navigation />
    </section>
  );
}

export default withRouter(Home);
