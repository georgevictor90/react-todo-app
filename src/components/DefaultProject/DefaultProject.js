import React, { useState, useEffect, useContext } from "react";
import { ProjectsContext } from "../Dashboard/Dashboard";
import Project from "./undraw-project-src.svg";

import {
  IoRadioButtonOffOutline,
  IoCheckmarkCircleOutline,
} from "react-icons/io5";
import {
  doc,
  deleteDoc,
  query,
  where,
  onSnapshot,
  orderBy,
} from "firebase/firestore";

export default function DefaultProject() {
  const { currentProject, projects, tasksRef } = useContext(ProjectsContext);
  const [removedCard, setRemovedCard] = useState("");
  const [currentProjectTasks, setCurrentProjectTasks] = useState([]);
  const [currentProjectId, setCurrentProjectId] = useState(null);
  const [taskCards, setTaskCards] = useState([]);

  useEffect(() => {
    const cards = currentProjectTasks.map((task) => {
      return (
        <div key={task.id} id={task.id} className="task-card">
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
    setTaskCards(cards);
  }, [currentProjectTasks, removedCard]);

  useEffect(() => {
    let q;

    if (currentProject === "today") {
      const date = new Date().toLocaleDateString("en-GB");
      q = query(
        tasksRef,
        where("formattedDate", "==", date),
        orderBy("date", "desc")
      );
    } else {
      q = query(
        tasksRef,
        where("projectId", "==", currentProjectId),
        orderBy("date", "desc")
      );
    }

    const unsub = onSnapshot(q, (querySnapshot) => {
      setCurrentProjectTasks(
        querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    });

    return () => unsub();
  }, [currentProject, currentProjectId, tasksRef]);

  useEffect(() => {
    const project = projects.find((proj) => proj.name === currentProject);
    if (project) {
      setCurrentProjectId(project.id);
    }
  }, [currentProject, projects]);

  async function deleteTask(id) {
    const taskDoc = doc(tasksRef, id);
    await deleteDoc(taskDoc);
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
      {taskCards.length ? (
        <div className="tasks-container">{taskCards}</div>
      ) : (
        <div className="section-img-and-info">
          <img className="section-image" src={Project} alt="No tasks" />
          <div className="section-content-info">
            <p className="status-text">
              What are you planning to get done ?{"\n"} Press "+" to add new
              tasks!
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
