import React from "react";

function Login({
  userCredentials,
  setUserCredentials,
  isRegistering,
  setIsRegistering,
  clearUserCredentials,
}) {
  function handleClick() {
    clearUserCredentials();
    setIsRegistering(!isRegistering);
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
          onChange={(e) =>
            setUserCredentials({ ...userCredentials, email: e.target.value })
          }
          value={userCredentials.email || ""}
        />

        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          autoComplete="new-password"
          required
          onChange={(e) =>
            setUserCredentials({
              ...userCredentials,
              password: e.target.value,
            })
          }
          value={userCredentials.password || ""}
        />

        <button className="auth-button" onClick={() => console.log("log in")}>
          Sign In
        </button>
        <span>
          Not registered yet?{" "}
          <button className="signin-link" onClick={handleClick} href="#">
            Register
          </button>
        </span>
      </fieldset>
    </form>
  );
}

export default Login;