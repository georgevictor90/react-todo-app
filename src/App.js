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
import { collection, doc, getDocs } from "firebase/firestore";

function App() {
  const documentHeight = () => {
    const doc = document.documentElement;
    doc.style.setProperty("--doc-height", `${window.innerHeight}px`);
  };
  window.addEventListener("resize", documentHeight);
  documentHeight();

  const [projects, setProjects] = useState([]);
  const projectsRef = collection(db, "projects");

  useEffect(() => {
    const getProjects = async () => {
      const data = await getDocs(projectsRef);
      // console.log(data.docs);
      setProjects(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getProjects();
  }, []);

  // useEffect(() => {
  //   console.log(projects);
  // }, [projects]);

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
      <PopupMenu
        projects={projects}
        setCurrentProject={setCurrentProject}
        toggleForm={toggleForm}
        popupIsOpen={popupIsOpen}
        togglePopup={togglePopup}
      />
      <ProjectForm
        projects={projects}
        setProjects={setProjects}
        formIsOpen={formIsOpen}
        toggleForm={toggleForm}
      />
      <TopBar currentProject={currentProject} />

      <DefaultProject
        currentProject={currentProject}
        setProjects={setProjects}
        projects={projects}
      />
      <AddTask
        setProjects={setProjects}
        currentProject={currentProject}
        setCurrentProject={setCurrentProject}
        projects={projects}
        modalIsOpen={modalIsOpen}
        toggleModal={toggleModal}
      />
      <Footer togglePopup={togglePopup} toggleModal={toggleModal} />
    </div>
  );
}

export default App;
