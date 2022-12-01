import React from "react";
import { IoListOutline } from "react-icons/io5";

export default function ColorChoices({ isOpen, toggleColorChoices }) {
  return (
    <div
      className={
        isOpen
          ? "color-choices-container"
          : "color-choices-container close-color-choices"
      }
    >
      <h3>Color</h3>
      <ul className="color-choices list">
        <li onClick={toggleColorChoices} className="color-list-item">
          <IoListOutline className="color-icon" />
          <span>Berry Red</span>
        </li>
      </ul>
    </div>
  );
}
