// Elements
const workButton = document.getElementById("work-button");
const shortBreakButton = document.getElementById("short-break-button");
const longBreakButton = document.getElementById("long-break-button");
const timerContainer = document.getElementById("timer");
const progressBar = document.getElementById("progress");
const goButton = document.getElementById("go-button");

// Start settings
const format = (n) => (n < 10 ? "0" + n : n);
timerContainer.innerHTML = `${format(workTime)}:00`;

let timeNames = ["Work", "Short Break", "Long Break"],
	timeType = 1,
	numberOfPomodoros = 1,
	stopped = false,
	interval,
	minutes = workTime - 1,
	seconds = 59;

// Countdown
const run = (next) => {
	let time = minutes + 1;
	totalSeconds = time * (seconds + 1) - 1;

	interval = setInterval(() => {
		timerContainer.innerHTML = `${format(minutes)}:${format(seconds)}`;
		document.title = `${timeNames[timeType - 1]} (${timerContainer.innerHTML})`;
		progressBar.style.width = `${100 - (totalSeconds * 100) / (time * 60)}%`;
		totalSeconds--;
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

// Set values and styles according to the time type
const drawScreen = (type) => {
	let times = [workTime, shortBreakTime, longBreakTime];
	let colors = [workColor, shortBreakColor, longBreakColor];

	timeType = type;
	minutes = times[type - 1] - 1;
	seconds = 59;
	stopped = true;

	workButton.style.backgroundColor = type === 1 ? "#fff" : "transparent";
	shortBreakButton.style.backgroundColor = type === 2 ? "#fff" : "transparent";
	longBreakButton.style.backgroundColor = type === 3 ? "#fff" : "transparent";

	workButton.style.color = type === 1 ? "var(--theme-color)" : "#fff";
	shortBreakButton.style.color = type === 2 ? "var(--theme-color)" : "#fff";
	longBreakButton.style.color = type === 3 ? "var(--theme-color)" : "#fff";

	workButton.style.fontWeight = type === 1 ? 700 : 500;
	shortBreakButton.style.fontWeight = type === 2 ? 700 : 500;
	longBreakButton.style.fontWeight = type === 3 ? 700 : 500;

	document.querySelector(":root").style.setProperty("--theme-color", colors[type - 1]);
	timerContainer.innerHTML = `${format(times[type - 1])}:00`;
	progressBar.style.width = "0";
	goButton.click();
};

// Change time type
workButton.addEventListener("click", (e) => drawScreen(1));
shortBreakButton.addEventListener("click", (e) => drawScreen(2));
longBreakButton.addEventListener("click", (e) => drawScreen(3));

// Start or stop the countdown
goButton.addEventListener("click", (e) => {
	if (stopped) {
		goButton.innerHTML = `<img src="img/start.png" alt="Start" />`;
		document.title = "Tomato Time";
		clearInterval(interval);
	} else {
		goButton.innerHTML = `<img src="img/stop.png" alt="Stop" />`;
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
