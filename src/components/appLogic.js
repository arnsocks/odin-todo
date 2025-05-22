import Project from "./project.js";
import Task from "./task.js";
import Storage from "./storage.js";
import { compareAsc } from "date-fns";

let taskList = Storage.loadTasks();
let projectList = Storage.loadProjects();
const priorityList = ["High", "Medium", "Low"];

export default {
  createTask(title, description, dueDate, priority, projectID, taskID) {
    const myTask = new Task(title, description, dueDate, priority, projectID, taskID);
    taskList.push(myTask);
    Storage.saveTasks(taskList);
    return myTask.id;
  },
  
  createProject(title, description) {
    const myProj = new Project(title, description);
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

  editTask(taskID, title, description, dueDate, priority, isDone, projectID) {
    // Copy the task and update its fields
    let myTaskIndex = taskList.findIndex((task) => task.id === taskID);
    let myTask = taskList[myTaskIndex];
    myTask.title = title;
    myTask.description = description;
    myTask.dueDate = dueDate;
    myTask.priority = priority;
    myTask.project = projectID;
    myTask.isDone = isDone;

    // Put the updated task back in the taskList
    taskList.splice(myTaskIndex, 1, myTask);
    Storage.saveTasks(taskList);
  },

  getProjectByID(projID) {
    const myProject = projectList.find((project) => project.id == projID);
    return myProject;
  },

  getTaskByID(taskID) {
    return taskList.find((task) => task.id == taskID);
  },

  deleteAll() {
    taskList = [];
    projectList = [];
    Storage.saveProjects(projectList);
    Storage.saveTasks(taskList);
  },

  changeTaskStatus(taskID, status) {
    let myTaskIndex = taskList.findIndex((task) => task.id == taskID);
    taskList[myTaskIndex].isDone = status;
    Storage.saveTasks(taskList);
  },

  sortTasks(taskList, field) {
    switch (field) {
      case "dueDate":
        return taskList.toSorted((a,b) => compareAsc(a.dueDate, b.dueDate));
      case "createdDate":
        return taskList.toSorted((a,b) => compareAsc(a.dateCreated, b.dateCreated));
      case "priority":
        return taskList.toSorted((a,b) => priorityList.indexOf(a.priority) - priorityList.indexOf(b.priority));
      case "alphabetical":
        return taskList.toSorted((a,b) => a.title.localeCompare(b.title));
      default:
        return taskList;
    }
  },

  getPriorityList() {
    return priorityList;
  }

};



