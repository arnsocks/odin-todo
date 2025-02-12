import "./styles.css";
import App from './components/appLogic.js';

import Storage from './components/storage.js';


const body = document.querySelector('body');
const heading = document.createElement('h1');
heading.textContent = "This is a test of the emergency alert system";
body.appendChild(heading);

// Create testing projects and tasks

let projID;
let taskToDelete;

Storage.deleteAll();

projID = App.createProject("Default");
App.createTask("test task", "This is a test", new Date(Date.now()), "high", projID);
taskToDelete = App.createTask("Task2", "A second test task", new Date(Date.now() + 120000), "low", projID);
App.createTask("New Project Task", "This task in not in the default project", new Date(Date.now()), "low", "8675309");


const initTasks = App.listTasks();
console.log(initTasks);
console.log(App.listProjects());
console.log(App.listTasks(projID));
App.deleteTask(taskToDelete);
console.log(App.listTasks());
App.deleteProject(projID);
console.log(App.listTasks());

// console.log(App.listTasks());