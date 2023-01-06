import React from "react";
import { SlClose } from "react-icons/sl";
import { IoDiscSharp, IoCloseCircleOutline } from "react-icons/io5";
import {
  IoFolderOutline,
  IoCalendarOutline,
  IoAddCircleOutline,
  IoSettingsOutline,
  IoTrashBinOutline,
  IoCreateOutline,
} from "react-icons/io5";
import { db } from "../../firebase-config";
import { doc, deleteDoc, getDoc } from "firebase/firestore";

export default function PopupMenu({
  projects,
  setCurrentProject,
  toggleForm,
  popupIsOpen,
  togglePopup,
  setProjectToEdit,
  projectsRef,
}) {
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
    console.log(id);
    const projectDoc = doc(projectsRef, id);
    await deleteDoc(projectDoc);
  }

  async function editProject(id) {
    const projectDoc = doc(projectsRef, id);
    const projectData = await (await getDoc(projectDoc)).data();
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
          <span>Hover projects to edit or delete</span>
        </div>
      </div>
    </nav>
  );
}
