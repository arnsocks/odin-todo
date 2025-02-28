import App from './appLogic';
import CardLayout from './layouts/cardLayout';

const contentDiv = document.querySelector("#content");
contentDiv.textContent = "This is a test of DOMcontroller";

const newTaskDialog = document.querySelector("#new-task-dialog");
const newTaskBtn = document.querySelector("#new-task");
const confirmTaskBtn = document.querySelector("#task-confirm");
const cancelTaskBtn = document.querySelector("#task-cancel");
const newProjectDialog = document.querySelector("#new-project-dialog");
const newProjectBtn = document.querySelector("#new-project-button");
const confirmProjBtn = document.querySelector("#project-confirm");
const cancelProjBtn = document.querySelector("#project-cancel");

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

  newProjectBtn.addEventListener("click", () => {
    newProjectDialog.showModal();
  });
  confirmProjBtn.addEventListener("click", confirmProjectClick);
  cancelProjBtn.addEventListener("click", () => newProjectDialog.close());
}

export function renderProjectBar() {
  let projectBar = document.querySelector("#project-bar");
  let projectSelect = document.querySelector("#project-select");
  let projectList = document.querySelector("#project-list");
  projectSelect.textContent = '';
  projectList.textContent = '';

  // Create the list of projects on the sidebar
  for (const project of App.listProjects()) {
    let myProject = document.createElement("li");
    myProject.textContent = `${project.title}`;
    myProject.dataset.projectID = project.id;

     // Create the project deletion button
    let projDeleteBtn = document.createElement("button");
    projDeleteBtn.textContent = "delete";
    projDeleteBtn.addEventListener("click", projDeleteClick);
    myProject.appendChild(projDeleteBtn);

    projectList.appendChild(myProject);

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

function confirmBtnClick() {
  newTaskDialog.close();

  const taskTitle = document.querySelector("#task-title");
  const taskDescription = document.querySelector("#task-description");
  const dueDate = document.querySelector("#due-date");
  const priority = document.querySelector("#priority");
  const project = document.querySelector("#project-select");

  App.createTask(taskTitle.value, taskDescription.value, dueDate.value, priority.value, project.value);
  renderTasks();

  taskTitle.value = '';
  taskDescription.value = '';
  dueDate.value = new Date(Date.now);
}

function confirmProjectClick() {
  newProjectDialog.close();

  const projectTitle = document.querySelector("#project-title");
  const projectDescription = document.querySelector("#project-description");

  App.createProject(projectTitle.value, projectDescription.value);
  renderProjectBar();

  projectTitle.value = '';
  projectDescription.value = '';
}

function projDeleteClick(e) {
  const myProject = App.getProjectByID(e.target.parentNode.dataset.projectID);
  if (confirm(`Do you want to delete project ${myProject.title} and all of it's tasks?`)) {
    App.deleteProject(myProject.id);
    renderProjectBar();
    renderTasks();
  }
  
}
