import React from "react";

export default function SimonSaysButton({ color, onColorClick }) {
  return (
    <div
      className={`button is-${color}`}
      id={color}
      onClick={(e) => {
        onColorClick(e.target.id);
      }}
    ></div>
  );
}
