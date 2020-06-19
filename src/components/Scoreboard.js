import React from "react";

export default function Scoreboard({ highscore }) {
  return (
    <div className="container">
      <p className="pt-6 has-text-white">Highscore: {highscore}</p>
    </div>
  );
}
