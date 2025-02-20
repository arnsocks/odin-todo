import App from './appLogic';
import CardLayout from './layouts/cardLayout';

const contentDiv = document.querySelector("#content");
contentDiv.textContent = "This is a test of DOMcontroller";

const newTaskDialog = document.querySelector("#new-task-dialog");
const newTaskBtn = document.querySelector("#new-task");
const confirmTaskBtn = document.querySelector("#task-confirm");
const cancelTaskBtn = document.querySelector("#task-cancel");

let displayModeList = ["cardLayout"];
let defaultDisplayMode = "cardLayout";
let currentDisplayMode = "cardLayout";

export function renderTasks() {
  loadComponent(CardLayout(App.listTasks()));
}

export function initEventListeners() {  
  newTaskBtn.addEventListener("click", () => {
    newTaskDialog.showModal();
  });
  confirmTaskBtn.addEventListener("click", confirmBtnClick);
  cancelTaskBtn.addEventListener("click", () => newTaskDialog.close());
}

export function loadProjectBar() {
  let projectBar = document.querySelector("#project-bar");
  let projectSelect = document.querySelector("#project-select");
  projectSelect.textContent = '';
  
  // const projectList = App.listProjects();
  for (const project of App.listProjects()) {
    let myProject = document.createElement("div");
    myProject.textContent = `${project.title}`;
    projectBar.appendChild(myProject);

    // This bit updates the list of projects in the select dropdown and should
    // probably live in a page refresh method in the future
    let myProjectOption = document.createElement("option");
    myProjectOption.value = `${project.id}`;
    myProjectOption.textContent = `${project.title}`;
    projectSelect.appendChild(myProjectOption);
  }
}

export function loadComponent(component) {
  contentDiv.textContent = '';
  contentDiv.appendChild(component);
}

// *** Event Handler Functions ***

function confirmBtnClick(e) {
  // e.preventDefault();
  newTaskDialog.close();

  const taskTitle = document.querySelector("#task-title");
  const taskDescription = document.querySelector("#task-description");
  const dueDate = document.querySelector("#due-date");
  const priority = document.querySelector("#priority");
  const project = document.querySelector("#project-select");

  App.createTask(taskTitle.value, taskDescription.value, dueDate.value, priority.value, project.value);
  loadComponent(CardLayout(App.listTasks()));

  taskTitle.value = '';
  taskDescription.value = '';
  dueDate.value = new Date(Date.now);
}
