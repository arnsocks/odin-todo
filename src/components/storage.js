// Initialize localStorage arrays if needed
import Task from "./task";
import Project from "./project";

if (!localStorage.taskList) localStorage.setItem("taskList", JSON.stringify([]));
if (!localStorage.projectList) localStorage.setItem("projectList", JSON.stringify([]));

export default {
  loadTasks() {
    return JSON.parse(localStorage.getItem("taskList"));
  },

  loadProjects() {
    return JSON.parse(localStorage.getItem("projectList"));
  },

  saveTasks(tasks) {
    localStorage.setItem("taskList", JSON.stringify(tasks));
  },

  saveProjects(projects) {
    localStorage.setItem("projectList", JSON.stringify(projects));
  }
}



