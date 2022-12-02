import React from "react";
import Bicycle from "./bicycle.svg";
import {
  IoRadioButtonOffOutline,
  IoCheckmarkCircleOutline,
} from "react-icons/io5";

export default function DefaultProject({ defaultSections, currentProject }) {
  const taskCards = defaultSections[currentProject].map((task) => {
    return (
      <div key={task.title} className="task-card">
        <div className="task-always-visible">
          <IoRadioButtonOffOutline className="task-circle" />
          <div className="task-card-title">{task.title}</div>
        </div>
        <div className="task-expandable hidden-element">
          <p className="task-card-description">{task.description || ""}</p>
          <span className="task-card-description">{task.date || ""}</span>
        </div>
      </div>
    );
  });

  return (
    <section className="section-content">
      {defaultSections[currentProject].length ? (
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
