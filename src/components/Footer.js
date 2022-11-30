import React from "react";
import { FaGithubSquare } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="App-footer">
      <button className="hamburger">
        <div className="btn-line"></div>
        <div className="btn-line"></div>
        <div className="btn-line"></div>
      </button>
      <button className="plus-button">+</button>
      <a href="">
        <FaGithubSquare className="github-icon" />
      </a>
    </footer>
  );
}
