import React, { useState, useEffect, useContext } from "react";
import { ProjectsContext } from "../Dashboard/Dashboard";
import Project from "./undraw-project-src.svg";

import {
  doc,
  deleteDoc,
  query,
  where,
  onSnapshot,
  orderBy,
} from "firebase/firestore";
import TaskCard from "../TaskCard/TaskCard";

export default function DefaultProject() {
  const { currentProject, projects, tasksRef } = useContext(ProjectsContext);
  const [removedCard, setRemovedCard] = useState("");
  const [currentProjectTasks, setCurrentProjectTasks] = useState([]);
  const [currentProjectId, setCurrentProjectId] = useState(null);
  const [taskCards, setTaskCards] = useState([]);

  useEffect(() => {
    ///Create task cards
    const cards = currentProjectTasks.map((task) => {
      return (
        <TaskCard
          key={task.id}
          task={task}
          removedCard={removedCard}
          toggleRemove={toggleRemove}
        />
      );
    });
    setTaskCards(cards);
  }, [currentProjectTasks, removedCard]);

  useEffect(() => {
    ///Queries the database for the current project tasks
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
    //Gets the unique id of the current project
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
        <ul className="tasks-container">{taskCards}</ul>
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
