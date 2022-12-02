import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import "./App.css";
import DefaultProject from "./components/DefaultProject/DefaultProject";
import Footer from "./components/Footer";
import TopBar from "./components/TopBar";
import AddTask from "./components/AddTask/AddTask";
import PopupMenu from "./components/PopupMenu/PopupMenu";
import ProjectForm from "./components/ProjectForm/ProjectForm";
import ColorChoices from "./components/ColorChoices/ColorChoices";

function App() {
  const documentHeight = () => {
    const doc = document.documentElement;
    doc.style.setProperty("--doc-height", `${window.innerHeight}px`);
  };
  window.addEventListener("resize", documentHeight);
  documentHeight();

  const [defaultSections, setDefaultSections] = React.useState({
    today: [],
    inbox: [],
  });

  const [currentProject, setCurrentProject] = React.useState("today");

  const [modalIsOpen, setModalIsOpen] = React.useState(false);
  const [popupIsOpen, setPopupIsOpen] = React.useState(false);
  const [formIsOpen, setFormIsOpen] = React.useState(false);
  const [colorChoicesIsOpen, setColorChoicesIsOpen] = React.useState(false);

  function toggleColorChoices() {
    setColorChoicesIsOpen(!colorChoicesIsOpen);
  }

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
        toggleForm={toggleForm}
        popupIsOpen={popupIsOpen}
        togglePopup={togglePopup}
      />
      <ProjectForm
        toggleColorChoices={toggleColorChoices}
        formIsOpen={formIsOpen}
        toggleForm={toggleForm}
      />
      <TopBar currentProject={currentProject} />
      <BrowserRouter>
        <Routes>
          <Route
            index
            element={
              <DefaultProject
                currentProject={currentProject}
                defaultSections={defaultSections}
              />
            }
          />
        </Routes>
      </BrowserRouter>
      <AddTask
        defaultSections={defaultSections}
        modalIsOpen={modalIsOpen}
        toggleModal={toggleModal}
      />
      <Footer togglePopup={togglePopup} toggleModal={toggleModal} />
      <ColorChoices
        isOpen={colorChoicesIsOpen}
        toggleColorChoices={toggleColorChoices}
      />
    </div>
  );
}

export default App;
