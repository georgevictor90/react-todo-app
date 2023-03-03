import React, { useState } from "react";
import Register from "./Register";
import Login from "./Login";

function Welcome() {
  const [isRegistering, setIsRegistering] = useState(true);

  return (
    <div className="welcome">
      <h2>Todo Planner</h2>
      {isRegistering ? (
        <Register setIsRegistering={setIsRegistering} />
      ) : (
        <Login setIsRegistering={setIsRegistering} />
      )}
    </div>
  );
}

export default Welcome;
