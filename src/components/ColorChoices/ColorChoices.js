import React from "react";
import { IoListOutline } from "react-icons/io5";
import { colors } from "./Colors";

export default function ColorChoices({
  setColorCode,
  setColor,
  isOpen,
  toggleColorChoices,
}) {
  function handleClick(colorName, colorCode) {
    setColorCode(colorCode);
    setColor(colorName);
    toggleColorChoices();
  }

  const colorChoicesElements = colors.map((color) => {
    return (
      <li key={color.name}>
        <button
          type="button"
          className="color-list-button"
          onClick={() => handleClick(color.name, color.code)}
        >
          <IoListOutline
            style={{ color: `${color.code}` }}
            className="color-icon"
          />
          <span
            className="selected-project-color"
            style={{ color: `${color.code}` }}
          >
            {color.name}
          </span>
        </button>
      </li>
    );
  });
  return (
    <div
      className={
        isOpen
          ? "color-choices-container"
          : "color-choices-container close-color-choices"
      }
    >
      <h1>Project color</h1>
      <ul className="color-choices-list">{colorChoicesElements}</ul>
    </div>
  );
}
