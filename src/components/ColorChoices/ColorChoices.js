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
      <li
        key={color.name}
        onClick={() => handleClick(color.name, color.code)}
        className="color-list-item"
      >
        <IoListOutline
          style={{ color: `${color.code}` }}
          className="color-icon"
        />
        <span>{color.name}</span>
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
      <h3>Color</h3>
      <ul className="color-choices-list">{colorChoicesElements}</ul>
    </div>
  );
}
