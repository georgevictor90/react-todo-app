import React from "react";
import { SlClose } from "react-icons/sl";
import {
  IoFolderOutline,
  IoCalendarOutline,
  IoAddCircleOutline,
  IoSettingsOutline,
} from "react-icons/io5";

export default function PopupMenu({ toggleForm, popupIsOpen, togglePopup }) {
  return (
    <nav
      className={popupIsOpen ? "popup-menu" : "popup-menu close"}
      role="navigation"
    >
      <SlClose onClick={togglePopup} className="close-button" />

      <div className="menu-section">
        <ul className="menu-sections-list">
          <li>
            <a onClick={togglePopup} href="#">
              <IoFolderOutline
                style={{ color: "blue" }}
                className="section-icon"
              />
              <span>Inbox</span>
            </a>
          </li>
          <li>
            <a onClick={togglePopup} href="#">
              <IoCalendarOutline
                style={{ color: "green" }}
                className="section-icon"
              />
              <span>Today</span>
            </a>
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
        <ul className="projects-section-list"></ul>
        <div className="manage-projects-button">
          <IoSettingsOutline className="manage-projects-icon" />
          <span>Manage Projects</span>
        </div>
      </div>
    </nav>
  );
}
