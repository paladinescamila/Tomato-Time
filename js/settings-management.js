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
	workTime = workValue.value <= 1440 ? workValue.value : 25;
	shortBreakTime = shortBreakValue.value <= 720 ? shortBreakValue.value : 5;
	longBreakTime = longBreakValue.value <= 720 ? longBreakValue.value : 10;
	longBreakInterval = intervalValue.value <= 100 ? intervalValue.value : 4;
	autoStartWork = autoWorkValue.checked;
	autoStartBreaks = autoBreakValue.checked;

	displaySettings.style.display = "none";
	let times = [workTime, shortBreakTime, longBreakTime]
	timerContainer.innerHTML = `${format(times[timeType - 1])}:00`;
	minutes = times[timeType - 1] - 1;
	seconds = 59;
});
