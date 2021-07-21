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
				<input type="text" value="${task.description}">
			</div>
			<div>
				<img id="rename-button" src="img/rename.png">
				<img id="delete-button" src="img/delete.png">
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

workButton.addEventListener("click", (e) => {
	workButton.style.borderBottom = "3px solid var(--white)";
	shortBreakButton.style.borderBottom = "3px solid transparent";
	longBreakButton.style.borderBottom = "3px solid transparent";
	clockSection.style.backgroundColor = workColor;
	goButton.style.color = workColor;
	timeType = 1;
	timerContainer.innerHTML = `${format(workTime)}:00`;
});

shortBreakButton.addEventListener("click", (e) => {
	workButton.style.borderBottom = "3px solid transparent";
	shortBreakButton.style.borderBottom = "3px solid var(--white)";
	longBreakButton.style.borderBottom = "3px solid transparent";
	clockSection.style.backgroundColor = shortBreakColor;
	goButton.style.color = shortBreakColor;
	timeType = 2;
	timerContainer.innerHTML = `${format(shortBreakTime)}:00`;
});

longBreakButton.addEventListener("click", (e) => {
	workButton.style.borderBottom = "3px solid transparent";
	shortBreakButton.style.borderBottom = "3px solid transparent";
	longBreakButton.style.borderBottom = "3px solid var(--white)";
	clockSection.style.backgroundColor = longBreakColor;
	goButton.style.color = longBreakColor;
	timeType = 3;
	timerContainer.innerHTML = `${format(longBreakTime)}:00`;
});

goButton.addEventListener("click", (e) => {
	switch (timeType) {
		case 1:
			run(workTime);
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
		document.getElementById("rename-button").addEventListener("click", (e) => {
			newTaskValue.style.pointerEvents = "auto";
		});
	}
};

fillTasks();
