// Elements
const currentTask = document.getElementById("current-task");
const tasksContainer = document.getElementById("tasks-container");
const addTaskButton = document.getElementById("add-task");
const newContainer = document.getElementById("new-container");
const cancelTaskButton = document.getElementById("cancel-task");
const saveTaskButton = document.getElementById("save-task");
const newTaskValue = document.getElementById("new-task");

// Start settings
let tasks = [];

// Create a task element (li)
const taskElement = (task) => {
	let element = document.createElement("li");
	element.id = task.id;
	element.innerHTML = `
		<div>
			<input id="done-${task.id}" type="checkbox" ${task.done ? "checked" : ""}>
			<label for="done-${task.id}">
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

// Set event listeners to the task in the index i
const setTaskSettings = (i) => {
	let taskContainer = document.getElementById(tasks[i].id),
		taskCheckbox = document.getElementById(`done-${tasks[i].id}`),
		taskDescription = document.getElementById(`description-${tasks[i].id}`),
		taskClock = document.getElementById(`clock-${tasks[i].id}`),
		taskRename = document.getElementById(`rename-${tasks[i].id}`),
		taskDelete = document.getElementById(`delete-${tasks[i].id}`);

	// Check or uncheck a task
	taskCheckbox.addEventListener("change", (e) => {
		tasks[i].done = taskCheckbox.checked;
	});

	// Set a task to work on it
	taskClock.addEventListener("click", (e) => {
		let tasksLength = tasks.length;
		for (let j = 0; j < tasksLength; j++) tasks[j].current = false;
		tasks[i].current = true;
		currentTask.innerHTML = tasks[i].description;
	});

	// Rename a task
	taskRename.addEventListener("click", (e) => {
		let length = taskDescription.value.length;
		taskDescription.focus();
		taskDescription.setSelectionRange(length, length);
	});

	// Save the new name of the task
	taskDescription.addEventListener("keyup", (e) => {
		if (tasks[i].current) currentTask.innerHTML = taskDescription.value;
		tasks[i].description = taskDescription.value;
	});

	// Delete a task
	taskDelete.addEventListener("click", (e) => {
		if (tasks[i].current) currentTask.innerHTML = "Time to focus!";
		taskContainer.style.display = "none";
		tasks[i].deleted = true;
	});
};

// Displays the input to add a task
addTaskButton.addEventListener("click", () => {
	addTaskButton.style.display = "none";
	newContainer.style.display = "grid";
	newTaskValue.focus();
	saveTaskButton.style.opacity = 0.7;
	saveTaskButton.disabled = true;
});

// Close the input to add a task
cancelTaskButton.addEventListener("click", () => {
	addTaskButton.style.display = "block";
	newContainer.style.display = "none";
	newTaskValue.value = "";
});

// Save changes of the new task
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

// Save changes of the new task if press ENTER
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
