import App from './appLogic';
import CardLayout from './layouts/cardLayout';

console.log("Activating the DOM controller");
const contentDiv = document.querySelector("#content");
contentDiv.textContent = "This is a test of DOMcontroller";


const newTaskDialog = document.querySelector("#new-task-dialog");
const newTaskBtn = document.querySelector("#new-task");
const confirmTaskBtn = document.querySelector("#task-confirm");
const cancelTaskBtn = document.querySelector("#task-cancel");

export function initEventListeners() {  
  newTaskBtn.addEventListener("click", () => {
    newTaskDialog.showModal();
  });
  confirmTaskBtn.addEventListener("click", confirmBtnClick);
  cancelTaskBtn.addEventListener("click", () => newTaskDialog.close());
}

export function loadProjectBar() {
  let projectBar = document.querySelector("#project-bar");
  // const projectList = App.listProjects();
  for (const project of App.listProjects()) {
    let myProject = document.createElement("div");
    myProject.textContent = `${project.title}`;
    projectBar.appendChild(myProject);
  }
}

export function loadComponent(component) {
  contentDiv.textContent = '';
  contentDiv.appendChild(component);
}

// *** Event Handler Functions ***

function confirmBtnClick(e) {
  e.preventDefault();
  newTaskDialog.close();

  const taskTitle = document.querySelector("#task-title");
  const taskDescription = document.querySelector("#task-description");
  const dueDate = document.querySelector("#due-date");

  App.createTask(taskTitle.value, taskDescription.value, dueDate.value);
  loadComponent(CardLayout(App.listTasks()));

  taskTitle.value = '';
  taskDescription.value = '';
  dueDate.value = new Date(Date.now);
}
