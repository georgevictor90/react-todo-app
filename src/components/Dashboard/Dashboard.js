import React from "react";
import PopupMenu from "../PopupMenu/PopupMenu";
import ProjectForm from "../ProjectForm/ProjectForm";
import TopBar from "../TopBar";
import DefaultProject from "../DefaultProject/DefaultProject";
import AddTask from "../AddTask/AddTask";
import Footer from "../Footer";
import { useState, useEffect } from "react";
import { db, auth } from "../../firebase-config";
import { collection, doc, onSnapshot } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function Dashboard({ currentUser }) {
  const navigate = useNavigate();

  const userRef = doc(db, "users", currentUser);
  const projectsCollectionRef = collection(userRef, "projects");
  const tasksRef = collection(userRef, "tasks");

  const [projects, setProjects] = useState([]);
  const [currentProject, setCurrentProject] = useState("today");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [popupIsOpen, setPopupIsOpen] = useState(false);
  const [formIsOpen, setFormIsOpen] = useState(false);
  const [projectToEdit, setProjectToEdit] = useState(null);
  const [isRegistering, setIsRegistering] = useState(false);

  useEffect(() => {
    const unsub = onSnapshot(projectsCollectionRef, (snapshot) => {
      setProjects(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
    return () => unsub();
  }, []);

  // useEffect(() => {
  //   console.log(projects);
  // }, [projects]);

  useEffect(() => {
    !currentUser && navigate("/");
  }, []);

  // useEffect(() => {
  //   console.log(currentProject);
  // }, [currentProject]);

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
          userRef={userRef}
          projectsRef={projectsCollectionRef}
          setProjectToEdit={setProjectToEdit}
          projectToEdit={projectToEdit}
          projects={projects}
          setProjects={setProjects}
          formIsOpen={formIsOpen}
          toggleForm={toggleForm}
        />
        <TopBar currentProject={currentProject} />

        <DefaultProject
          currentProject={currentProject}
          projects={projects}
          currentUser={currentUser}
          // tasks={tasks}
          userRef={userRef}
          tasksRef={tasksRef}
          projectsRef={projectsCollectionRef}
        />

        <AddTask
          projectsRef={projectsCollectionRef}
          projects={projects}
          currentUser={currentUser}
          // tasks={tasks}
          setProjects={setProjects}
          setCurrentProject={setCurrentProject}
          modalIsOpen={modalIsOpen}
          toggleModal={toggleModal}
        />

        <Footer togglePopup={togglePopup} toggleModal={toggleModal} />
      </>
    )
    // ) : (
    // "Loading"
  );
}

export default Dashboard;
