import Project from "./project.js";
import Task from "./task.js";
import { v4 as uuidv4 } from 'uuid'; 

// TEMPORARY STORAGE ARRAY
let taskList = [];
let projectList = [];

export default {
  addTask(title, description, dueDate, priority, projectID) {
    const myTask = new Task(title, description, dueDate, priority, projectID);
    taskList.push(myTask);
  
  },
  
  createProject(title) {
    const myProj = new Project(title);
    projectList.push(myProj);
    // Storage.saveProjects(projectList);
    return myProj.id;
  },
  
  listTasks(projectID) {
    // return all tasks if not given a projectID
    if (!projectID) return taskList;

    // return projects filtered by given projectID
    else {
      let projectTasks = taskList.filter((task) => task.project === projectID);
      return projectTasks;
    }
  },
  
  listProjects() {
    return projectList;
  },
  
  deleteTask(taskID) {
    // TO DO find the task that matches the ID and remove it from the storage
    // 
  },
  
  deleteProject(projectID) {
    // TO DO delete the project that matches the ID and remove it from storage
    // TO DO delete all tasks that are assigned to that project.
    // 
  }
};



