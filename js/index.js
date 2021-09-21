const timerContainer = document.getElementById("timer");

const workButton = document.getElementById("work-button");
const shortBreakButton = document.getElementById("short-break-button");
const longBreakButton = document.getElementById("long-break-button");
const goButton = document.getElementById("go-button");

const format = (n) => (n < 10 ? "0" + n : n);

let timeType = 1,
	numberOfPomodoros = 1;
timerContainer.innerHTML = `${format(workTime)}:00`;

const run = (time, next) => {
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

			if (next != 0) {
				timeType = next;
				drawScreen(timeType);
				goButton.click();
			}
		}
	}, 1000);
};

const drawScreen = (type) => {
	workButton.style.borderBottom = type === 1 ? "3px solid var(--white)" : "3px solid transparent";
	shortBreakButton.style.borderBottom = type === 2 ? "3px solid var(--white)" : "3px solid transparent";
	longBreakButton.style.borderBottom = type === 3 ? "3px solid var(--white)" : "3px solid transparent";

	let colors = [workColor, shortBreakColor, longBreakColor];
	let times = [workTime, shortBreakTime, longBreakTime];

	document.querySelector(":root").style.setProperty("--theme-color", colors[type - 1]);
	timerContainer.innerHTML = `${format(times[type - 1])}:00`;
};

workButton.addEventListener("click", (e) => {
	drawScreen(1);
	timeType = 1;
});

shortBreakButton.addEventListener("click", (e) => {
	drawScreen(2);
	timeType = 2;
});

longBreakButton.addEventListener("click", (e) => {
	drawScreen(3);
	timeType = 3;
});

goButton.addEventListener("click", (e) => {
	switch (timeType) {
		// Work Time
		case 1:
			if (autoStartBreaks) {
				run(workTime, 2);
			} else {
				run(workTime, 0);
			}
			break;

		// Short Break Time
		case 2:
			if (autoStartWork) {
				if (numberOfPomodoros < longBreakInterval) {
					numberOfPomodoros++;
					run(shortBreakTime, 1);
				} else {
					numberOfPomodoros = 1;
					run(shortBreakTime, 3);
				}
			} else {
				run(shortBreakTime, 0);
			}
			break;

		// Long Break Time
		case 3:
			if (autoStartWork) {
				run(longBreakTime, 1);
			} else {
				run(longBreakTime, 0);
			}
			break;
	}
});
