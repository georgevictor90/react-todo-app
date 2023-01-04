import React, { useState, useEffect } from "react";
import Register from "./Register";
import Login from "./Login";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  // onAuthStateChanged,
} from "firebase/auth";
import { auth, db } from "../../firebase-config";
import { useNavigate } from "react-router-dom";
import { collection, addDoc, doc, setDoc } from "firebase/firestore";

function Welcome({ currentUser, setCurrentUser }) {
  const navigate = useNavigate();
  const [isRegistering, setIsRegistering] = useState(true);
  const [userCredentials, setUserCredentials] = useState({
    email: "",
    confirmEmail: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        navigate("/dashboard");
        console.log("user is logged");
        setCurrentUser(user.uid);
      } else {
        console.log("user is NOT logged");
        setCurrentUser(null);
      }
    });
  }, []);

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
      .then(async (credential) => {
        const user = credential.user;
        // console.log(user.uid);

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
        const inbox = await addDoc(collection(userRef, "projects"), {
          name: "inbox",
        });
      })
      .catch((error) => {
        console.log(error.message);
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
        console.log(error.message);
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
        />
      ) : (
        <Login
          userCredentials={userCredentials}
          setUserCredentials={setUserCredentials}
          isRegistering={isRegistering}
          setIsRegistering={setIsRegistering}
          clearUserCredentials={clearUserCredentials}
          signIn={signIn}
        />
      )}
    </div>
  );
}

export default Welcome;
