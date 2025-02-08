import "./styles.css";
import * as App from './components/appLogic.js';

const projID = App.createProject("Default");
App.addTask("test task", "This is a test", Date.now(), "high", projID);
App.addTask("Task2", "A second test task", Date.now() + 120000, "low", projID);

console.table(App.listTasks());
console.log(App.listProjects());

const body = document.querySelector('body');
const heading = document.createElement('h1');
heading.textContent = "This is a test of the emergency alert system";
body.appendChild(heading);