import React, { useState } from "react";
import { RxPaperPlane } from "react-icons/rx";
import { SlClose } from "react-icons/sl";
import Modal from "react-modal";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { clear } from "@testing-library/user-event/dist/clear";

Modal.setAppElement("#root");

export default function AddTask({ projects, modalIsOpen, toggleModal }) {
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
    const task = {
      title: title,
      description: description,
      folder: projectFolder,
      date: selectedDate,
      formattedDate: selectedDate.toLocaleDateString("en-GB"),
    };

    clearForm();

    console.log(task);
  }

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
              <option value="inbox">Inbox</option>
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
