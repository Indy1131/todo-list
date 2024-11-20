import "./styles.css";
import Task from "./task";
import Project from "./project";
import app from "./app";

const projectButton = document.querySelector("#projectButton");
const projectDialog = document.querySelector("#projectDialog")
const projectContainer = document.querySelector("#projectContainer")

const taskContainer = document.querySelector("#taskContainer");
const taskForm = taskContainer.querySelector("form");

const projectButtons = new Map();
let currentProject = null;

function addProjectButton(project) {
    const button = document.createElement("button");
    button.textContent = project.title;
    button.classList.add("project");
    button.addEventListener("click", (e) => {
        setProject(project);
    });

    projectContainer.appendChild(button);
    projectButtons.set(project, button);

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "X";
    deleteButton.addEventListener("click", (e) => {
        e.stopPropagation();
        app.removeProject(project);
        if (project == currentProject) {
            setProject(app.getProjects()[0]);
        }

        projectButtons.delete(button);
        button.remove();
    });

    button.appendChild(deleteButton);
}

function displayProjects() {
    app.getProjects().forEach(project => {
        addProjectButton(project);
    });
}


function addTask(task) {
    taskContainer.querySelector("#emptyTasks").style.display = "none";

    const div = document.createElement("div");
    div.classList.add("task");
    div.style.backgroundColor = task.priority;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "X";
    deleteButton.addEventListener("click", (e) => {
        app.removeTask(currentProject, task);
        div.remove();

        if (currentProject.tasks.length == 0) {
            taskContainer.querySelector("#emptyTasks").style.display = "block";
        }
    })

    div.appendChild(deleteButton);

    const h1 = document.createElement("h1");
    h1.textContent = task.title;
    div.appendChild(h1);

    const date = document.createElement("h6");
    date.textContent = task.dueDate;
    div.appendChild(date);

    const desc = document.createElement("p");
    desc.textContent = task.description;
    div.appendChild(desc);

    taskContainer.appendChild(div);
}

function displayTasks(project) {
    resetForm(taskForm);
    taskContainer.querySelector("h1").textContent = project.title;

    for (const task of taskContainer.querySelectorAll(".task")) {
        task.remove();
    }

    const tasks = project.tasks;
    if (tasks.length == 0) {
        taskContainer.querySelector("#emptyTasks").style.display = "block";
        return;
    }
    taskContainer.querySelector("#emptyTasks").style.display = "none";

    tasks.forEach(task => {
        addTask(task);
    });
}

function setProject(project) {
    if (!project) {
        projectContainer.querySelector("h1").style.display = "block";
        taskContainer.style.display = "none";
        return;
    } else if (project == currentProject) {
        return;
    } else if (currentProject) {
        projectButtons.get(currentProject).classList.remove("current-project");
    }
    taskContainer.style.display = "block";

    projectContainer.querySelector("h1").style.display = "none";


    currentProject = project;
    projectButtons.get(project).classList.add("current-project");
    displayTasks(project);
}

function validateForm(form) {
    for (const group of form.querySelectorAll(".field-group")) {
        const error = group.querySelector(".error");

        for (const input of group.querySelectorAll("input")) {
            if (!input.valid) {
                if (input.validity.valueMissing) {
                    error.textContent = "Field is required.";
                } else if (input.validity.tooShort) {
                    error.textContent = "Input is too short.";
                } else {
                    error.textContent = "";
                }
            }
        }
    }
}

function resetForm(form) {
    form.reset();
    for (const fieldGroup of form.querySelectorAll(".field-group")) {
        fieldGroup.querySelector(".error").textContent = "";
    }
}

projectButton.addEventListener("click", (e) => {
    resetForm(projectDialog.querySelector("form"));
    projectDialog.show();
});

document.querySelector("#projectClose").addEventListener("click", (e) => {
    projectDialog.close();
});

projectDialog.addEventListener("submit", (e) => {
    e.preventDefault();

    const form = projectDialog.querySelector("form");

    if (!form.checkValidity()) {
        validateForm(form);
        return;
    }

    const project = new Project(form.querySelector("input").value);
    app.addProject(project);
    addProjectButton(project);

    setProject(project);

    projectDialog.close();
    resetForm(form);
});

taskForm.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!taskForm.checkValidity()) {
        validateForm(taskForm);
        return;
    }

    const formData = new FormData(taskForm);
    const task = new Task(formData.get("taskTitle"), formData.get("taskDesc"), formData.get("taskDate"), formData.get("taskPriority"));
    app.addTask(currentProject, task);
    addTask(task);

    resetForm(taskForm);
});

displayProjects();
setProject(app.getProjects()[0]);

