import React from "react";
import Bicycle from "./bicycle.svg";
import {
  IoRadioButtonOffOutline,
  IoCheckmarkCircleOutline,
} from "react-icons/io5";

export default function DefaultProject({ projects, currentProject }) {
  const taskCards = projects[currentProject].tasks.map((task) => {
    return (
      <div key={task.id} className="task-card">
        <div className="task-always-visible">
          <IoRadioButtonOffOutline className="task-circle" />
          <div className="task-card-title">{task.title}</div>
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

  return (
    <section className="section-content">
      {projects[currentProject].tasks.length ? (
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
      )}
    </section>
  );
}
