import React from "react";
import "./App.css";
import DefaultProject from "./components/DefaultProject/DefaultProject";
import Footer from "./components/Footer";
import TopBar from "./components/TopBar";
import AddTask from "./components/AddTask/AddTask";
import PopupMenu from "./components/PopupMenu/PopupMenu";
import ProjectForm from "./components/ProjectForm/ProjectForm";

function App() {
  const documentHeight = () => {
    const doc = document.documentElement;
    doc.style.setProperty("--doc-height", `${window.innerHeight}px`);
  };
  window.addEventListener("resize", documentHeight);
  documentHeight();

  const [projects, setProjects] = React.useState({
    today: { type: "defaultProject", tasks: [] },
    inbox: { type: "defaultProject", tasks: [] },
  });

  const [currentProject, setCurrentProject] = React.useState("today");

  const [modalIsOpen, setModalIsOpen] = React.useState(false);
  const [popupIsOpen, setPopupIsOpen] = React.useState(false);
  const [formIsOpen, setFormIsOpen] = React.useState(false);

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

      <DefaultProject currentProject={currentProject} projects={projects} />
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
