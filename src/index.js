import "./styles.css";
import App from './components/appLogic.js';
import Storage from './components/storage.js';
import DOMcontroller from './components/DOMcontroller.js';
import CardLayout from './components/layouts/cardLayout.js';

const body = document.querySelector('body');
const heading = document.createElement('h1');
heading.textContent = "This is a test of the emergency alert system";
body.appendChild(heading);

const DOM = new DOMcontroller;
// window.DOM = new DOMcontroller;

Storage.deleteAll();
loadTempTasks();
DOM.loadComponent(CardLayout(App.listTasks()));






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
  let projID = App.createProject("Default");
  App.createTask("test task", "This is a test", new Date(Date.now()), "high", projID);
  let taskToDelete = App.createTask("Task2", "A second test task", new Date(Date.now() + 120000), "low", projID);
  let taskToEdit = App.createTask("Edit this task", "A task to test editing", new Date(Date.now()), "medium", projID);
  App.createTask("New Project Task", "This task in not in the default project", new Date(Date.now()), "low", "8675309");
}

// DOM.loadComponent(CardLayout(App.listTasks()));