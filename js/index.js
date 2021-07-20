const secondsContainer = document.getElementById("seconds");

const workButton = document.getElementById("work-button");
const shortBreakButton = document.getElementById("short-break-button");
const longBreakButton = document.getElementById("long-break-button");

const noStartedContainer = document.getElementById("no-started");
const inProgressContainer = document.getElementById("in-progress");
const completedContainer = document.getElementById("completed");

// let time = 1;
// setInterval(() => {
// 	secondsContainer.innerHTML = time;
// 	time++;
// }, 1000);

workButton.addEventListener("click", (e) => {
	workButton.style.borderBottom = "3px solid var(--white)";
	shortBreakButton.style.borderBottom = "3px solid transparent";
	longBreakButton.style.borderBottom = "3px solid transparent";
});

shortBreakButton.addEventListener("click", (e) => {
	workButton.style.borderBottom = "3px solid transparent";
	shortBreakButton.style.borderBottom = "3px solid var(--white)";
	longBreakButton.style.borderBottom = "3px solid transparent";
});

longBreakButton.addEventListener("click", (e) => {
	workButton.style.borderBottom = "3px solid transparent";
	shortBreakButton.style.borderBottom = "3px solid transparent";
	longBreakButton.style.borderBottom = "3px solid var(--white)";
});

let noStartedTasks = tasks.filter((t) => t.status === 1);
let inProgressTasks = tasks.filter((t) => t.status === 2);
let completedTasks = tasks.filter((t) => t.status === 3);

const fillTasks = (tasksList, tasksContainer) => {
	let tasksHTML = "";
	for (let i = 0; i < tasksList.length; i++) {
		tasksHTML += `<li><input type="checkbox" ${tasksList[i].status === 3 ? "checked" : ""} /> ${tasksList[i].description}</li>`;
	}
	tasksContainer.innerHTML = tasksHTML;
};

fillTasks(noStartedTasks, noStartedContainer);
fillTasks(inProgressTasks, inProgressContainer);
fillTasks(completedTasks, completedContainer);
