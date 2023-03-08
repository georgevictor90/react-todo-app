import React, { useState } from "react";
import {
  IoRadioButtonOffOutline,
  IoCheckmarkCircleOutline,
  IoChevronForwardOutline,
  IoChevronDownOutline,
} from "react-icons/io5";

function TaskCard({ task, removedCard, toggleRemove }) {
  const [isExpanded, setIsExpanded] = useState(false);

  function toggleExpansion() {
    setIsExpanded((prevState) => !prevState);
  }

  const Icon = isExpanded ? IoChevronDownOutline : IoChevronForwardOutline;

  return (
    <li id={task.id} className="task-card">
      <div className="task-always-visible">
        <button onClick={toggleExpansion} aria-label="Toggle expand task">
          <Icon color="var(--secondary)" opacity=".3" fontSize="1rem" />
        </button>
        {removedCard !== task.id ? (
          <button
            data-id={task.id}
            className="task-circle"
            onClick={toggleRemove}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                toggleRemove(e);
              }
            }}
          >
            <IoRadioButtonOffOutline />
          </button>
        ) : (
          <button className="task-circle">
            <IoCheckmarkCircleOutline />
          </button>
        )}
        <p
          style={
            removedCard === task.id ? { textDecoration: "line-through" } : null
          }
          className="task-card-title"
        >
          {task.title}
        </p>
      </div>
      {isExpanded && (
        <div className="task-expandable">
          {task.description && (
            <p className="task-card-description">{task.description}</p>
          )}
          <span className="task-card-description">{task.formattedDate}</span>
        </div>
      )}
    </li>
  );
}

export default TaskCard;
