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
	let colorPicker = document.getElementById("color-picker");
	if (colorPicker) colorPicker.style.display = "none";
});

// Close settings window (clicking outside the box)
displaySettings.addEventListener("click", function (e) {
	if (!settingsBox.contains(e.target)) cancelSettingsButton.click();
});

// Close color picker window (clicking outside the box)
settingsBox.addEventListener("click", function (e) {
	let colorPicker = document.getElementById("color-picker");
	if (colorPicker) {
		let withoutPicker = !colorPicker.contains(e.target),
			withoutWork = !workColorButton.contains(e.target),
			withoutShort = !shortColorButton.contains(e.target),
			withoutLong = !longColorButton.contains(e.target);

		if (withoutPicker && withoutWork && withoutShort && withoutLong) colorPicker.style.display = "none";
	}
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

	// Update theme colors
	workColor = workColorButton.style.backgroundColor;
	shortBreakColor = shortColorButton.style.backgroundColor;
	longBreakColor = longColorButton.style.backgroundColor;

	let newColors = [workColor, shortBreakColor, longBreakColor];
	document.querySelector(":root").style.setProperty("--theme-color", newColors[timeType - 1]);
	displaySettings.style.display = "none";
});

// Change color theme
workColorButton.addEventListener("click", (e) => drawColorPicker(1));
shortColorButton.addEventListener("click", (e) => drawColorPicker(2));
longColorButton.addEventListener("click", (e) => drawColorPicker(3));

// Draw color picker
const drawColorPicker = (type) => {
	// Delete old color picker
	let oldColorPicker = document.getElementById("color-picker");
	if (oldColorPicker) oldColorPicker.remove();

	// Create a new color picker element
	let pickerElement = document.createElement("div");
	pickerElement.setAttribute("id", "color-picker");
	pickerElement.classList.add("picker-container");
	pickerElement.innerHTML = `<div class="pick-color"></div>`;

	// Add color picker to the settings
	if (type === 1) workColorButton.insertAdjacentElement("afterend", pickerElement);
	else if (type === 2) shortColorButton.insertAdjacentElement("afterend", pickerElement);
	else longColorButton.insertAdjacentElement("afterend", pickerElement);

	// Draw colors
	let keys = Object.keys(COLORS),
		colorPicker = document.getElementById("color-picker");

	keys.forEach((color) => {
		// Create color element
		colorElement = document.createElement("div");
		colorElement.setAttribute("id", `${color}-bg`);
		colorPicker.firstElementChild.appendChild(colorElement);
		document.getElementById(`${color}-bg`).style.backgroundColor = COLORS[color];

		// Set click event to pick the color
		document.getElementById(`${color}-bg`).addEventListener("click", (e) => {
			if (type === 1) workColorButton.style.backgroundColor = COLORS[color];
			else if (type === 2) shortColorButton.style.backgroundColor = COLORS[color];
			else longColorButton.style.backgroundColor = COLORS[color];

			colorPicker.style.display = "none";
		});
	});
};
