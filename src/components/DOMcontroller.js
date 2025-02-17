// console.log('This is a wobbery');
import App from './appLogic';
import CardLayout from './layouts/cardLayout';

console.log("Activating the DOM controller");
const contentDiv = document.querySelector("#content");
contentDiv.textContent = "This is a test of DOMcontroller";


export function initEventListeners() {
  const newTaskDialog = document.querySelector("#new-task-dialog");
  const newTaskBtn = document.querySelector("#new-task");
  newTaskBtn.addEventListener("click", () => {
    newTaskDialog.showModal();
  });

  const confirmTaskBtn = document.querySelector("#task-confirm");
  confirmTaskBtn.addEventListener("click", (e) => {
    e.preventDefault();
    newTaskDialog.close();
  });
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
