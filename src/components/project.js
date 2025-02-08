export default class Project {
  
  #taskList = [];
  
  constructor(id, title) {
    this.id = id;
    this.title = title;
  }

  addTask(taskId) {
    this.#taskList.push(taskId);
  }


}