export default class {
    constructor(title) {
        this.title = title;
        this.tasks = [];
    }

    addTask(task) {
        this.tasks.push(task);
    }

    removeTask(task) {
        return this.tasks.splice(this.tasks.indexOf(task), 1);
    }
}