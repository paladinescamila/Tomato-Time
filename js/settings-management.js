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

	for (let i = 0; i < nColors; i++) document.getElementById(`${colorKeys[i]}-bg`).style.backgroundColor = colorValues[i];
	displaySettings.style.display = "flex";
});

// Close settings window (with 'x' button)
cancelSettingsButton.addEventListener("click", (e) => {
	displaySettings.style.display = "none";
	colorPicker.style.display = "none";
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

// Change color theme
const changeColorTheme = (type, pt_small, pl_small, pt_big, pl_big) => {
	colorPicker.style.display = "block";
	themeToChange = type;

	if (document.body.clientWidth <= 500) {
		document.querySelector(":root").style.setProperty("--picker-top", pt_small + "px");
		document.querySelector(":root").style.setProperty("--picker-left", settingsBox.clientWidth * pl_small + "px");
	} else {
		document.querySelector(":root").style.setProperty("--picker-top", pt_big + "px");
		document.querySelector(":root").style.setProperty("--picker-left", settingsBox.clientWidth * pl_big + "px");
	}
};

workColorButton.addEventListener("click", (e) => changeColorTheme(1, 15, 0.71, 15, 0.15));
shortColorButton.addEventListener("click", (e) => changeColorTheme(2, 60, 0.71, 15, 0.45));
longColorButton.addEventListener("click", (e) => changeColorTheme(3, 107, 0.71, 15, 0.75));

// Pick a color
for (let i = 0; i < nColors; i++) {
	document.getElementById(`${colorKeys[i]}-bg`).addEventListener("click", (e) => {
		if (themeToChange === 1) {
			workColor = colorValues[i];
			workColorButton.style.backgroundColor = workColor;
		}
		if (themeToChange === 2) {
			shortBreakColor = colorValues[i];
			shortColorButton.style.backgroundColor = shortBreakColor;
		}
		if (themeToChange === 3) {
			longBreakColor = colorValues[i];
			longColorButton.style.backgroundColor = longBreakColor;
		}

		colorPicker.style.display = "none";
		if (themeToChange === timeType) document.querySelector(":root").style.setProperty("--theme-color", colorValues[i]);
	});
}

// Close color picker window (clicking outside the box)
settingsBox.addEventListener("click", function (e) {
	let withoutPicker = !colorPicker.contains(e.target),
		withoutWork = !workColorButton.contains(e.target),
		withoutShort = !shortColorButton.contains(e.target),
		withoutLong = !longColorButton.contains(e.target);
	if (withoutPicker && withoutWork && withoutShort && withoutLong) colorPicker.style.display = "none";
});
