const timerContainer = document.getElementById("timer");
const workButton = document.getElementById("work-button");
const shortBreakButton = document.getElementById("short-break-button");
const longBreakButton = document.getElementById("long-break-button");
const goButton = document.getElementById("go-button");

const format = (n) => (n < 10 ? "0" + n : n);
timerContainer.innerHTML = `${format(workTime)}:00`;

let timeType = 1,
	numberOfPomodoros = 1,
	stopped = false,
	interval,
	minutes = workTime - 1,
	seconds = 59;

const run = (next) => {
	interval = setInterval(() => {
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
	let times = [workTime, shortBreakTime, longBreakTime];
	let colors = [workColor, shortBreakColor, longBreakColor];
	
	timeType = type;
	minutes = times[type - 1] - 1;
	seconds = 59;
	stopped = true;
	
	workButton.style.borderBottom = type === 1 ? "3px solid var(--white)" : "3px solid transparent";
	shortBreakButton.style.borderBottom = type === 2 ? "3px solid var(--white)" : "3px solid transparent";
	longBreakButton.style.borderBottom = type === 3 ? "3px solid var(--white)" : "3px solid transparent";	
	
	document.querySelector(":root").style.setProperty("--theme-color", colors[type - 1]);
	timerContainer.innerHTML = `${format(times[type - 1])}:00`;
	goButton.click();
};

workButton.addEventListener("click", (e) => {
	drawScreen(1);
});

shortBreakButton.addEventListener("click", (e) => {
	drawScreen(2);
});

longBreakButton.addEventListener("click", (e) => {
	drawScreen(3);
});

goButton.addEventListener("click", (e) => {
	if (stopped) {
		goButton.innerHTML = "Go";
		clearInterval(interval);
	} else {
		goButton.innerHTML = "Stop";
		switch (timeType) {
			// Work Time
			case 1:
				if (minutes === -1) {
					minutes = workTime - 1;
					seconds = 59;
				}

				if (autoStartBreaks) {
					run(2);
				} else {
					run(0);
				}
				break;

			// Short Break Time
			case 2:
				if (minutes === -1) {
					minutes = shortBreakTime - 1;
					seconds = 59;
				}

				if (autoStartWork) {
					if (numberOfPomodoros < longBreakInterval) {
						numberOfPomodoros++;
						run(1);
					} else {
						numberOfPomodoros = 1;
						run(3);
					}
				} else {
					run(0);
				}
				break;

			// Long Break Time
			case 3:
				if (minutes === -1) {
					minutes = longBreakTime - 1;
					seconds = 59;
				}

				if (autoStartWork) {
					run(1);
				} else {
					run(0);
				}
				break;
		}
	}
	stopped = !stopped;
});
