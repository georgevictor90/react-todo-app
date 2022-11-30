import React from "react";

export default function TopBar({ currentSectionTitle }) {
  return (
    <header className="App-header">
      <h3>{currentSectionTitle ? currentSectionTitle : "Today"}</h3>
    </header>
  );
}
