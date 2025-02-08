import "./styles.css";
import * as App from './components/appLogic.js';

App.createProject("Default");
App.addTask("test task", "This is a test", Date.now(), "high", "9384");

console.table(App.listTasks());

const body = document.querySelector('body');
const heading = document.createElement('h1');
heading.textContent = "This is a test of the emergency alert system";
body.appendChild(heading);