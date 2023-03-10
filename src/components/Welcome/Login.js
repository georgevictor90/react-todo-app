import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase-config";

function Login({ setIsRegistering }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  function signIn() {
    signInWithEmailAndPassword(auth, email, password).catch((error) => {
      switch (error.code) {
        case "auth/user-not-found":
          setErrorMsg("Error: User not found");
          break;

        case "auth/wrong-password":
          setErrorMsg("Error: Wrong password");
          break;

        case "auth/invalid-email":
          setErrorMsg("Error: Invalid email");
          break;

        default:
          console.log(error.message);
          break;
      }
    });
  }

  function handleLogin(e) {
    e.preventDefault();
    if (email === "" || password === "") {
      setErrorMsg("Error: All fields are required");
      return;
    }
    signIn();
  }

  return (
    <form className="auth-form" action="">
      <fieldset>
        <legend>Log In</legend>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          required
          onChange={(e) => {
            setErrorMsg("");
            setEmail(e.target.value);
          }}
          value={email || ""}
        />

        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          autoComplete="new-password"
          required
          onChange={(e) => {
            setErrorMsg("");
            setPassword(e.target.value);
          }}
          value={password || ""}
        />
        {errorMsg && <p className="error-message">{errorMsg}</p>}
        <button type="submit" className="auth-button" onClick={handleLogin}>
          Sign In
        </button>
        <span>
          Not registered yet?{" "}
          <button
            type="button"
            className="signin-link"
            onClick={() => setIsRegistering(true)}
            href="#"
          >
            Register
          </button>
        </span>
      </fieldset>
    </form>
  );
}

export default Login;
