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
const dueDateSortBtn = document.querySelector("#sort-date-btn");
const createDateSortBtn = document.querySelector("#sort-createDate-btn");
const prioritySortBtn = document.querySelector("#sort-priority-btn");
const alphaSortBtn = document.querySelector("#sort-alpha-btn");
const showCompleteBtn = document.querySelector("#toggle-complete-btn");


let mainHeader = document.querySelector("#main-header");

let displayModeList = ["cardLayout"];
let defaultDisplayMode = "cardLayout";
let currentDisplayMode = "cardLayout";
export let showComplete = false;
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

  dueDateSortBtn.addEventListener("click", sortTaskClick);
  createDateSortBtn.addEventListener("click", sortTaskClick);
  prioritySortBtn.addEventListener("click", sortTaskClick);
  alphaSortBtn.addEventListener("click", sortTaskClick);
  showCompleteBtn.addEventListener("click", toggleCompleteClick);

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
    myProject.dataset.projectID = project.id;
    myProject.classList.add("project");
    let myProjectBtn = document.createElement("button");
    myProjectBtn.textContent = `${project.title}`;
    myProjectBtn.addEventListener("click", filterProjectClick);
    myProject.appendChild(myProjectBtn);

     // Create the project deletion button
    let projDeleteBtn = document.createElement("button");
    projDeleteBtn.textContent = "";
    projDeleteBtn.classList.add("delete-btn");
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
  dueDate.valueAsDate = new Date();
  newTaskDialog.showModal();
}

function taskCancelClick() {
  clearTaskInputs();
  newTaskDialog.close();
}

function confirmNewTask(e) {
  // e.preventDefault();
  
  if (!testInputValidity(taskTitle.value, priority.value)) return;

  console.log (`Creating a task with title ${taskTitle.value} desc: ${taskDescription.value}, priority: ${priority.value} and project: ${project.value}`);
  App.createTask(taskTitle.value, taskDescription.value, dueDate.value, priority.value, project.value);
  newTaskDialog.close();
  clearTaskInputs();
  renderTasks();

  confirmTaskBtn.removeEventListener("click", confirmNewTask);
}

function confirmProjectClick() {

  

  const projectTitle = document.querySelector("#project-title");
  const projectDescription = document.querySelector("#project-description");
  if (!testInputValidity(projectTitle.value)) return;

  App.createProject(projectTitle.value, projectDescription.value);
  
  newProjectDialog.close();
  renderProjectBar();
  projectTitle.value = '';
  projectDescription.value = '';
}

function projDeleteClick(e) {
  const myProject = App.getProjectByID(e.target.parentNode.dataset.projectID);
  if (confirm(`Do you want to delete project ${myProject.title} and all of it's tasks?`)) {
    App.deleteProject(myProject.id);
    if (myProject.id === currentDisplayProject) {
      currentDisplayProject = null;
    }
    renderProjectBar();
    renderTasks();
  }
}

export function editTaskHandler(e) {
  const myTask = App.getTaskByID(e.target.parentNode.dataset.taskID);
  taskDialogHeading.textContent = `Edit Task`;
  taskTitle.value = myTask.title;
  taskDescription.value = myTask.description;
  dueDate.valueAsDate = new Date(myTask.dueDate);
  priority.value = myTask.priority;
  project.value = myTask.project;

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
  // e.preventDefault();

  if (!testInputValidity(taskTitle.value, priority.value)) return;

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
  if (e.target.parentNode.dataset.projectID) {
    currentDisplayProject = e.target.parentNode.dataset.projectID;

  } else currentDisplayProject = null;
  renderTasks();

}

function sortTaskClick(e) {
  currentSortMethod = e.target.value;
  renderTasks();
}

function toggleCompleteClick() {
  if (showComplete) {
    showCompleteBtn.textContent = "Show Completed Tasks";
  } else {
    showCompleteBtn.textContent = "Hide Completed Tasks";
  }
  
  showComplete = !showComplete;
  renderTasks();
}

export function deleteTaskHandler(e) {
  const myTask = App.getTaskByID(e.target.dataset.taskID);
  if (confirm (`Are you sure you want to delete task: ${myTask.title}?`)) {
    App.deleteTask(myTask.id);
    renderTasks();
  }
}

export function toggleTaskHandler(e) {
  const myTaskID = e.target.parentNode.parentNode.parentNode.dataset.taskID;
  App.changeTaskStatus(myTaskID, e.target.checked);

}

function testInputValidity(...args) {
  for (const arg of args) {
    if (arg == '') return false;
  }
  return true;
}