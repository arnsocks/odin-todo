import Project from "./project";
import Task from "./task";
import { v4 as uuidv4 } from 'uuid'; 

// TEMPORARY STORAGE ARRAY
let taskList = [];
let projectList = [];

export function addTask(title, description, dueDate, priority, projectID) {
  const taskId = `${uuidv4()}`; // Generate a unique task ID number
  const myTask = new Task(taskId, title, description, dueDate, priority, projectID);
  taskList.push(myTask);

}

export function createProject(title) {
  const projId = `${uuidv4()}`; // Generate a unique project ID number
  const myProj = new Project(projId, title);
  projectList.push(myProj);
  return projId;
}

export function listTasks(projectID) {
  // return all tasks if not given a projectID
  if (!projectID) return taskList;
  // TODO return projects filtered by given projectID
}

export function listProjects() {
  return projectList;
}

export function deleteTask(taskID) {
  // TO DO find the task that matches the ID and remove it from the storage
  // 
}

export function deleteProject(projectID) {
  // TO DO delete the project that matches the ID and remove it from storage
  // TO DO delete all tasks that are assigned to that project.
  // 
}

