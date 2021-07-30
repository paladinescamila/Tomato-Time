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

const fillTasks = () => {
	let tasksHTML = "";

	for (let i = 0; i < tasks.length; i++) {
		tasksHTML += taskTemplate(tasks[i]);
	}

	tasksContainer.innerHTML = tasksHTML;

	for (let i = 0; i < tasks.length; i++) {
		document.getElementById(tasks[i].id).addEventListener("click", (e) => {
			currentTask.innerHTML = tasks[i].description;
		});

		let checkbox = document.getElementById(`c${tasks[i].id}`);
		checkbox.addEventListener("change", (e) => {
			tasks[i].done = checkbox.checked;
		});

		document.getElementById(`t${tasks[i].id}`).addEventListener("keyup", (e) => {
			if (e.keyCode === 13) {
				event.preventDefault();
				console.log("CAMBIÓ EL NOMBRE DE LA TAREA");
			}
		});

		document.getElementById(`r${tasks[i].id}`).addEventListener("click", (e) => {
			let element = document.getElementById(`t${tasks[i].id}`);
			element.style.pointerEvents = "auto";
			element.style.backgroundColor = "#eee";
		});

		document.getElementById(`d${tasks[i].id}`).addEventListener("click", (e) => {
			// TODO: Falta hacer que también quite el nombre de la tarea actual si está seleccionada por una que le siga, porque en el contador se va a seguir mostrando esa tarea.
			document.getElementById(tasks[i].id).style.display = "none";
			tasks.splice(i);
			// ! ERROR: Hay un problema cuando no encuentra el elemento tasls[i] en los demás addEventListener.
		});
	}
};

fillTasks();

addTaskButton.addEventListener("click", () => {
	addTaskButton.style.display = "none";
	newContainer.style.display = "grid";
});

cancelTaskButton.addEventListener("click", () => {
	addTaskButton.style.display = "block";
	newContainer.style.display = "none";
	newTaskValue.value = "";
});

saveTaskButton.addEventListener("click", () => {
	const currentDate = new Date();

	task = {
		id: currentDate.getTime(),
		description: newTaskValue.value,
		done: false,
		pomodoros: 0,
	};

	tasks.push(task);
	tasksContainer.innerHTML += taskTemplate(task);

	addTaskButton.style.display = "block";
	newContainer.style.display = "none";
	newTaskValue.value = "";
});

newTaskValue.addEventListener("keyup", (e) => {
	if (e.keyCode === 13) {
		event.preventDefault();
		saveTaskButton.click();
	}
});
