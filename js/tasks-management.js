// Elements
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
			<label for="done-${task.id}"></label>
			<input id="description-${task.id}" type="text" value="${task.description}">
			<input id="new-description-${task.id}" type="text" value="${task.description}">
		</div>
		<div>
			<img id="rename-${task.id}" src="img/rename.png">
			<img id="delete-${task.id}" src="img/delete.png">
		</div>
		<button id="cancel-${task.id}">Cancel</button>
		<button id="save-${task.id}">Save</button>
	`;

	return element;
};

// Set event listeners to the task in the index i
const setTaskSettings = (i) => {
	let taskContainer = document.getElementById(tasks[i].id),
		taskCheckbox = document.getElementById(`done-${tasks[i].id}`),
		taskDescription = document.getElementById(`description-${tasks[i].id}`),
		taskRename = document.getElementById(`rename-${tasks[i].id}`),
		taskDelete = document.getElementById(`delete-${tasks[i].id}`),
		taskNewDescription = document.getElementById(`new-description-${tasks[i].id}`),
		taskCancel = document.getElementById(`cancel-${tasks[i].id}`),
		taskSave = document.getElementById(`save-${tasks[i].id}`);

	const changeStyles = () => {
		taskDescription.style.display = "block";
		taskNewDescription.style.display = "none";
		taskContainer.style.display = "flex";
		taskRename.style.display = "block";
		taskDelete.style.display = "block";
		taskCancel.style.display = "none";
		taskSave.style.display = "none";
	};

	// Check or uncheck a task
	taskCheckbox.addEventListener("change", (e) => {
		tasks[i].done = taskCheckbox.checked;
	});

	// Rename a task
	taskRename.addEventListener("click", (e) => {
		let length = taskDescription.value.length;
		taskDescription.style.display = "none";
		taskNewDescription.style.display = "block";
		taskNewDescription.focus();
		taskNewDescription.setSelectionRange(length, length);
		taskNewDescription.style.pointerEvents = "auto";

		taskContainer.style.display = "grid";
		taskContainer.classList.add("grid-edit");
		taskRename.style.display = "none";
		taskDelete.style.display = "none";
		taskCancel.style.display = "block";
		taskSave.style.display = "block";
	});

	// Save the new name of the task (Save button)
	taskSave.addEventListener("click", (e) => {
		tasks[i].description = taskNewDescription.value;
		taskDescription.value = taskNewDescription.value;
		changeStyles();
	});

	// Save the new name of the task (Enter)
	taskNewDescription.addEventListener("keyup", (e) => {
		if (e.keyCode === 13) {
			event.preventDefault();
			if (taskNewDescription.value !== "") taskSave.click();
		}

		if (taskNewDescription.value !== "") {
			taskSave.style.opacity = 1;
			taskSave.disabled = false;
		} else {
			taskSave.style.opacity = 0.7;
			taskSave.disabled = true;
		}
	});

	// Cancel rename task
	taskCancel.addEventListener("click", (e) => {
		taskNewDescription.value = taskDescription.value;
		changeStyles();
	});

	// Delete a task
	taskDelete.addEventListener("click", (e) => {
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
