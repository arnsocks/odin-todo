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
const taskDialogHeading = document.querySelector("#task-dialog-heading");
const taskTitle = document.querySelector("#task-title");
const taskDescription = document.querySelector("#task-description");
const dueDate = document.querySelector("#due-date");
const priority = document.querySelector("#priority");
const project = document.querySelector("#project-select");
const sortBtn = document.querySelector("#sort-date-btn");

let mainHeader = document.querySelector("#main-header");

let displayModeList = ["cardLayout"];
let defaultDisplayMode = "cardLayout";
let currentDisplayMode = "cardLayout";
let currentDisplayProject;
let currentSortMethod;

export function renderTasks() {
  // Load the task module
  let myTaskList = App.listTasks(currentDisplayProject);

  if (currentSortMethod) {
    myTaskList = App.sortTasks(myTaskList, currentSortMethod);
    console.table(myTaskList);
  }
  loadComponent(CardLayout(myTaskList));
  
  // Update the heading to show the currently selected project info.
  mainHeader.textContent = '';
  let mainHeading = document.createElement("h1");
  mainHeading.id = "main-heading";
  mainHeading.textContent = "All Tasks";
  mainHeader.appendChild(mainHeading);

  if (currentDisplayProject) {
    let currentProject = App.getProjectByID(currentDisplayProject);
    mainHeading.textContent = currentProject.title;
    let projectDescriptionHeading = document.createElement("p");
    projectDescriptionHeading.textContent = currentProject.description;
    mainHeader.appendChild(projectDescriptionHeading);
  };
}

export function initEventListeners() {  
  newTaskBtn.addEventListener("click", newTaskClick);
  cancelTaskBtn.addEventListener("click", taskCancelClick);

  newProjectBtn.addEventListener("click", () => {
    newProjectDialog.showModal();
  });
  confirmProjBtn.addEventListener("click", confirmProjectClick);
  cancelProjBtn.addEventListener("click", () => newProjectDialog.close());

  sortBtn.addEventListener("click", () => {
    currentSortMethod = "dueDate";
    renderTasks();
  })
}

export function renderProjectBar() {
  let projectBar = document.querySelector("#project-bar");
  let projectSelect = document.querySelector("#project-select");
  let projectList = document.querySelector("#project-list");
  projectSelect.textContent = '';
  projectList.textContent = '';

  // Create the list of projects on the sidebar
  let allProj = document.createElement("li");
  let allProjBtn = document.createElement("button");
  allProjBtn.textContent = "View All Tasks";
  allProjBtn.addEventListener("click", filterProjectClick);
  allProj.appendChild(allProjBtn);
  projectList.appendChild(allProj);

  for (const project of App.listProjects()) {
    let myProject = document.createElement("li");
    let myProjectBtn = document.createElement("button");
    myProjectBtn.textContent = `${project.title}`;
    myProjectBtn.dataset.projectID = project.id;
    myProjectBtn.addEventListener("click", filterProjectClick);
    myProject.appendChild(myProjectBtn);

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

function newTaskClick() {
  taskDialogHeading.textContent = "Create New Task";
  confirmTaskBtn.addEventListener("click", confirmNewTask);
  newTaskDialog.showModal();
}

function taskCancelClick() {
  clearTaskInputs();
  newTaskDialog.close();
}

function confirmNewTask() {
  newTaskDialog.close();

  App.createTask(taskTitle.value, taskDescription.value, dueDate.value, priority.value, project.value);
  clearTaskInputs();
  renderTasks();

  confirmTaskBtn.removeEventListener("click", confirmNewTask);
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

export function editTaskHandler(e) {
  const myTask = App.getTaskByID(e.target.parentNode.dataset.taskID);
  taskDialogHeading.textContent = `Edit Task`;
  taskTitle.value = myTask.title;
  taskDescription.value = myTask.description;
  dueDate.value = myTask.dueDate;
  priority.value = myTask.priority;
  project.value = App.getProjectByID(myTask.projectID);

  confirmTaskBtn.dataset.taskID = `${myTask.id}`;
  confirmTaskBtn.addEventListener("click", confirmEditTask);

  newTaskDialog.showModal();
}

function clearTaskInputs() {
  taskTitle.value = '';
  taskDescription.value = '';
  dueDate.value = new Date(Date.now);
  priority.value = '';
  project.value = '';
}

function confirmEditTask(e) {
  newTaskDialog.close();
  const myTaskID = e.target.dataset.taskID;
  const myTask = App.getTaskByID(myTaskID);
  App.editTask(myTaskID, taskTitle.value, taskDescription.value, dueDate.value, priority.value, myTask.isDone, project.value);
  confirmTaskBtn.removeEventListener("click", confirmEditTask);
  confirmTaskBtn.dataset.taskID = '';
  clearTaskInputs();
  renderTasks();
}

function filterProjectClick(e) {
  if (e.target.dataset.projectID) {
    currentDisplayProject = e.target.dataset.projectID;

  } else currentDisplayProject = null;
  renderTasks();

}