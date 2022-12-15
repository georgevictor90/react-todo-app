import React, { useState } from "react";
import Register from "./Register";
import Login from "./Login";

function Welcome() {
  const [isRegistering, setIsRegistering] = useState(true);
  const [userCredentials, setUserCredentials] = useState({
    email: "",
    confirmEmail: "",
    password: "",
    confirmPassword: "",
  });

  function clearUserCredentials() {
    setUserCredentials({
      email: "",
      confirmEmail: "",
      password: "",
      confirmPassword: "",
    });
  }

  return (
    <div className="welcome">
      <h2>Todo Planner</h2>
      {isRegistering ? (
        <Register
          userCredentials={userCredentials}
          setUserCredentials={setUserCredentials}
          isRegistering={isRegistering}
          setIsRegistering={setIsRegistering}
          clearUserCredentials={clearUserCredentials}
        />
      ) : (
        <Login
          userCredentials={userCredentials}
          setUserCredentials={setUserCredentials}
          isRegistering={isRegistering}
          setIsRegistering={setIsRegistering}
          clearUserCredentials={clearUserCredentials}
        />
      )}
    </div>
  );
}

export default Welcome;
