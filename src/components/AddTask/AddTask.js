import React from "react";
import { RxPaperPlane } from "react-icons/rx";
import { SlClose } from "react-icons/sl";
import Modal from "react-modal";

Modal.setAppElement("#root");

export default function AddTask({ projects, modalIsOpen, toggleModal }) {
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
            placeholder="e.g. Renew gym subscription"
          />
          <textarea
            name="description"
            id="description"
            className="task-description-input"
            placeholder="Description"
          ></textarea>
        </div>
        <div className="extra-fields">
          <div className="pills">
            <input
              type="date"
              name="date"
              id="date"
              className="due-date-button"
            />
            <select name="select" id="select" className="folder-select-button">
              <option value="Inbox">Inbox</option>
            </select>
          </div>
          <div className="item-actions"></div>
        </div>
        <button className="submit-button">
          <RxPaperPlane className="submit-button-icon" />
        </button>
      </form>
    </Modal>
  );
}
