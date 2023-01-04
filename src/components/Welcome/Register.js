import React from "react";

function Register({
  userCredentials,
  setUserCredentials,
  isRegistering,
  setIsRegistering,
  clearUserCredentials,
}) {
  function handleSubmit(e) {
    e.preventDefault();
    if (userCredentials.email !== userCredentials.confirmEmail) {
      alert("Email addresses are not the same");
      return;
    } else if (userCredentials.password !== userCredentials.confirmPassword) {
      alert("Passwords don't match");
      return;
    }
    console.log("good");
  }

  function handleClick() {
    clearUserCredentials();
    setIsRegistering(!isRegistering);
  }

  return (
    <form className="auth-form" action="">
      <fieldset>
        <legend>Sign-Up</legend>
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
          type="email"
          name="confirmEmail"
          id="confirmEmail"
          placeholder="Confirm Email"
          required
          onChange={(e) =>
            setUserCredentials({
              ...userCredentials,
              confirmEmail: e.target.value,
            })
          }
          value={userCredentials.confirmEmail || ""}
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
        <input
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          placeholder="Confirm Password"
          autoComplete="new-password"
          required
          onChange={(e) =>
            setUserCredentials({
              ...userCredentials,
              confirmPassword: e.target.value,
            })
          }
          value={userCredentials.confirmPassword || ""}
        />
        <button className="auth-button" onClick={handleSubmit}>
          Register
        </button>
        <span>
          Already registered?{" "}
          <button className="signin-link" onClick={handleClick} href="#">
            Sign in
          </button>
        </span>
      </fieldset>
    </form>
  );
}

export default Register;