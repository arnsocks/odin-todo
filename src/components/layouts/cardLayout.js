// import appLogic from "../appLogic";
import APP from '../appLogic.js';

export default function TaskCards(taskList) {
  const cardContainer = document.createElement('div');
  cardContainer.classList.add('card-container');

  for (const task of taskList) {
    const taskCard = document.createElement('div');
    taskCard.classList.add('task-card');
    taskCard.dataset.taskID = task.id;
    
    const myTitle = document.createElement('h2');
    myTitle.textContent = task.title;
    const myDueDate = document.createElement('p');
    myDueDate.textContent = `Due: ${task.dueDate}`;
    const myDescription = document.createElement('p');
    myDescription.textContent = `Description: ${task.description}`;
    const myPriority = document.createElement('p');
    myPriority.textContent = `Priority: ${task.priority}`;
    myPriority.classList.add("priority", `${task.priority}`);


    const myProject = document.createElement('p');
    const projectObj = APP.getProjectByID(task.project);
    let projectName = 'No project assigned';
    if (projectObj) projectName = `${projectObj.title}`;
    myProject.textContent = `Project: ${projectName}`;

    taskCard.appendChild(myTitle);
    taskCard.appendChild(myDescription);
    taskCard.appendChild(myDueDate);
    taskCard.appendChild(myPriority);
    taskCard.appendChild(myProject);
    cardContainer.appendChild(taskCard);
  };

  return cardContainer;
}