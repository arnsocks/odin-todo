import "./styles.css";
import App from './components/appLogic.js';
import * as DOM from './components/DOMcontroller.js';

// Storage.deleteAll();
loadTempTasks();
DOM.renderTasks();
DOM.renderProjectBar();
DOM.initEventListeners();

function loadTempTasks() {
  let currentTaskList = App.listTasks();
  if (currentTaskList.length === 0) {
    App.deleteAll();
    let projID = App.createProject("Destroy the Death Star");
    App.createTask("Steal the plans", "The death star plans are stored in the citadel tower on Scarif.", new Date(Date.now()), "High", projID);
    App.createTask("Find Obi-Wan Kenobi", "We're going to need a Jedi. This one lives on Tatooine. ", new Date(Date.now() + 120000), "Low", projID);
    App.createTask("Deliver the Death Star plans", "Make sure the plans make it to the rebel alliance on Yavin IV.", new Date(Date.now()), "High", projID);
    App.createTask("Blow it up.", "There's a small thermal exhaust port just above the main port.", new Date(Date.now() + 3500000), "Medium", projID);
  } 
}