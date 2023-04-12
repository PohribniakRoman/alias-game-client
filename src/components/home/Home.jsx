import { Typography } from "@mui/material";
import { Navigation } from "./Navigation";

export const Home = () => {
        return <section className="home">
                <Navigation />
                <div className="home__rules">
                        <Typography className="home__rules--title" variant="h2">Rules</Typography>
                        <div className="home__rules--description">
                                <Typography variant="h4">Object of the Game</Typography>
                                <p>Explain words using other words, synonyms or opposites! 
                                Try to get your partner or team to correctly guess as many words
                                as possible before the sand in the timer runs out.</p>
                        </div>
                </div>
        </section>
}