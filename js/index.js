const timerContainer = document.getElementById("timer");
const clockSection = document.getElementById("clock-section");
const currentTask = document.getElementById("current-task");

const workButton = document.getElementById("work-button");
const shortBreakButton = document.getElementById("short-break-button");
const longBreakButton = document.getElementById("long-break-button");
const goButton = document.getElementById("go-button");

const noStartedContainer = document.getElementById("no-started");
const inProgressContainer = document.getElementById("in-progress");
const completedContainer = document.getElementById("completed");

const format = (n) => (n < 10 ? "0" + n : n);

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

const fillTasks = (status, container) => {
	let tasksList = tasks.filter((t) => t.status === status),
		tasksHTML = "";

	for (let i = 0; i < tasksList.length; i++) {
		tasksHTML += `<li id="t-${status}-${i}"><input id="c-${status}-${i}" type="checkbox" ${status === 3 ? "checked" : ""} /> ${tasksList[i].description}</li>`;
	}

	container.innerHTML = tasksHTML;

	for (let i = 0; i < tasksList.length; i++) {
		let t = document.getElementById(`t-${status}-${i}`),
			c = document.getElementById(`c-${status}-${i}`);
		t.addEventListener("click", (e) => {
			currentTask.innerHTML = tasksList[i].description;
		});
		c.addEventListener("change", (e) => {
			if (c.checked) {
				console.log("ERA UNA TAREA NO COMPLETADA");
			} else {
				console.log("ERA UNA TAREA COMPLETA");
			}
		});
	}
};

fillTasks(1, noStartedContainer);
fillTasks(2, inProgressContainer);
fillTasks(3, completedContainer);
