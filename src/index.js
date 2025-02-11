import "./styles.css";
import App from './components/appLogic.js';


const body = document.querySelector('body');
const heading = document.createElement('h1');
heading.textContent = "This is a test of the emergency alert system";
body.appendChild(heading);

// Create testing projects and tasks
const projID = App.createProject("Default");
App.createTask("test task", "This is a test", new Date(Date.now()), "high", projID);
App.createTask("Task2", "A second test task", new Date(Date.now() + 120000), "low", projID);
App.createTask("New Project Task", "This task in not in the default project", new Date(Date.now()), "low", "8675309");

console.table(App.listTasks());
console.log(App.listProjects());
console.log(App.listTasks(projID));