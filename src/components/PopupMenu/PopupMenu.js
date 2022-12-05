import React from "react";
import { SlClose } from "react-icons/sl";
import { IoDiscSharp } from "react-icons/io5";
import {
  IoFolderOutline,
  IoCalendarOutline,
  IoAddCircleOutline,
  IoSettingsOutline,
} from "react-icons/io5";

export default function PopupMenu({
  projects,
  setCurrentProject,
  toggleForm,
  popupIsOpen,
  togglePopup,
}) {
  const userProjectLinks = Object.keys(projects)
    .filter((keyName) => projects[keyName].type === "userProject")
    .map((keyName) => {
      return (
        <li
          onClick={() => {
            handleClick(keyName);
          }}
          key={projects[keyName].id}
          className="project-item"
        >
          <IoDiscSharp
            className="section-icon"
            style={{ color: `${projects[keyName].colorCode}` }}
          />
          <span>{projects[keyName].name}</span>
        </li>
      );
    });

  function handleClick(section) {
    setCurrentProject(section);
    togglePopup();
  }

  return (
    <nav
      className={popupIsOpen ? "popup-menu" : "popup-menu close"}
      role="navigation"
    >
      <SlClose onClick={togglePopup} className="close-button" />

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
          <span>Manage Projects</span>
        </div>
      </div>
    </nav>
  );
}
