// Elements
const tasksContainer = document.getElementById("tasks-container");
const addTaskButton = document.getElementById("add-task");
const newContainer = document.getElementById("new-container");
const cancelTaskButton = document.getElementById("cancel-task");
const saveTaskButton = document.getElementById("save-task");
const newTaskValue = document.getElementById("new-task");
const moreOptionsButton = document.getElementById("more-options-button");
const moreOptionsContainer = document.getElementById("more-options");
const showHideDone = document.getElementById("show-hide-done");
const deleteDone = document.getElementById("delete-done");
const deleteUndone = document.getElementById("delete-undone");
const deleteAll = document.getElementById("delete-all");

// Start settings
setLS("tasks", [], false);
let hidden = false;

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
	let taskID = getLS("tasks")[i].id,
		taskContainer = document.getElementById(taskID),
		taskCheckbox = document.getElementById(`done-${taskID}`),
		taskDescription = document.getElementById(`description-${taskID}`),
		taskRename = document.getElementById(`rename-${taskID}`),
		taskDelete = document.getElementById(`delete-${taskID}`),
		taskNewDescription = document.getElementById(`new-description-${taskID}`),
		taskCancel = document.getElementById(`cancel-${taskID}`),
		taskSave = document.getElementById(`save-${taskID}`);

	// Change styles when "rename task" container is going to be closed
	const changeStyles = () => {
		taskDescription.style.display = "block";
		taskNewDescription.style.display = "none";
		taskContainer.style.display = "flex";
		taskRename.style.display = "block";
		taskDelete.style.display = "block";
		taskCancel.style.display = "none";
		taskSave.style.display = "none";
		taskSave.style.opacity = 1;
		taskSave.disabled = false;
	};

	// Check or uncheck a task
	taskCheckbox.addEventListener("change", (e) => {
		let tasks = getLS("tasks");
		tasks[i].done = taskCheckbox.checked;
		setLS("tasks", tasks);
	});

	// Rename a task
	taskRename.addEventListener("click", (e) => {
		let length = taskDescription.value.length;
		taskDescription.style.display = "none";
		taskNewDescription.style.display = "block";
		taskNewDescription.setSelectionRange(length, length);
		taskNewDescription.focus();
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
		let tasks = getLS("tasks");
		tasks[i].description = taskNewDescription.value;
		setLS("tasks", tasks);
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
		let tasks = getLS("tasks");
		tasks[i].deleted = true;
		setLS("tasks", tasks);
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

	let tasks = getLS("tasks");
	tasks.push(task);
	setLS("tasks", tasks);
	tasksContainer.appendChild(taskElement(task));
	setTaskSettings(tasks.length - 1);

	document.getElementById(`rename-${task.id}`).click();
	document.getElementById(`save-${task.id}`).click();

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

// Paint tasks
let tasks = getLS("tasks").filter((t) => !t.deleted);
setLS("tasks", tasks);
for (let i = 0; i < tasks.length; i++) {
	tasksContainer.appendChild(taskElement(tasks[i]));
	setTaskSettings(i);

	document.getElementById(`rename-${tasks[i].id}`).click();
	document.getElementById(`save-${tasks[i].id}`).click();
}

// Open more options window
moreOptionsButton.addEventListener("click", (e) => {
	moreOptionsContainer.style.display = "flex";
});

// Close more options window (clicking outside the box)
document.body.addEventListener("click", (e) => {
	if (!moreOptionsContainer.contains(e.target) && !moreOptionsButton.contains(e.target)) {
		moreOptionsContainer.style.display = "none";
	}
});

// Show or hide done tasks
showHideDone.addEventListener("click", (e) => {
	let changed = 0;

	getLS("tasks").forEach((task) => {
		if (!task.deleted && task.done) {
			document.getElementById(task.id).style.display = hidden ? "flex" : "none";
			changed++;
		}
	});

	moreOptionsContainer.style.display = "none";

	if (changed > 0) {
		if (hidden) showHideDone.innerHTML = `<img src="img/hide.png" alt="Hide done" /> Hide done tasks`;
		else showHideDone.innerHTML = `<img src="img/show.png" alt="Show done" /> Show done tasks`;
		hidden = !hidden;
	}
});

// Delete done tasks
deleteDone.addEventListener("click", (e) => {
	let tasks = getLS("tasks").filter((t) => !t.deleted);
	tasks.forEach((task) => {
		if (task.done) document.getElementById(`delete-${task.id}`).click();
	});
	moreOptionsContainer.style.display = "none";
});

// Delete undone tasks
deleteUndone.addEventListener("click", (e) => {
	let tasks = getLS("tasks").filter((t) => !t.deleted);
	tasks.forEach((task) => {
		if (!task.done) document.getElementById(`delete-${task.id}`).click();
	});
	moreOptionsContainer.style.display = "none";
});

// Delete all tasks
deleteAll.addEventListener("click", (e) => {
	let tasks = getLS("tasks").filter((t) => !t.deleted);
	tasks.forEach((task) => document.getElementById(`delete-${task.id}`).click());
	moreOptionsContainer.style.display = "none";
});
