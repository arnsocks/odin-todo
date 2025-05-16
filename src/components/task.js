import { v4 as uuidv4 } from 'uuid'; 

export default class Task {
  constructor(title, description, dueDate, priority, projectID, taskID = uuidv4()) {
    this.id = taskID;
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.isDone = false;
    this.project = projectID;
    this.dateCreated = new Date(Date.now());
  }
}