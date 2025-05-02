import "./styles.css";
import App from './components/appLogic.js';
import Storage from './components/storage.js';
import * as DOM from './components/DOMcontroller.js';
import CardLayout from './components/layouts/cardLayout.js';
import Project from "./components/project.js";

// Storage.deleteAll();
loadTempTasks();
DOM.renderTasks();
DOM.renderProjectBar();
DOM.initEventListeners();

// Create testing projects and tasks
// console.log(App.listTasks());
// console.log(App.listProjects());
// console.log(App.listTasks(projID));
// App.deleteTask(taskToDelete);

// console.log(App.listTasks());
// // App.deleteProject(projID);
// console.log(App.listTasks());
// console.log(`Attempting to edit task with ID ${taskToEdit}`);
// App.editTask(taskToEdit, "This task was edited", "Did the editing work?", new Date(Date.now()), "medium", "false", projID);
// console.log(App.listTasks());
// // Storage.deleteAll();

function loadTempTasks() {
  let currentTaskList = App.listTasks();
  if (currentTaskList.length === 0) {
    App.deleteAll();
    let projID = App.createProject("Default");
    App.createTask("test task", "This is a test", new Date(Date.now()), "High", projID);
    let taskToDelete = App.createTask("Task2", "A second test task", new Date(Date.now() + 120000), "Low", projID);
    let taskToEdit = App.createTask("Edit this task", "A task to test editing", new Date(Date.now()), "Medium", projID);
    App.createTask("New Project Task", "This task in not in the default project", new Date(Date.now()), "Low", "8675309");
  } 
}