import React from "react";
import {
  IoArrowBackCircleOutline,
  IoCheckmarkCircleOutline,
  IoListOutline,
} from "react-icons/io5";

export default function ProjectForm({
  toggleColorChoices,
  formIsOpen,
  toggleForm,
}) {
  return (
    <form
      action="
    "
      className={
        formIsOpen ? "new-project-form" : "new-project-form close-project-form"
      }
    >
      <div className="new-project-form-header">
        <IoArrowBackCircleOutline
          onClick={toggleForm}
          className="new-project-form-back"
        />
        <h3 className="new-project-form-h3">Add Project</h3>
        <IoCheckmarkCircleOutline className="new-project-form-save" />
      </div>
      <div className="form-group">
        <label htmlFor="projectName" className="project-name-label">
          Name
        </label>
        <input
          type="text"
          name="name"
          id="projectName"
          className="new-project-name-input"
        />
      </div>
      <div onClick={toggleColorChoices} className="color-form-group">
        <IoListOutline className="color-icon main-color-icon" />
        <div className="color-label-and-name">
          <span className="selected-color-label">Color</span>
          <span className="selected-project-color">Default color here</span>
        </div>
      </div>
    </form>
  );
}
