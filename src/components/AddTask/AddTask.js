import React, { useState } from "react";
import { RxPaperPlane } from "react-icons/rx";
import { SlClose } from "react-icons/sl";
import Modal from "react-modal";
import DatePicker from "react-datepicker";
import { nanoid } from "nanoid";
import { db } from "../../firebase-config";
import { collection, addDoc } from "firebase/firestore";

import "react-datepicker/dist/react-datepicker.css";

Modal.setAppElement("#root");

export default function AddTask({
  setCurrentProject,
  projects,
  tasks,
  modalIsOpen,
  toggleModal,
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [projectFolder, setProjectFolder] = useState("inbox");
  const [selectedDate, setSelectedDate] = useState(new Date());

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
    setProjectFolder("inbox");
    setSelectedDate(new Date());
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(tasks);

    if (!title) return;
    const task = {
      title: title,
      description: description,
      folder: [projectFolder],
      date: selectedDate,
      formattedDate: selectedDate.toLocaleDateString("en-GB"),
    };

    clearForm();
    createTask(task);
    setCurrentProject(task.folder[0]);
  }

  async function createTask(task) {
    const currentDate = new Date().toLocaleDateString("en-GB");
    const tasksRef = collection(db, "tasks");

    if (task.formattedDate === currentDate) {
      task.folder = [...task.folder, "today"];
    }

    await addDoc(tasksRef, { ...task });
  }

  const optionElements = projects
    .filter((item) => item.id !== "today")
    .map((item) => {
      return item.id === "inbox" ? (
        <option key={nanoid()} value="inbox">
          Inbox
        </option>
      ) : (
        <option key={nanoid()} value={item.id}>
          {item.id}
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
              {/* <option value="inbox">Inbox</option> */}
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
