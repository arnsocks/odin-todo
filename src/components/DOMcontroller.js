// console.log('This is a wobbery');
import App from './appLogic';
import CardLayout from './layouts/cardLayout';

export default class DOMcontroller {
  constructor() {
    console.log('Activating the DOM controller');
    this.contentDiv = document.querySelector("#content");
    this.contentDiv.textContent = "This is a test of DOMcontroller";
  }

  initEventListeners() {
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

  loadComponent(component) {
    this.contentDiv.textContent = '';
    this.contentDiv.appendChild(component);
  }

  loadProjectBar() {
    console.log("Loading projects");
    let projectBar = document.querySelector("#project-bar");
    projectBar.classList.add("blue");
    const projectList = App.listProjects();
    for (const project of projectList) {

      let myProject = document.createElement("div");
      myProject.textContent = `${project.title}`;
      projectBar.appendChild(myProject);
    }
  }
}

