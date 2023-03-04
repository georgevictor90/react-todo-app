import React, { useState, useEffect, useContext } from "react";
import { ProjectsContext, TogglersContext } from "../Dashboard/Dashboard";
import ColorChoices from "../ColorChoices/ColorChoices";
import {
  IoArrowBackCircleOutline,
  IoCheckmarkCircleOutline,
  IoListOutline,
} from "react-icons/io5";
import { addDoc, doc, setDoc } from "firebase/firestore";

export default function ProjectForm() {
  const {
    projectsCollectionRef,
    projectToEdit,
    setProjectToEdit,
    setCurrentProject,
  } = useContext(ProjectsContext);
  const { formIsOpen, toggleForm, togglePopup } = useContext(TogglersContext);
  const [name, setName] = useState("");
  const [color, setColor] = useState("Charcoal");
  const [colorCode, setColorCode] = useState("#36454F");
  const [colorChoicesIsOpen, setColorChoicesIsOpen] = useState(false);

  useEffect(() => {
    if (projectToEdit) {
      setName(projectToEdit.name);
      setColor(projectToEdit.color);
      setColorCode(projectToEdit.colorCode);
    }
  }, [projectToEdit]);

  function toggleColorChoices() {
    setColorChoicesIsOpen(!colorChoicesIsOpen);
  }

  function handleClick() {
    if (!name) return;

    const project = {
      name: name,
      type: "user",
      color: color,
      colorCode: colorCode,
    };

    if (projectToEdit !== null) {
      saveChangesToProject(projectToEdit.id, project);
      setProjectToEdit(null);
    } else {
      createProject(project);
      setCurrentProject(project.name);
    }
    resetProjectForm();
    toggleForm();
    togglePopup();
  }

  async function saveChangesToProject(id, project) {
    const projectRef = doc(projectsCollectionRef, id);
    await setDoc(projectRef, project);
  }

  async function createProject(project) {
    await addDoc(projectsCollectionRef, { ...project });
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
