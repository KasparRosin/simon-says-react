import React, { useState } from "react";
import "./App.scss";
import Scoreboard from "./components/Scoreboard";
import Gameboard from "./components/Gameboard";

function App() {
  const [highscore, setHighscore] = useState(0);
  const checkHighscore = (score) => {
    if (score > highscore) setHighscore(score);
  };
  return (
    <div className="App">
      <Scoreboard highscore={highscore} />
      <Gameboard checkHighscore={(score) => checkHighscore(score)} />
    </div>
  );
}

export default App;
