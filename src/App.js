import React from "react";
import "./App.css";
import DefaultProject from "./components/DefaultProject/DefaultProject";
import Footer from "./components/Footer";
import TopBar from "./components/TopBar";
import AddTask from "./components/AddTask/AddTask";
import PopupMenu from "./components/PopupMenu/PopupMenu";
import ProjectForm from "./components/ProjectForm/ProjectForm";
import { useState, useEffect } from "react";
import { db } from "./firebase-config";
import {
  collection,
  doc,
  updateDoc,
  getDocs,
  addDoc,
  onSnapshot,
} from "firebase/firestore";

function App() {
  const documentHeight = () => {
    const doc = document.documentElement;
    doc.style.setProperty("--doc-height", `${window.innerHeight}px`);
  };
  window.addEventListener("resize", documentHeight);
  documentHeight();

  const projectsCollectionRef = collection(db, "projects");
  const tasksCollectionRef = collection(db, "tasks");

  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);

  useEffect(
    () =>
      onSnapshot(projectsCollectionRef, (snapshot) => {
        setProjects(
          snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
      }),
    []
  );

  useEffect(
    () =>
      onSnapshot(tasksCollectionRef, (snapshot) => {
        setTasks(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      }),
    []
  );

  const [currentProject, setCurrentProject] = useState("today");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [popupIsOpen, setPopupIsOpen] = useState(false);
  const [formIsOpen, setFormIsOpen] = useState(false);

  function toggleModal() {
    setModalIsOpen(!modalIsOpen);
  }

  function togglePopup() {
    setPopupIsOpen(!popupIsOpen);
  }

  function toggleForm() {
    setFormIsOpen(!formIsOpen);
  }

  return (
    <div className="App">
      {projects.length && (
        <PopupMenu
          projects={projects}
          setCurrentProject={setCurrentProject}
          toggleForm={toggleForm}
          popupIsOpen={popupIsOpen}
          togglePopup={togglePopup}
        />
      )}
      <ProjectForm formIsOpen={formIsOpen} toggleForm={toggleForm} />
      <TopBar currentProject={currentProject} />

      <DefaultProject
        currentProject={currentProject}
        projects={projects}
        tasks={tasks}
      />
      {projects.length && (
        <AddTask
          projects={projects}
          tasks={tasks}
          setCurrentProject={setCurrentProject}
          modalIsOpen={modalIsOpen}
          toggleModal={toggleModal}
        />
      )}
      <Footer togglePopup={togglePopup} toggleModal={toggleModal} />
    </div>
  );
}

export default App;
