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
    currentProject,
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
    try {
      if (window.confirm("Are you sure you wish to delete this item?")) {
        const projectDoc = doc(projectsCollectionRef, id);
        await deleteDoc(projectDoc);
        setCurrentProject("today");
      }
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  }

  async function handleProjectEdit(id) {
    try {
      const projectDoc = doc(projectsCollectionRef, id);
      const projectSnapshot = await getDoc(projectDoc);
      if (projectSnapshot.exists()) {
        const projectData = projectSnapshot.data();
        setProjectToEdit({ ...projectData, id: id });
        toggleForm();
      } else {
        console.error(`Document with id ${id} does not exist.`);
      }
    } catch (error) {
      console.error(`Error fetching document with id ${id}:`, error);
    }
  }

  const userProjects = projects.filter((project) => project.type === "user");

  const userProjectLinks = userProjects.map((project) => {
    return (
      <li
        key={project.id}
        className={
          project.name === currentProject
            ? "project-item current-project"
            : "project-item"
        }
      >
        <button
          className="project-item-button"
          onClick={() => {
            handleProjectClick(project.name);
          }}
        >
          <IoDiscSharp
            className="section-icon"
            style={{ color: `${project.colorCode}` }}
          />
          <span>{project.name}</span>
        </button>
        <div className="edit-project-buttons">
          <button>
            <IoCreateOutline onClick={() => handleProjectEdit(project.id)} />
          </button>
          <button>
            <IoTrashBinOutline
              onClick={() => {
                handleProjectDelete(project.id);
              }}
            />
          </button>
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
          <li>
            <button
              onClick={() => {
                handleProjectClick("inbox");
              }}
            >
              <IoFolderOutline
                style={{ color: "blue" }}
                className="section-icon"
              />
              <span>Inbox</span>
            </button>
          </li>

          <li>
            <button
              onClick={() => {
                handleProjectClick("today");
              }}
            >
              <IoCalendarOutline
                style={{ color: "green" }}
                className="section-icon"
              />
              <span>Today</span>
            </button>
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
