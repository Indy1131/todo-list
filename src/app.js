import Project from "./project";
import Task from "./task";

export default (function () {
    const projects = [new Project("My First Project")];

    function addProject(project) {
        projects.push(project);
    }

    function removeProject(project) {
        projects.splice(projects.indexOf(project), 1);
    }

    function addTask(i, task) {
        projects[i].push(task);
    }

    function removeTask(i, j) {
        projects[i].splice(j, 1);
    }

    function getProjects() {
        return projects;
    }

    return { addProject, removeProject, addTask, removeTask, getProjects };
})();
