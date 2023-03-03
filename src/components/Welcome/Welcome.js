import React, { useState } from "react";
import Register from "./Register";
import Login from "./Login";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "../../firebase-config";
import { collection, addDoc, doc, setDoc } from "firebase/firestore";

function Welcome() {
  const [isRegistering, setIsRegistering] = useState(true);
  const [userCredentials, setUserCredentials] = useState({
    email: "",
    confirmEmail: "",
    password: "",
    confirmPassword: "",
  });

  const [loginErr, setLoginErr] = useState("");
  const [registerErr, setRegisterErr] = useState("");

  function clearUserCredentials() {
    setUserCredentials({
      email: "",
      confirmEmail: "",
      password: "",
      confirmPassword: "",
    });
  }

  function createUser() {
    createUserWithEmailAndPassword(
      auth,
      userCredentials.email,
      userCredentials.password
    )
      .then((credential) => {
        const user = credential.user;
        setDoc(doc(db, "users", user.uid), {
          email: userCredentials.email,
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
            setRegisterErr("Error: Invalid email");
            break;

          case "auth/weak-password":
            setRegisterErr("Error: Password should be at least 6 characters");
            break;
          default:
            console.log(error.message);
            break;
        }
      });
  }

  function signIn() {
    signInWithEmailAndPassword(
      auth,
      userCredentials.email,
      userCredentials.password
    )
      .then((credential) => {
        const user = credential.user;
        console.log(user.uid);
      })
      .catch((error) => {
        switch (error.code) {
          case "auth/user-not-found":
            setLoginErr("Error: User not found");
            break;

          case "auth/wrong-password":
            setLoginErr("Error: Wrong password");
            break;

          case "auth/invalid-email":
            setLoginErr("Error: Invalid email");
            break;

          default:
            console.log(error.message);
            break;
        }
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
          createUser={createUser}
          registerErr={registerErr}
          setRegisterErr={setRegisterErr}
        />
      ) : (
        <Login
          userCredentials={userCredentials}
          setUserCredentials={setUserCredentials}
          isRegistering={isRegistering}
          setIsRegistering={setIsRegistering}
          clearUserCredentials={clearUserCredentials}
          signIn={signIn}
          loginErr={loginErr}
          setLoginErr={setLoginErr}
        />
      )}
    </div>
  );
}

export default Welcome;
