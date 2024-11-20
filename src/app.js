import Project from "./project";
import Task from "./task";

export default (function () {
    let projects = null;
    if (localStorage.getItem("projects")) {
        loadProjects();
    } else {
        projects = [new Project("My First Project")];
        localStorage.setItem("projects", JSON.stringify(projects));
    }

    function loadProjects() {
        projects = [];
        const data = JSON.parse(localStorage.getItem("projects"));
        data.forEach((project) => {
            const realProject = new Project(project.title);
            realProject.tasks = project.tasks;
            projects.push(realProject);
        });
    }

    function addProject(project) {
        projects.push(project);
        localStorage.setItem("projects", JSON.stringify(projects));
    }

    function removeProject(project) {
        projects.splice(projects.indexOf(project), 1);
        localStorage.setItem("projects", JSON.stringify(projects));
    }

    function addTask(project, task) {
        project.addTask(task);
        localStorage.setItem("projects", JSON.stringify(projects));
    }

    function removeTask(project, task) {
        projects[i].removeTask(task);
        localStorage.setItem("projects", JSON.stringify(projects));
    }

    function getProjects() {
        return projects;
    }

    return { addProject, removeProject, addTask, removeTask, getProjects };
})();
