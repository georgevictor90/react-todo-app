import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import "./App.css";
import DefaultProject from "./components/DefaultProject/DefaultProject";
import Footer from "./components/Footer";
import TopBar from "./components/TopBar";
import AddTask from "./components/AddTask/AddTask";
import PopupMenu from "./components/PopupMenu/PopupMenu";

function App() {
  // eslint-disable-next-line no-unused-vars
  const [projects, setProjects] = React.useState([
    {
      title: "Inbox",
      type: "default",
      todos: [],
    },
    {
      title: "Today",
      type: "default",
      todos: [],
    },
  ]);
  const [modalIsOpen, setModalIsOpen] = React.useState(false);
  const [popupIsOpen, setPopupIsOpen] = React.useState(false);

  function toggleModal() {
    setModalIsOpen(!modalIsOpen);
  }
  function togglePopup() {
    setPopupIsOpen(!popupIsOpen);
  }

  return (
    <div className="App">
      <PopupMenu popupIsOpen={popupIsOpen} togglePopup={togglePopup} />
      <TopBar projects={projects} />
      <BrowserRouter>
        <Routes>
          <Route index element={<DefaultProject projects={projects} />} />
        </Routes>
      </BrowserRouter>
      <AddTask
        projects={projects}
        IsOpen={modalIsOpen}
        toggleModal={toggleModal}
      />
      <Footer togglePopup={togglePopup} openModal={toggleModal} />
    </div>
  );
}

export default App;
