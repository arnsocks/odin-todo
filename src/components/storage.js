// TEMPORARY STORAGE ARRAY - to be replaced with LocalStorage
// let taskList = [];
// let projectList = [];

// Initialize localStorage arrays if needed
if (!localStorage.taskList) localStorage.setItem("taskList", JSON.stringify([]));
if (!localStorage.projectList) localStorage.setItem("taskList", JSON.stringify([]));

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
  },

  deleteAll() {
    localStorage.setItem("taskList", "[]");
    localStorage.setItem("projectList", "[]");
  }
}



