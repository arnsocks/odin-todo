import { v4 as uuidv4 } from 'uuid'; 
export default class Project {
  
  constructor(title, description, projectID = uuidv4()) {
    this.id = projectID;
    this.description = description;
    this.title = title;
  }
}