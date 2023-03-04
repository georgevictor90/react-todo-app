import React, { useContext } from "react";
import { TogglersContext } from "./Dashboard/Dashboard";
import { FaGithubSquare } from "react-icons/fa";

export default function Footer() {
  const { togglePopup, toggleModal } = useContext(TogglersContext);
  return (
    <footer className="App-footer">
      <button onClick={togglePopup} className="hamburger">
        <div className="btn-line"></div>
        <div className="btn-line"></div>
        <div className="btn-line"></div>
      </button>
      <button onClick={toggleModal} className="plus-button">
        +
      </button>
      <span>developed by Victor Lacatus</span>
      <a
        href="http://github.com/georgevictor90"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaGithubSquare className="github-icon" />
      </a>
    </footer>
  );
}
