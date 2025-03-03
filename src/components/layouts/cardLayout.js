// import appLogic from "../appLogic";
import APP from '../appLogic.js';
import { renderTasks, editTaskHandler } from '../DOMcontroller.js';
import {format} from 'date-fns';

export default function TaskCards(taskList) {
  const cardContainer = document.createElement('div');
  cardContainer.classList.add('card-container');

  for (const task of taskList) {
    const taskCard = document.createElement('div');
    taskCard.classList.add('task-card');
    taskCard.dataset.taskID = task.id;

    const taskInfoList = document.createElement('ul');
    taskInfoList.classList.add('task-info-list');

    // Create the checkbox
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.name = 'task-checkbox';
    checkbox.id = "#task-checkbox";
    checkbox.classList.add('task-checkbox');
    checkbox.checked = task.isDone;
    checkbox.addEventListener("change", toggleTaskHandler);

    // Create Task Card Heading
    const titleItem = document.createElement('li');
    const myTitle = document.createElement('h2');
    myTitle.textContent = task.title;
    titleItem.appendChild(checkbox);
    titleItem.appendChild(myTitle);

    //Create Due Date
    const dueItem = document.createElement('li');
    const myDueDate = document.createElement('span');
    const dueDateHeading = document.createElement('span');
    dueDateHeading.classList.add('task-info-heading');
    dueDateHeading.textContent = 'Due: '
    myDueDate.textContent += `${format(task.dueDate, "MMMM dd, uu")}`;
    dueItem.appendChild(dueDateHeading);
    dueItem.appendChild(myDueDate);

    // Create description
    const descriptionItem = document.createElement('li');
    const myDescription = document.createElement('span');
    const descriptionHeading= document.createElement('span');
    descriptionHeading.classList.add('task-info-heading');
    descriptionHeading.textContent = 'Description: ';
    myDescription.textContent = `${task.description}`;
    descriptionItem.appendChild(descriptionHeading);
    descriptionItem.appendChild(myDescription);

    // Create priority
    const priorityItem = document.createElement('li');
    const myPriority = document.createElement('span');
    const priorityHeading= document.createElement('span');
    priorityHeading.classList.add('task-info-heading');
    priorityHeading.textContent = 'Priority: ';
    myPriority.textContent = `${task.priority}`;
    priorityItem.appendChild(priorityHeading);
    priorityItem.appendChild(myPriority);

    // Create Project 
    const projectItem = document.createElement('li');
    const myProject = document.createElement('span');
    const projectHeading = document.createElement('span');
    projectHeading.classList.add('task-info-heading');
    projectHeading.textContent = 'Project: ';
    const projectObj = APP.getProjectByID(task.project);
    let projectName = 'No project assigned';
    if (projectObj) projectName = `${projectObj.title}`;
    myProject.textContent = `${projectName}`;
    projectItem.appendChild(projectHeading);
    projectItem.appendChild(myProject);

    // Create Delete Button
    const deleteBtn = document.createElement('button');
    deleteBtn.id = "task-delete-btn";
    deleteBtn.type = "button";
    deleteBtn.textContent = 'Delete';
    deleteBtn.dataset.taskID = task.id;
    deleteBtn.addEventListener("click", deleteTaskHandler);

    // Create Edit Button
    const editBtn = document.createElement('button');
    editBtn.id = "task-edit-btn";
    editBtn.textContent = "edit";
    editBtn.addEventListener("click", editTaskHandler);

    // DEBUG show task ID
    const taskIDDebug = document.createElement('p');
    taskIDDebug.textContent = task.id;



    taskInfoList.appendChild(titleItem);
    taskInfoList.appendChild(descriptionItem);
    taskInfoList.appendChild(dueItem);
    taskInfoList.appendChild(priorityItem);
    taskInfoList.appendChild(projectItem);
    taskCard.appendChild(taskInfoList);
    taskCard.appendChild(deleteBtn);
    taskCard.appendChild(editBtn);
    taskCard.appendChild(taskIDDebug);
    cardContainer.appendChild(taskCard);
  };
  return cardContainer;
}

function deleteTaskHandler(e) {
  const myTask = APP.getTaskByID(e.target.dataset.taskID);
  if (confirm (`Are you sure you want to delete task: ${myTask.title}?`)) {
    APP.deleteTask(myTask.id);
    renderTasks();
  }
}

function toggleTaskHandler(e) {
  const myTaskID = e.target.parentNode.parentNode.parentNode.dataset.taskID;
  APP.changeTaskStatus(myTaskID, e.target.checked);
}

const titleHeading = document.createElement('span');
titleHeading.classList.add('task-info-heading');
titleHeading.textContent = ''