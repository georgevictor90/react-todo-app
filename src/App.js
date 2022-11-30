import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import "./App.css";
import DefaultProject from "./components/DefaultProject/DefaultProject";
import Footer from "./components/Footer";
import TopBar from "./components/TopBar";
import AddTask from "./components/AddTask/AddTask";

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
  const [isOpen, setIsOpen] = React.useState(false);

  function toggleModal() {
    setIsOpen(!isOpen);
  }

  return (
    <div className="App">
      <BrowserRouter>
        <TopBar projects={projects} />
        <Routes>
          <Route index element={<DefaultProject projects={projects} />} />
        </Routes>
        <AddTask
          projects={projects}
          isOpen={isOpen}
          toggleModal={toggleModal}
        />
        <Footer openModal={toggleModal} />
      </BrowserRouter>
    </div>
  );
}

export default App;
