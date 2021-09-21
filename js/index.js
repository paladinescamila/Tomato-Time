const timerContainer = document.getElementById("timer");

const workButton = document.getElementById("work-button");
const shortBreakButton = document.getElementById("short-break-button");
const longBreakButton = document.getElementById("long-break-button");
const goButton = document.getElementById("go-button");

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
			timerContainer.innerHTML = `${format(time)}:00`;
			clearInterval(interval);
		}
	}, 1000);
};

const drawScreen = (type, color, time) => {
	workButton.style.borderBottom = type === 1 ? "3px solid var(--white)" : "3px solid transparent";
	shortBreakButton.style.borderBottom = type === 2 ? "3px solid var(--white)" : "3px solid transparent";
	longBreakButton.style.borderBottom = type === 3 ? "3px solid var(--white)" : "3px solid transparent";
	document.querySelector(":root").style.setProperty("--theme-color", color);
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
			run(workTime);
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
