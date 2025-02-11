// TEMPORARY STORAGE ARRAY - to be replaced with LocalStorage
let taskList = [];
let projectList = [];

export default {
  loadTasks() {
    return taskList;
  },

  loadProjects() {
    return projectList;
  },

  saveTasks(tasks) {
    taskList = tasks;
  },

  saveProjects(projects) {
    projectList = projects;
  }
}