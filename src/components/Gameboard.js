import React, { useState, useCallback } from "react";
import SimonSaysButton from "./SimonSaysButton";

const colors = ["red", "green", "blue", "yellow"];
let sequence = [];
let turn = 0;

export default function Gameboard({ checkHighscore }) {
  const [score, setScore] = useState(0);
  const [hasGameStarted, setHasGameStarted] = useState(false);
  const [canClick, setCanClick] = useState(true);

  async function handleButtonClick(color) {
    if (!canClick) return;
    if (sequence[turn] === color) {
      turn++;
      setCanClick(false);
      await flashSinglePad(color);
      setCanClick(true);
      if (turn === sequence.length) {
        checkHighscore(score + 1);
        setScore(score + 1);
        turn = 0;
        sequence.push(getNextSequence());
        setCanClick(false);
        await flashSequencePads();
        setCanClick(true);
      }
    } else {
      endGame();
    }
  }

  const manageGame = () => {
    if (!hasGameStarted) startGame();
  };

  async function endGame() {
    setHasGameStarted(false);
    await flashAllColors();
    sequence = [];
    turn = 0;
    setScore(0);
  }

  async function startGame() {
    setHasGameStarted(true);
    await flashAllColors();
    sequence.push(getNextSequence());
    await flashSequencePads(sequence);
  }

  return (
    <section className="section">
      <div className="container">
        <div className="simon-says">
          <div className="buttons is-centered">
            <SimonSaysButton
              color={"green"}
              onColorClick={(value) => handleButtonClick(value)}
            />
            <SimonSaysButton
              color={"red"}
              onColorClick={(value) => handleButtonClick(value)}
            />
          </div>
          <div
            className="controls is-unselectable"
            onClick={() => manageGame()}
          >
            {hasGameStarted ? score : "Start"}
          </div>
          <div className="buttons is-centered">
            <SimonSaysButton
              color={"yellow"}
              onColorClick={(value) => handleButtonClick(value)}
            />
            <SimonSaysButton
              color={"blue"}
              onColorClick={(value) => handleButtonClick(value)}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function getNextSequence() {
  return colors[Math.floor(Math.random() * 4)];
}

async function flashAllColors() {
  const pads = document.getElementsByClassName("button");
  Object.values(pads).map((pad) => {
    pad.classList.add("flash");
  });
  await new Promise((resolve) => setTimeout(resolve, 700));
  Object.values(pads).map((pad) => {
    pad.classList.remove("flash");
  });
  await new Promise((resolve) => setTimeout(resolve, 700));
}

async function flashSequencePads() {
  for (let i = 0; i < sequence.length; i++) {
    const pad = document.getElementById(sequence[i]);
    await new Promise((resolve) => setTimeout(resolve, 500));
    pad.classList.add("flash");
    await new Promise((resolve) => setTimeout(resolve, 500));
    pad.classList.remove("flash");
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
}

async function flashSinglePad(color) {
  const pad = document.getElementById(color);
  pad.classList.add("flash");
  await new Promise((resolve) => setTimeout(resolve, 500));
  pad.classList.remove("flash");
  await new Promise((resolve) => setTimeout(resolve, 100));
}
