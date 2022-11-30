import React from "react";

export default function TopBar({ projects }) {
  return (
    <header className="App-header">
      <h3>{projects[1].title}</h3>
    </header>
  );
}
