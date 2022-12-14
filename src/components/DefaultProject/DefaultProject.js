import React, { useState, useEffect } from "react";
import Bicycle from "./bicycle.svg";
import {
  IoRadioButtonOffOutline,
  IoCheckmarkCircleOutline,
} from "react-icons/io5";
import { db } from "../../firebase-config";
import { doc, deleteDoc } from "firebase/firestore";

export default function DefaultProject({ currentProject, projects, tasks }) {
  const [removedCard, setRemovedCard] = useState("");
  const [currentProjectTasks, setCurrentProjectTasks] = useState([]);

  useEffect(() => {
    setCurrentProjectTasks(
      tasks.filter((task) => task.folder.includes(currentProject))
    );
  }, [tasks, currentProject]);

  let taskCards = [];

  if (currentProjectTasks.length) {
    taskCards = currentProjectTasks.map((task) => {
      return (
        <div key={task.id} className="task-card">
          <div className="task-always-visible">
            {removedCard !== task.id ? (
              <IoRadioButtonOffOutline
                data-id={task.id}
                onClick={toggleRemove}
                className="task-circle"
              />
            ) : (
              <IoCheckmarkCircleOutline
                data-id={task.id}
                onClick={toggleRemove}
                className="task-circle"
              />
            )}
            <div
              style={
                removedCard === task.id
                  ? { textDecoration: "line-through" }
                  : null
              }
              className="task-card-title"
            >
              {task.title}
            </div>
          </div>
          <div className="task-expandable hidden-element">
            {task.description && (
              <p className="task-card-description">{task.description}</p>
            )}
            <span className="task-card-description">{task.formattedDate}</span>
          </div>
        </div>
      );
    });
  }

  async function deleteTask(id) {
    const taskDoc = doc(db, "tasks", id);
    await deleteDoc(taskDoc);
  }

  function toggleRemove(e) {
    console.log("toggleRemove");
    const id = e.target.dataset.id;
    console.log(id);
    setRemovedCard(id);
    setTimeout(() => {
      deleteTask(id);
      setRemovedCard("");
    }, 1000);
  }

  return (
    <section className="section-content">
      {tasks.length ? (
        taskCards.length ? (
          <div className="tasks-container">{taskCards}</div>
        ) : (
          <div className="section-img-and-info">
            <img className="section-image" src={Bicycle} alt="No tasks" />
            <div className="section-content-info">
              <p className="status-text">
                {`You're all done for today! \n Congratulations!`}
              </p>
              <p className="para-text">Enjoy the rest of the day!</p>
            </div>
          </div>
        )
      ) : (
        "Loading"
      )}
    </section>
  );
}
