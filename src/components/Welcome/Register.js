import React, { useState } from "react";
import { collection, addDoc, doc, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase-config";

function Register({ setIsRegistering }) {
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  function createUser() {
    createUserWithEmailAndPassword(auth, email, password)
      .then((credential) => {
        const user = credential.user;
        setDoc(doc(db, "users", user.uid), {
          email: email,
        })
          .then(() => console.log("stored user"))
          .catch((error) =>
            console.log(
              "Something went wrong with storing user: " + error.message
            )
          );

        const userRef = doc(db, "users", user.uid);
        addDoc(collection(userRef, "projects"), {
          name: "inbox",
        });
      })
      .catch((error) => {
        switch (error.code) {
          case "auth/invalid-email":
            setErrorMsg("Error: Invalid email");
            break;

          case "auth/weak-password":
            setErrorMsg("Error: Password should be at least 6 characters");
            break;
          default:
            console.log(error.message);
            break;
        }
      });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (email !== confirmEmail) {
      setErrorMsg("Email addresses are not the same");
      return;
    } else if (password.length < 6) {
      setErrorMsg("Passwords should be at least 6 characters long");
      return;
    } else if (password !== confirmPassword) {
      setErrorMsg("Passwords don't match");
      return;
    }
    createUser();
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
          onChange={(e) => {
            setErrorMsg("");
            setEmail(e.target.value);
          }}
          value={email || ""}
        />
        <input
          type="email"
          name="confirmEmail"
          id="confirmEmail"
          placeholder="Confirm Email"
          required
          onChange={(e) => {
            setErrorMsg("");
            setConfirmEmail(e.target.value);
          }}
          value={confirmEmail || ""}
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
        <input
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          placeholder="Confirm Password"
          autoComplete="new-password"
          required
          onChange={(e) => {
            setErrorMsg("");
            setConfirmPassword(e.target.value);
          }}
          value={confirmPassword || ""}
        />
        {errorMsg && <p className="error-message">{errorMsg}</p>}
        <button type="submit" className="auth-button" onClick={handleSubmit}>
          Register
        </button>
        <span>
          Already registered?{" "}
          <button
            type="button"
            className="signin-link"
            onClick={() => setIsRegistering(false)}
            href="#"
          >
            Sign in
          </button>
        </span>
      </fieldset>
    </form>
  );
}

export default Register;
