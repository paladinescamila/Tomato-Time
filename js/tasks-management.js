const currentTask = document.getElementById("current-task");
const tasksContainer = document.getElementById("tasks-container");
const addTaskButton = document.getElementById("add-task");
const newContainer = document.getElementById("new-container");
const cancelTaskButton = document.getElementById("cancel-task");
const saveTaskButton = document.getElementById("save-task");
const newTaskValue = document.getElementById("new-task");

let tasks = [];

const taskElement = (task) => {
	let element = document.createElement("li");
	element.id = task.id;
	element.innerHTML = `
		<div>
			<input id="done-${task.id}" type="checkbox" ${task.done ? "checked" : ""}>
			<input id="description-${task.id}"type="text" value="${task.description}">
		</div>
		<div>
			<img id="clock-${task.id}" src="img/clock.png">
			<img id="rename-${task.id}" src="img/rename.png">
			<img id="delete-${task.id}" src="img/delete.png">
		</div>
	`;

	return element;
};

const setTaskSettings = (i) => {
	// Set a task to work on it
	document.getElementById(`clock-${tasks[i].id}`).addEventListener("click", (e) => {
		let tasksLength = tasks.length;
		for (let j = 0; j < tasksLength; j++) tasks[j].current = false;
		tasks[i].current = true;
		currentTask.innerHTML = tasks[i].description;
	});

	// Check or uncheck a task
	let checkbox = document.getElementById(`done-${tasks[i].id}`);
	checkbox.addEventListener("change", (e) => {
		tasks[i].done = checkbox.checked;
	});

	// Rename a task
	document.getElementById(`rename-${tasks[i].id}`).addEventListener("click", (e) => {
		let element = document.getElementById(`description-${tasks[i].id}`);
		element.focus();
	});

	// Save the new name of the task
	document.getElementById(`description-${tasks[i].id}`).addEventListener("keyup", (e) => {
		if (e.keyCode === 13) {
			event.preventDefault();
			let element = document.getElementById(`description-${tasks[i].id}`);

			if (tasks[i].current) currentTask.innerHTML = element.value;

			tasks[i].description = element.value;
			document.getElementById(`description-${tasks[i].id}`).blur();
		}
	});

	// Delete a task
	document.getElementById(`delete-${tasks[i].id}`).addEventListener("click", (e) => {
		if (tasks[i].current) currentTask.innerHTML = "Time to focus!";
		document.getElementById(tasks[i].id).style.display = "none";
		tasks[i].deleted = true;
	});
};

addTaskButton.addEventListener("click", () => {
	addTaskButton.style.display = "none";
	newContainer.style.display = "grid";
	newTaskValue.focus();
	saveTaskButton.style.opacity = 0.7;
	saveTaskButton.disabled = true;
});

cancelTaskButton.addEventListener("click", () => {
	addTaskButton.style.display = "block";
	newContainer.style.display = "none";
	newTaskValue.value = "";
});

saveTaskButton.addEventListener("click", () => {
	let task = {
		id: new Date().getTime(),
		description: newTaskValue.value.slice(0, 50),
		done: false,
		current: false,
		deleted: false,
	};

	tasks.push(task);
	tasksContainer.appendChild(taskElement(task));
	setTaskSettings(tasks.length - 1);

	addTaskButton.style.display = "block";
	newContainer.style.display = "none";
	newTaskValue.value = "";
});

newTaskValue.addEventListener("keyup", (e) => {
	if (e.keyCode === 13) {
		event.preventDefault();
		if (newTaskValue.value !== "") saveTaskButton.click();
	}

	if (newTaskValue.value !== "") {
		saveTaskButton.style.opacity = 1;
		saveTaskButton.disabled = false;
	} else {
		saveTaskButton.style.opacity = 0.7;
		saveTaskButton.disabled = true;
	}
});
