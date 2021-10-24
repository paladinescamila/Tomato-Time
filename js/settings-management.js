// Elements
const settingsButton = document.getElementById("settings");
const displaySettings = document.getElementById("display-settings");
const settingsBox = document.getElementById("settings-box");
const workValue = document.getElementById("work-value");
const shortBreakValue = document.getElementById("short-break-value");
const longBreakValue = document.getElementById("long-break-value");
const workColorButton = document.getElementById("work-color");
const shortColorButton = document.getElementById("short-color");
const longColorButton = document.getElementById("long-color");
const intervalValue = document.getElementById("interval-value");
const autoWorkValue = document.getElementById("auto-work-value");
const autoBreakValue = document.getElementById("auto-break-value");
const cancelSettingsButton = document.getElementById("cancel-settings");
const saveSettingsButton = document.getElementById("save-settings");
const colorPicker = document.getElementById("color-picker");

// Variables
let themeToChange = 1;

// Open settings window
settingsButton.addEventListener("click", (e) => {
	workValue.value = workTime;
	shortBreakValue.value = shortBreakTime;
	longBreakValue.value = longBreakTime;
	intervalValue.value = longBreakInterval;
	autoWorkValue.checked = autoStartWork;
	autoBreakValue.checked = autoStartBreaks;

	workColorButton.style.backgroundColor = workColor;
	shortColorButton.style.backgroundColor = shortBreakColor;
	longColorButton.style.backgroundColor = longBreakColor;

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
		progressBar.style.width = "0";
		minutes = times[timeType - 1] - 1;
		seconds = 59;
		stopped = true;
		goButton.click();
	}

	displaySettings.style.display = "none";
});

// Change color theme (work)
workColorButton.addEventListener("click", (e) => {
	colorPicker.style.display = "grid";
	document.querySelector(":root").style.setProperty("--show-work", 1);
	document.querySelector(":root").style.setProperty("--show-short", 0);
	document.querySelector(":root").style.setProperty("--show-long", 0);
	document.querySelector(":root").style.setProperty("--picker-left", "90px");
	themeToChange = 1;
});

// Change color theme (short break)
shortColorButton.addEventListener("click", (e) => {
	colorPicker.style.display = "grid";
	document.querySelector(":root").style.setProperty("--show-work", 0);
	document.querySelector(":root").style.setProperty("--show-short", 1);
	document.querySelector(":root").style.setProperty("--show-long", 0);
	document.querySelector(":root").style.setProperty("--picker-left", "260px");
	themeToChange = 2;
});

// Change color theme (lonk break)
longColorButton.addEventListener("click", (e) => {
	colorPicker.style.display = "grid";
	document.querySelector(":root").style.setProperty("--show-work", 0);
	document.querySelector(":root").style.setProperty("--show-short", 0);
	document.querySelector(":root").style.setProperty("--show-long", 1);
	document.querySelector(":root").style.setProperty("--picker-left", "390px");
	themeToChange = 3;
});

// Pick a color
let colorKeys = ["red", "cyan", "blue", "green", "orange", "pink"];
let colorValues = ["#e74545", "#1a9aa3", "#456eb5", "#1aa355", "#dbac1f", "#db1fbf"];

for (let i = 0; i < colorKeys.length; i++) {
	document.getElementById(`${colorKeys[i]}-bg`).addEventListener("click", (e) => {
		if (themeToChange === 1) {
			workColor = colorValues[i];
			workColorButton.style.backgroundColor = workColor;
			document.querySelector(":root").style.setProperty("--show-work", 0);
		}
		if (themeToChange === 2) {
			shortBreakColor = colorValues[i];
			shortColorButton.style.backgroundColor = shortBreakColor;
			document.querySelector(":root").style.setProperty("--show-short", 0);
		}
		if (themeToChange === 3) {
			longBreakColor = colorValues[i];
			longColorButton.style.backgroundColor = longBreakColor;
			document.querySelector(":root").style.setProperty("--show-long", 0);
		}

		colorPicker.style.display = "none";
		if (themeToChange === timeType) document.querySelector(":root").style.setProperty("--theme-color", colorValues[i]);
	});
}
