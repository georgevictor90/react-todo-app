import React from "react";
import { auth } from "../firebase-config";
import { signOut } from "firebase/auth";

export default function TopBar({ currentProject }) {
  function signOutUser() {
    signOut(auth)
      .then(() => {
        console.log("succesfully signed out");
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
