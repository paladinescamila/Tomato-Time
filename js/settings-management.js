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

settingsButton.addEventListener("click", (e) => {
	workValue.value = workTime;
	shortBreakValue.value = shortBreakTime;
	longBreakValue.value = longBreakTime;
	intervalValue.value = longBreakInterval;
	autoWorkValue.checked = autoStartWork;
	autoBreakValue.checked = autoStartBreaks;
	displaySettings.style.display = "flex";
});

cancelSettingsButton.addEventListener("click", (e) => {
	displaySettings.style.display = "none";
});

saveSettingsButton.addEventListener("click", (e) => {
	displaySettings.style.display = "none";
});
