export default function TaskCards(taskList) {
  const cardContainer = document.createElement('div');
  cardContainer.id = 'card-container';

  for (const task of taskList) {
    const taskCard = document.createElement('div');
    taskCard.classList.add('task-card');
    taskCard.dataset.taskID = task.id;
    
    const myTitle = document.createElement('h2');
    myTitle.textContent = task.title;
    const myDueDate = document.createElement('p');
    myDueDate.textContent = task.dueDate;

    taskCard.appendChild(myTitle);
    taskCard.appendChild(myDueDate);
    cardContainer.appendChild(taskCard);
  };

  return cardContainer;
}