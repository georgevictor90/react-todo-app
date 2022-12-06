import React from "react";
import Bicycle from "./bicycle.svg";
import {
  IoRadioButtonOffOutline,
  IoCheckmarkCircleOutline,
} from "react-icons/io5";

export default function DefaultProject({
  projects,
  setProjects,
  currentProject,
}) {
  // const [startRemove, setStartRemove] = React.useState("false");
  const [removedCard, setRemovedCard] = React.useState("");

  const taskCards = projects[currentProject].tasks.map((task) => {
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

  function deleteTask(id) {
    const pairs = [];
    const keynames = Object.keys(projects);
    keynames.forEach((name) => {
      if (projects[name].tasks.find((task) => task.id === id) === undefined)
        return;
      const newTasks = projects[name].tasks.filter((task) => task.id !== id);
      pairs.push({ name: name, newTasks: newTasks });
    });
    const newState = { ...projects };
    pairs.forEach((pair) => {
      newState[pair.name].tasks = pair.newTasks;
    });
    setProjects(newState);
  }

  function toggleRemove(e) {
    const id = e.target.dataset.id;
    setRemovedCard(id);
    setTimeout(() => {
      deleteTask(id);
      setRemovedCard("");
    }, 1000);
  }

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
