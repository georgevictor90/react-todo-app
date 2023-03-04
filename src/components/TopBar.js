import React, { useContext } from "react";
import { ProjectsContext } from "./Dashboard/Dashboard";
import { auth } from "../firebase-config";
import { signOut } from "firebase/auth";

export default function TopBar() {
  const { currentProject } = useContext(ProjectsContext);
  function signOutUser() {
    signOut(auth)
      .then(() => {
        localStorage.clear();
      })
      .catch((error) => console.log(error.message));
  }
  return (
    <header className="App-header">
      <h3>{currentProject}</h3>
      <button onClick={signOutUser} className="signout-button">
        Sign Out
      </button>
    </header>
  );
}
