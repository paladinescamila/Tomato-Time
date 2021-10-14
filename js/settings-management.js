// Elements
const settingsButton = document.getElementById("settings");
const displaySettings = document.getElementById("display-settings");
const settingsBox = document.getElementById("settings-box");
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
	workValue.value = localStorage.getItem("workTime");
	shortBreakValue.value = localStorage.getItem("shortBreakTime");
	longBreakValue.value = localStorage.getItem("longBreakTime");
	autoWorkValue.checked = localStorage.getItem("autoStartWork");
	autoBreakValue.checked = localStorage.getItem("autoStartBreaks");
	intervalValue.value = localStorage.getItem("longBreakInterval");

	displaySettings.style.display = "flex";
});

// Close settings window (with 'x' button)
cancelSettingsButton.addEventListener("click", (e) => {
	displaySettings.style.display = "none";
});

// Close settings window (clicking outside the box)
displaySettings.addEventListener("click", function (e) {
	if (!settingsBox.contains(e.target)) cancelSettingsButton.click();
});

// Save changes and close settings window
saveSettingsButton.addEventListener("click", (e) => {
	let oldWorkTime = localStorage.getItem("workTime"),
		oldShortBreakTime = localStorage.getItem("shortBreakTime"),
		oldLongBreakTime = localStorage.getItem("longBreakTime");

	// Update settings
	localStorage.setItem("workTime", workValue.value <= 99 ? Number(workValue.value) : 25);
	localStorage.setItem("shortBreakTime", shortBreakValue.value <= 99 ? Number(shortBreakValue.value) : 5);
	localStorage.setItem("longBreakTime", longBreakValue.value <= 99 ? Number(longBreakValue.value) : 10);
	localStorage.setItem("autoStartWork", autoWorkValue.checked);
	localStorage.setItem("autoStartBreaks", autoBreakValue.checked);
	localStorage.setItem("longBreakInterval", intervalValue.value <= 99 ? Number(intervalValue.value) : 4);

	// Did settings change the current clock?
	let workChange = timeType === 1 && oldWorkTime !== localStorage.getItem("workTime"),
		shortBreakChange = timeType === 2 && oldShortBreakTime !== localStorage.getItem("shortBreakTime"),
		longBreakChange = timeType === 3 && oldLongBreakTime !== localStorage.getItem("longBreakTime");

	// If settings change, restart the clock
	if (workChange || shortBreakChange || longBreakChange) {
		let times = [localStorage.getItem("workTime"), localStorage.getItem("shortBreakTime"), localStorage.getItem("longBreakTime")];
		timerContainer.innerHTML = `${format(times[timeType - 1])}:00`;
		minutes = times[timeType - 1] - 1;
		seconds = 59;
		stopped = true;
		goButton.click();
	}

	displaySettings.style.display = "none";
});
