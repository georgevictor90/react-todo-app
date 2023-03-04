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

  const userProjectLinks = projects
    .filter((project) => project.type === "user")
    .map((project) => {
      return (
        <li key={project.id} className="project-item">
          <IoDiscSharp
            className="section-icon"
            style={{ color: `${project.colorCode}` }}
          />
          <span
            onClick={() => {
              handleClick(project.name);
            }}
          >
            {project.name}
          </span>
          <div className="edit-project-buttons">
            <IoCreateOutline onClick={() => editProject(project.id)} />
            <IoTrashBinOutline
              onClick={() => {
                if (
                  window.confirm("Are you sure you wish to delete this item?")
                )
                  deleteProject(project.id);
              }}
            />
          </div>
        </li>
      );
    });

  function handleClick(section) {
    setCurrentProject(section);
    togglePopup();
  }

  async function deleteProject(id) {
    const projectDoc = doc(projectsCollectionRef, id);
    await deleteDoc(projectDoc);
    setCurrentProject("today");
  }

  async function editProject(id) {
    const projectDoc = doc(projectsCollectionRef, id);
    const projectData = await getDoc(projectDoc).data();
    setProjectToEdit({ ...projectData, id: id });
    toggleForm();
  }

  return (
    <nav
      className={popupIsOpen ? "popup-menu" : "popup-menu close"}
      role="navigation"
    >
      <IoCloseCircleOutline onClick={togglePopup} className="close-button" />

      <div className="menu-section">
        <ul className="menu-sections-list">
          <li
            onClick={() => {
              handleClick("inbox");
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
              handleClick("today");
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
        <div className="manage-projects-button">
          <IoSettingsOutline className="manage-projects-icon" />
          <span>Hover over projects to edit/delete</span>
        </div>
      </div>
    </nav>
  );
}
