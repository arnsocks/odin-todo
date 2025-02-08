import Project from "./project";
import Task from "./task";

// TEMPORARY STORAGE ARRAY
let tempTaskLib = [];
let tempProjLib = [];

export function addTask(title, description, dueDate, priority, projectID) {
  // Current unix time should be a good enough unique ID for this application for now
  const taskId = `${Date.now()}`;
  const myTask = new Task(taskId, title, description, dueDate, priority);
  tempTaskLib.push(myTask);

}

export function createProject(title) {
  const projId = `${Date.now()}`;
  const myProj = new Project(projId, title);
  tempProjLib.push(myProj);
}

export function listTasks() {
  return tempTaskLib;
}