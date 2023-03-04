import React, { useState, useEffect, useContext } from "react";
import { ProjectsContext, TogglersContext } from "../Dashboard/Dashboard";
import { RxPaperPlane } from "react-icons/rx";
import { SlClose } from "react-icons/sl";
import Modal from "react-modal";
import DatePicker from "react-datepicker";
import { nanoid } from "nanoid";
import { db } from "../../firebase-config";
import {
  collection,
  addDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

import "react-datepicker/dist/react-datepicker.css";

Modal.setAppElement("#root");

export default function AddTask({ currentUser }) {
  const {
    currentProject,
    setCurrentProject,
    projects,
    setProjects,
    projectsCollectionRef,
  } = useContext(ProjectsContext);
  const { modalIsOpen, toggleModal } = useContext(TogglersContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [projectFolder, setProjectFolder] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    if (currentProject === "today") {
      setProjectFolder("inbox");
    } else {
      setProjectFolder(currentProject);
    }
  }, [currentProject]);

  const userRef = doc(db, "users", currentUser);
  const tasksRef = collection(userRef, "tasks");

  function handleTitleChange(e) {
    setTitle(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleFolderChange(e) {
    setProjectFolder(e.target.value);
  }

  function clearForm() {
    setTitle("");
    setDescription("");
    setProjectFolder(currentProject);
    setSelectedDate(new Date());
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const projectId = projects.find((proj) => proj.name === projectFolder).id;

    if (!title) return;
    const task = {
      title: title,
      description: description,
      folder: projectFolder,
      projectId: projectId,
      date: selectedDate,
      formattedDate: selectedDate.toLocaleDateString("en-GB"),
    };

    const q = query(projectsCollectionRef, where("name", "==", projectFolder));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      task.projectId = doc.id;
    });

    setCurrentProject(task.folder);
    createTask(task);
    clearForm();
  }

  async function createTask(task) {
    await addDoc(tasksRef, { ...task });
  }

  useEffect(() => {
    async function getProjects() {
      const proj = await getDocs(projectsCollectionRef);
      const newProjects = [];
      proj.forEach((doc) => {
        newProjects.push({ ...doc.id, ...doc.data() });
      });
      setProjects(newProjects);
    }

    getProjects();
  }, []);

  const optionElements = projects
    .filter((item) => item.id !== "today")
    .map((item) => {
      return item.id === "inbox" ? (
        <option key={nanoid()} value="inbox">
          Inbox
        </option>
      ) : (
        <option key={nanoid()} value={item.name}>
          {item.name}
        </option>
      );
    });

  return (
    <Modal
      className="modal"
      isOpen={modalIsOpen}
      onRequestClose={toggleModal}
      contentLabel="Add Task"
    >
      <form action="" className="task-editor">
        <SlClose onClick={toggleModal} className="close-modal" />
        <div className="input-fields">
          <input
            type="text"
            name="title"
            id="title"
            className="task-title-input"
            onChange={handleTitleChange}
            value={title}
            placeholder="e.g. Renew gym subscription"
            required
          />
          <textarea
            name="description"
            id="description"
            className="task-description-input"
            onChange={handleDescriptionChange}
            value={description}
            placeholder="Description"
          ></textarea>
        </div>
        <div className="extra-fields">
          <div className="pills">
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              dateFormat="dd/MM/yyyy"
              minDate={new Date()}
              className="due-date-button"
              showYearDropdown
              scrollableYearDropdown
            />
            <select
              value={projectFolder}
              onChange={handleFolderChange}
              name="select"
              id="select"
              className="folder-select-button"
            >
              {optionElements}
            </select>
          </div>
          <div className="item-actions"></div>
        </div>
        <button onClick={handleSubmit} className="submit-button">
          <RxPaperPlane className="submit-button-icon" />
        </button>
      </form>
    </Modal>
  );
}
