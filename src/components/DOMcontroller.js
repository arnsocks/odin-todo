// console.log('This is a wobbery');
import App from './appLogic';
import CardLayout from './layouts/cardLayout';

export default class DOMcontroller {
  constructor() {
    console.log('Activating the DOM controller');
    this.contentDiv = document.querySelector("#content");
    this.contentDiv.textContent = "This is a test of DOMcontroller";
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

