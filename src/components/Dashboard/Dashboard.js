import React, { useState, useEffect, createContext } from "react";
import PopupMenu from "../PopupMenu/PopupMenu";
import ProjectForm from "../ProjectForm/ProjectForm";
import TopBar from "../TopBar";
import DefaultProject from "../DefaultProject/DefaultProject";
import AddTask from "../AddTask/AddTask";
import Footer from "../Footer";
import { db } from "../../firebase-config";
import { collection, doc, onSnapshot } from "firebase/firestore";

export const ProjectsContext = createContext(null);
export const TogglersContext = createContext(null);

function Dashboard({ currentUser }) {
  const userRef = doc(db, "users", currentUser);
  const projectsCollectionRef = collection(userRef, "projects");
  const tasksRef = collection(userRef, "tasks");

  const [projects, setProjects] = useState([]);
  const [currentProject, setCurrentProject] = useState(
    localStorage.getItem("currentProject") || "today"
  );
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [popupIsOpen, setPopupIsOpen] = useState(false);
  const [formIsOpen, setFormIsOpen] = useState(false);
  const [projectToEdit, setProjectToEdit] = useState(null);
  const [applyPadding, setApplyPadding] = useState(false);
  const [windowWidth, setWindowWidth] = useState(null);

  useEffect(() => {
    if (currentProject) localStorage.setItem("currentProject", currentProject);
  }, [currentProject]);

  useEffect(() => {
    const unsub = onSnapshot(projectsCollectionRef, (snapshot) => {
      setProjects(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    if (!projects) return;
    if (!projects.find((proj) => proj.name === currentProject)) {
      setCurrentProject("today");
    }
  }, []);

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
      window.innerWidth > 1023 ? setPopupIsOpen(true) : setPopupIsOpen(false);
    }

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (windowWidth >= 768 && popupIsOpen) {
      setApplyPadding(true);
    } else setApplyPadding(false);
  }, [popupIsOpen, windowWidth]);

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
    <div
      className="dashboard"
      style={{
        paddingLeft: applyPadding === true && "300px",
      }}
    >
      <TogglersContext.Provider
        value={{
          togglePopup,
          toggleForm,
          popupIsOpen,
          formIsOpen,
          modalIsOpen,
          toggleModal,
        }}
      >
        <ProjectsContext.Provider
          value={{
            projects,
            setProjects,
            currentProject,
            setCurrentProject,
            projectToEdit,
            setProjectToEdit,
            projectsCollectionRef,
            tasksRef,
          }}
        >
          <PopupMenu />

          <ProjectForm applyPadding={applyPadding} />
          <TopBar />

          <DefaultProject />

          <AddTask currentUser={currentUser} popupIsOpen={popupIsOpen} />
        </ProjectsContext.Provider>

        <Footer togglePopup={togglePopup} toggleModal={toggleModal} />
      </TogglersContext.Provider>
    </div>
  );
}

export default Dashboard;
