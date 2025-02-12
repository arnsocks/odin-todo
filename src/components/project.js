import { v4 as uuidv4 } from 'uuid'; 
export default class Project {
  
  constructor(title, projectID = uuidv4()) {
    this.id = projectID;
    this.title = title;
  }
}