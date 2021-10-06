// Elements
const settingsButton = document.getElementById("settings");
const displaySettings = document.getElementById("display-settings");
const workValue = document.getElementById("work-value");
const shortBreakValue = document.getElementById("short-break-value");
const longBreakValue = document.getElementById("long-break-value");
const intervalValue = document.getElementById("interval-value");
const autoWorkValue = document.getElementById("auto-work-value");
const autoBreakValue = document.getElementById("auto-break-value");
const cancelSettingsButton = document.getElementById("cancel-settings");
const saveSettingsButton = document.getElementById("save-settings");

// Open settings window
settingsButton.addEventListener("click", (e) => {
	workValue.value = workTime;
	shortBreakValue.value = shortBreakTime;
	longBreakValue.value = longBreakTime;
	intervalValue.value = longBreakInterval;
	autoWorkValue.checked = autoStartWork;
	autoBreakValue.checked = autoStartBreaks;

	displaySettings.style.display = "flex";
});

// Close settings window
cancelSettingsButton.addEventListener("click", (e) => {
	displaySettings.style.display = "none";
});

// Save changes and close settings window
saveSettingsButton.addEventListener("click", (e) => {
	let oldWorkTime = workTime,
		oldShortBreakTime = shortBreakTime,
		oldLongBreakTime = longBreakTime;

	// Update settings
	workTime = workValue.value <= 99 ? Number(workValue.value) : 25;
	shortBreakTime = shortBreakValue.value <= 99 ? Number(shortBreakValue.value) : 5;
	longBreakTime = longBreakValue.value <= 99 ? Number(longBreakValue.value) : 10;
	longBreakInterval = intervalValue.value <= 99 ? Number(intervalValue.value) : 4;
	autoStartWork = autoWorkValue.checked;
	autoStartBreaks = autoBreakValue.checked;

	// Did settings change the current clock?
	let workChange = timeType === 1 && oldWorkTime !== workTime,
		shortBreakChange = timeType === 2 && oldShortBreakTime !== shortBreakTime,
		longBreakChange = timeType === 3 && oldLongBreakTime !== longBreakTime;

	// If settings change, restart the clock
	if (workChange || shortBreakChange || longBreakChange) {
		let times = [workTime, shortBreakTime, longBreakTime];
		timerContainer.innerHTML = `${format(times[timeType - 1])}:00`;
		minutes = times[timeType - 1] - 1;
		seconds = 59;
		stopped = true;
		goButton.click();
	}

	displaySettings.style.display = "none";
});
