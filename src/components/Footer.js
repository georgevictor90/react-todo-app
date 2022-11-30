import React from "react";
import { FaGithubSquare } from "react-icons/fa";

export default function Footer({ togglePopup, toggleModal }) {
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
      <a href="http://github.com">
        <FaGithubSquare className="github-icon" />
      </a>
    </footer>
  );
}
