import React from "react";
import Bicycle from "./bicycle.svg";

export default function DefaultProject({ currentSection }) {
  return (
    <section className="section-content">
      {currentSection.todos.length ? (
        <div className="tasks-container">here go the task cards</div>
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
