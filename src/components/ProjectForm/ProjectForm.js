import React from "react";
import ColorChoices from "../ColorChoices/ColorChoices";

import {
  IoArrowBackCircleOutline,
  IoCheckmarkCircleOutline,
  IoListOutline,
} from "react-icons/io5";
import { nanoid } from "nanoid";

export default function ProjectForm({
  projects,
  setProjects,
  formIsOpen,
  toggleForm,
}) {
  const [name, setName] = React.useState("");
  const [color, setColor] = React.useState("Charcoal");
  const [colorCode, setColorCode] = React.useState("#36454F");
  const [colorChoicesIsOpen, setColorChoicesIsOpen] = React.useState(false);

  function toggleColorChoices() {
    setColorChoicesIsOpen(!colorChoicesIsOpen);
  }

  function handleClick() {
    if (!name) return;

    setProjects({
      ...projects,
      [name]: {
        name: name,
        id: nanoid(),
        type: "userProject",
        color: color,
        colorCode: colorCode,
        tasks: [],
      },
    });

    resetProjectForm();
    toggleForm();
  }

  function resetProjectForm() {
    setName("");
    setColor("Charcoal");
    setColorCode("#36454F");
  }

  function handleChange(e) {
    setName(e.target.value);
  }

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
        <IoCheckmarkCircleOutline
          onClick={handleClick}
          className="new-project-form-save"
        />
      </div>
      <div style={{ outline: `1px solid ${colorCode}` }} className="form-group">
        <label htmlFor="projectName" className="project-name-label">
          Name
        </label>
        <input
          type="text"
          name="name"
          id="projectName"
          className="new-project-name-input"
          value={name}
          onChange={handleChange}
        />
      </div>
      <div onClick={toggleColorChoices} className="color-form-group">
        <IoListOutline
          style={{ color: `${colorCode}` }}
          className="color-icon main-color-icon"
        />
        <div className="color-label-and-name">
          <span className="selected-color-label">Color</span>
          <span className="selected-project-color">{color}</span>
        </div>
      </div>

      <ColorChoices
        setColorCode={setColorCode}
        setColor={setColor}
        isOpen={colorChoicesIsOpen}
        toggleColorChoices={toggleColorChoices}
      />
    </form>
  );
}
