import React from "react";
import { FaGithubSquare } from "react-icons/fa";

export default function Footer({ openModal }) {
  return (
    <footer className="App-footer">
      <button className="hamburger">
        <div className="btn-line"></div>
        <div className="btn-line"></div>
        <div className="btn-line"></div>
      </button>
      <button onClick={openModal} className="plus-button">
        +
      </button>
      <a href="">
        <FaGithubSquare className="github-icon" />
      </a>
    </footer>
  );
}
