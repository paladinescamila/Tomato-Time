const currentTask = document.getElementById("current-task");
const tasksContainer = document.getElementById("tasks-container");
const addTaskButton = document.getElementById("add-task");
const newContainer = document.getElementById("new-container");
const cancelTaskButton = document.getElementById("cancel-task");
const saveTaskButton = document.getElementById("save-task");
const newTaskValue = document.getElementById("new-task");

let tasks = [];

const taskTemplate = (task) => {
	return `
		<li id="${task.id}">
			<div>
				<input id="done-${task.id}" type="checkbox" ${task.done ? "checked" : ""}>
				<input id="description-${task.id}"type="text" value="${task.description}">
			</div>
			<div>
				<img id="clock-${task.id}" src="img/clock.png">
				<img id="rename-${task.id}" src="img/rename.png">
				<img id="delete-${task.id}" src="img/delete.png">
			</div>
		</li>
	`;
};

const setTaskSettings = () => {
	let tasksLength = tasks.length;

	for (let i = 0; i < tasksLength; i++) {
		// Set a task to work on it
		document.getElementById(`clock-${tasks[i].id}`).addEventListener("click", (e) => {
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

				let element = document.getElementById(`description-${tasks[i].id}`),
					oldInput = `<input id="description-${tasks[i].id}" type="text" value="${tasks[i].description}">`,
					newInput = `<input id="description-${tasks[i].id}" type="text" value="${element.value}">`;

				tasks[i].description = element.value;
				tasksContainer.innerHTML = tasksContainer.innerHTML.replace(oldInput, newInput);
				document.getElementById(`description-${tasks[i].id}`).blur();
			}
		});

		// Delete a task
		document.getElementById(`delete-${tasks[i].id}`).addEventListener("click", (e) => {
			document.getElementById(tasks[i].id).style.display = "none";
			tasks[i].deleted = true;
			if (tasks[i].description === currentTask.innerHTML) {
				currentTask.innerHTML = "Time to focus!";
			}
		});
	}
};

addTaskButton.addEventListener("click", () => {
	if (tasks.length <= 50) {
		addTaskButton.style.display = "none";
		newContainer.style.display = "grid";
		newTaskValue.focus();
		// saveTaskButton.style.opacity = 0.5;
		// ! FALTA HACER QUE NO LE PERMITA PRESIONAR EL BOTÓN
	}
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
		deleted: false,
	};

	tasks.push(task);
	tasksContainer.innerHTML += taskTemplate(task);
	setTaskSettings();

	addTaskButton.style.display = "block";
	newContainer.style.display = "none";
	newTaskValue.value = "";
	// ! LOS EVENTOS DE UNA TAREA NO FUNCIONAN A MENOS DE QUE LA HAYA CREADO DE ÚLTIMA :'(
});

newTaskValue.addEventListener("keyup", (e) => {
	if (e.keyCode === 13) {
		event.preventDefault();
		saveTaskButton.click();
	}
});
