import React from "react";
import { auth } from "../firebase-config";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function TopBar({ currentProject }) {
  const navigate = useNavigate();

  function signOutUser() {
    signOut(auth)
      .then(() => {
        console.log("succesfully signed out");
        navigate("/");
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
