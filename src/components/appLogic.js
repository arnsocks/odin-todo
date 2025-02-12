import Project from "./project.js";
import Task from "./task.js";
import Storage from "./storage.js";

let taskList = Storage.loadTasks();
let projectList = Storage.loadProjects();

export default {
  createTask(title, description, dueDate, priority, projectID, taskID) {
    const myTask = new Task(title, description, dueDate, priority, projectID, taskID);
    taskList.push(myTask);
    Storage.saveTasks(taskList);
    return myTask.id;
  },
  
  createProject(title) {
    const myProj = new Project(title);
    projectList.push(myProj);
    Storage.saveProjects(projectList);
    return myProj.id;
  },
  
  listTasks(projectID) {
    // return all tasks if not given a projectID
    if (!projectID) return taskList;

    // return projects filtered by given projectID
    else {
      let projectTasks = taskList.filter((task) => task.project === projectID);
      return projectTasks;
    }
  },
  
  listProjects() {
    return projectList;
  },
  
  deleteTask(taskID) {
    taskList = taskList.filter((task) => task.id !== taskID);
    Storage.saveTasks(taskList);
  },
  
  deleteProject(projectID) {
    // Delete all the tasks associated with the project
    taskList = taskList.filter((task) => task.project !== projectID);
    Storage.saveTasks(taskList);

    // Delete the project
    projectList = projectList.filter((project) => project.id !== projectID);
    Storage.saveProjects(projectList);
  },

  editTask(taskID, title, description, dueDate, priority, projectID) {
    this.deleteTask(taskID);
    this.createTask(title, description, dueDate, priority, projectID, taskID);
  }

};



