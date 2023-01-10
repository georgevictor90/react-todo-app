import React from "react";
import PopupMenu from "../PopupMenu/PopupMenu";
import ProjectForm from "../ProjectForm/ProjectForm";
import TopBar from "../TopBar";
import DefaultProject from "../DefaultProject/DefaultProject";
import AddTask from "../AddTask/AddTask";
import Footer from "../Footer";
import { useState, useEffect } from "react";
import { db } from "../../firebase-config";
import { collection, doc, onSnapshot } from "firebase/firestore";

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
    currentUser && (
      <>
        <PopupMenu
          setProjectToEdit={setProjectToEdit}
          projects={projects}
          setCurrentProject={setCurrentProject}
          toggleForm={toggleForm}
          popupIsOpen={popupIsOpen}
          togglePopup={togglePopup}
          projectsRef={projectsCollectionRef}
        />

        <ProjectForm
          projectsRef={projectsCollectionRef}
          setProjectToEdit={setProjectToEdit}
          projectToEdit={projectToEdit}
          formIsOpen={formIsOpen}
          toggleForm={toggleForm}
          setCurrentProject={setCurrentProject}
        />
        <TopBar currentProject={currentProject} />

        <DefaultProject
          currentProject={currentProject}
          projects={projects}
          tasksRef={tasksRef}
        />

        <AddTask
          projectsRef={projectsCollectionRef}
          projects={projects}
          currentUser={currentUser}
          setProjects={setProjects}
          currentProject={currentProject}
          setCurrentProject={setCurrentProject}
          modalIsOpen={modalIsOpen}
          toggleModal={toggleModal}
        />

        <Footer togglePopup={togglePopup} toggleModal={toggleModal} />
      </>
    )
  );
}

export default Dashboard;
