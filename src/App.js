import React, { useEffect, useState } from "react";
import "./App.css";
import Welcome from "./components/Welcome/Welcome";
import Dashboard from "./components/Dashboard/Dashboard";
import { auth } from "./firebase-config";

function App() {
  const documentHeight = () => {
    const doc = document.documentElement;
    doc.style.setProperty("--doc-height", `${window.innerHeight}px`);
  };
  window.addEventListener("resize", documentHeight);
  documentHeight();

  const [currentUser, setCurrentUser] = useState(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user.uid);
      } else {
        setCurrentUser(null);
      }
      setIsReady(true);
    });
  }, []);

  return (
    <div className="App">
      {isReady &&
        (currentUser ? <Dashboard currentUser={currentUser} /> : <Welcome />)}
    </div>
  );
}

export default App;
