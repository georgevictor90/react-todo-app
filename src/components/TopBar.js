import React from "react";

export default function TopBar({ currentProject }) {
  return (
    <header className="App-header">
      <h3>{currentProject}</h3>
    </header>
  );
}
