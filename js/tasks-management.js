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
				<input id="c${task.id}" type="checkbox" ${task.done ? "checked" : ""}>
				<input id="t${task.id}"type="text" value="${task.description}">
			</div>
			<div>
				<img id="r${task.id}" src="img/rename.png">
				<img id="d${task.id}" src="img/delete.png">
			</div>
		</li>
	`;
};

const setTaskSettings = (task) => {
	// Set a task to work on it
	document.getElementById(task.id).addEventListener("click", (e) => {
		currentTask.innerHTML = task.description;
	});

	// Check or uncheck a task
	let checkbox = document.getElementById(`c${task.id}`);
	checkbox.addEventListener("change", (e) => {
		task.done = checkbox.checked;
		console.log(checkbox.checked);
	});

	// Save the new name of the task
	document.getElementById(`t${task.id}`).addEventListener("keyup", (e) => {
		if (e.keyCode === 13) {
			event.preventDefault();
			console.log("CAMBIÓ EL NOMBRE DE LA TAREA");
		}
	});
	// Rename a task
	document.getElementById(`r${task.id}`).addEventListener("click", (e) => {
		let element = document.getElementById(`t${task.id}`);
		element.style.pointerEvents = "auto";
		element.style.backgroundColor = "#eee";
	});

	// Delete a task
	document.getElementById(`d${task.id}`).addEventListener("click", (e) => {
		// TODO: Falta hacer que también quite el nombre de la tarea actual si está seleccionada por una que le siga, porque en el contador se va a seguir mostrando esa tarea.
		document.getElementById(task.id).style.display = "none";
		task.deleted = true;
		console.log(task);
	});
};

addTaskButton.addEventListener("click", () => {
	if (tasks.length <= 50){
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
	setTaskSettings(task);

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
