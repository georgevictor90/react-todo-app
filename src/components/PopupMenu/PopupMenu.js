import React, { useContext } from "react";
import { ProjectsContext, TogglersContext } from "../Dashboard/Dashboard";
import { IoDiscSharp, IoCloseCircleOutline } from "react-icons/io5";
import {
  IoFolderOutline,
  IoCalendarOutline,
  IoAddCircleOutline,
  IoSettingsOutline,
  IoTrashBinOutline,
  IoCreateOutline,
} from "react-icons/io5";
import { doc, deleteDoc, getDoc } from "firebase/firestore";

export default function PopupMenu() {
  const {
    projects,
    setCurrentProject,
    setProjectToEdit,
    projectsCollectionRef,
  } = useContext(ProjectsContext);
  const { toggleForm, popupIsOpen, togglePopup } = useContext(TogglersContext);

  function handleProjectClick(projectName) {
    setCurrentProject(projectName);
    togglePopup();
  }

  async function handleProjectDelete(id) {
    if (window.confirm("Are you sure you wish to delete this item?")) {
      const projectDoc = doc(projectsCollectionRef, id);
      await deleteDoc(projectDoc);
      setCurrentProject("today");
    }
  }

  async function handleProjectEdit(id) {
    const projectDoc = doc(projectsCollectionRef, id);
    const projectData = await getDoc(projectDoc).data();
    setProjectToEdit({ ...projectData, id: id });
    toggleForm();
  }

  const userProjects = projects.filter((project) => project.type === "user");

  const userProjectLinks = userProjects.map((project) => {
    return (
      <li
        key={project.id}
        className="project-item"
        onClick={() => {
          handleProjectClick(project.name);
        }}
      >
        <IoDiscSharp
          className="section-icon"
          style={{ color: `${project.colorCode}` }}
        />
        <span>{project.name}</span>
        <div className="edit-project-buttons">
          <IoCreateOutline onClick={() => handleProjectEdit(project.id)} />
          <IoTrashBinOutline
            onClick={() => {
              handleProjectDelete(project.id);
            }}
          />
        </div>
      </li>
    );
  });

  return (
    <nav
      className={popupIsOpen ? "popup-menu" : "popup-menu close"}
      role="navigation"
    >
      <button onClick={togglePopup} className="close-button">
        <IoCloseCircleOutline />
      </button>

      <div className="menu-section">
        <ul className="menu-sections-list">
          <li
            onClick={() => {
              handleProjectClick("inbox");
            }}
          >
            <IoFolderOutline
              style={{ color: "blue" }}
              className="section-icon"
            />
            <span>Inbox</span>
          </li>

          <li
            onClick={() => {
              handleProjectClick("today");
            }}
          >
            <IoCalendarOutline
              style={{ color: "green" }}
              className="section-icon"
            />
            <span>Today</span>
          </li>
        </ul>
      </div>

      <div className="projects-section">
        <div className="project-section-header">
          <span className="projects-section-title">Projects</span>
          <button onClick={toggleForm} className="new-project-button">
            <IoAddCircleOutline />
          </button>
        </div>
        <ul className="projects-section-list">{userProjectLinks}</ul>
        <div className="manage-projects-info">
          <IoSettingsOutline className="manage-projects-icon" />
          <span>Hover over projects to edit/delete</span>
        </div>
      </div>
    </nav>
  );
}
