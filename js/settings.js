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

// Verify a number input
const verify = (value) => {
	let number = Number(value);

	if (Number.isInteger(number)) {
		if (number >= 1 && number <= 99) return true;
		else alert("Please enter a number between 1 and 99.");
	} else alert("Please enter a valid number.");

	return false;
};

// Open settings window
settingsButton.addEventListener("click", (e) => {
	workValue.value = getLS("workTime");
	shortBreakValue.value = getLS("shortBreakTime");
	longBreakValue.value = getLS("longBreakTime");
	intervalValue.value = getLS("longBreakInterval");
	autoWorkValue.checked = getLS("autoStartWork");
	autoBreakValue.checked = getLS("autoStartBreaks");

	workColorButton.style.backgroundColor = getLS("workColor");
	shortColorButton.style.backgroundColor = getLS("shortBreakColor");
	longColorButton.style.backgroundColor = getLS("longBreakColor");

	displaySettings.style.display = "flex";
});

// Close settings window (with 'x' button)
cancelSettingsButton.addEventListener("click", (e) => {
	e.preventDefault();
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
	e.preventDefault();

	if (verify(workValue.value) && verify(shortBreakValue.value) && verify(longBreakValue.value) && verify(intervalValue.value)) {
		// Old values of the times
		let oldWorkTime = getLS("workTime"),
			oldShortBreakTime = getLS("shortBreakTime"),
			oldLongBreakTime = getLS("longBreakTime");

		// Update settings
		setLS("workTime", Number(workValue.value));
		setLS("shortBreakTime", Number(shortBreakValue.value));
		setLS("longBreakTime", Number(longBreakValue.value));
		setLS("longBreakInterval", Number(intervalValue.value));
		setLS("autoStartWork", autoWorkValue.checked);
		setLS("autoStartBreaks", autoBreakValue.checked);

		// Did settings change the current clock?
		let workChange = timeType === 1 && oldWorkTime !== getLS("workTime"),
			shortBreakChange = timeType === 2 && oldShortBreakTime !== getLS("shortBreakTime"),
			longBreakChange = timeType === 3 && oldLongBreakTime !== getLS("longBreakTime");

		// If settings change, restart the clock
		if (workChange || shortBreakChange || longBreakChange) {
			let times = [getLS("workTime"), getLS("shortBreakTime"), getLS("longBreakTime")];
			timerContainer.innerHTML = `${format(times[timeType - 1])}:00`;
			progressBar.style.width = "0";
			minutes = times[timeType - 1] - 1;
			seconds = 59;
			stopped = true;
			goButton.click();
		}

		// Update theme colors
		setLS("workColor", workColorButton.style.backgroundColor);
		setLS("shortBreakColor", shortColorButton.style.backgroundColor);
		setLS("longBreakColor", longColorButton.style.backgroundColor);

		let newColors = [getLS("workColor"), getLS("shortBreakColor"), getLS("longBreakColor")];
		document.querySelector(":root").style.setProperty("--theme-color", newColors[timeType - 1]);
		displaySettings.style.display = "none";
	}
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
