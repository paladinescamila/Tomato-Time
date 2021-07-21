const timerContainer = document.getElementById("timer");
const clockSection = document.getElementById("clock-section");
const currentTask = document.getElementById("current-task");

const workButton = document.getElementById("work-button");
const shortBreakButton = document.getElementById("short-break-button");
const longBreakButton = document.getElementById("long-break-button");
const goButton = document.getElementById("go-button");

const tasksContainer = document.getElementById("tasks-container");
const addTaskButton = document.getElementById("add-task");
const newContainer = document.getElementById("new-container");
const cancelTaskButton = document.getElementById("cancel-task");
const saveTaskButton = document.getElementById("save-task");
const newTaskValue = document.getElementById("new-task");

const format = (n) => (n < 10 ? "0" + n : n);

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

let timeType = 1;
timerContainer.innerHTML = `${format(workTime)}:00`;

const run = (time) => {
	let minutes = time - 1,
		seconds = 59;

	let interval = setInterval(() => {
		timerContainer.innerHTML = `${format(minutes)}:${format(seconds)}`;
		seconds--;

		if (seconds === -1) {
			seconds = 59;
			minutes--;
		}

		if (minutes === -1) {
			clearInterval(interval);
		}
	}, 1000);
};

const drawScreen = (type, color, time) => {
	workButton.style.borderBottom = type === 1 ? "3px solid var(--white)" : "3px solid transparent";
	shortBreakButton.style.borderBottom = type === 2 ? "3px solid var(--white)" : "3px solid transparent";
	longBreakButton.style.borderBottom = type === 3 ? "3px solid var(--white)" : "3px solid transparent";
	clockSection.style.backgroundColor = color;
	goButton.style.color = color;
	timerContainer.innerHTML = `${format(time)}:00`;
};

workButton.addEventListener("click", (e) => {
	drawScreen(1, workColor, workTime);
	timeType = 1;
});

shortBreakButton.addEventListener("click", (e) => {
	drawScreen(2, shortBreakColor, shortBreakTime);
	timeType = 2;
});

longBreakButton.addEventListener("click", (e) => {
	drawScreen(3, longBreakColor, longBreakTime);
	timeType = 3;
});

goButton.addEventListener("click", async (e) => {
	switch (timeType) {
		case 1:
			let algo = run(workTime);
			if (autoStartBreaks) {
				console.log("AUTOSTART");
				// drawScreen(2, shortBreakColor, shortBreakTime);
				// run(shortBreakButton);
				// drawScreen(3, longBreakColor, longBreakTime);
				// run(longBreakButton);
			}
			break;
		case 2:
			run(shortBreakTime);
			break;
		case 3:
			run(longBreakTime);
			break;
		default:
			break;
	}
});

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
