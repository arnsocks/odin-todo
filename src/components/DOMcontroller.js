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
  
  // this.loadComponent(CardLayout(App.listTasks()));

}

