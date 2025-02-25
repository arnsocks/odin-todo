import { v4 as uuidv4 } from 'uuid'; 
import { format } from 'date-fns';

export default class Task {
  constructor(title, description, dueDate, priority, projectID, taskID = uuidv4()) {
    this.id = taskID;
    this.title = title;
    this.description = description;
    this.dueDate = format(dueDate, "MMMM dd, uu");
    this.priority = priority;
    this.isDone = false;
    this.project = projectID;
    this.dateCreated = new Date(Date.now());
  }
}