// Set Local Storage
const setLS = (name, value, replace = true) => {
	if (localStorage.getItem(name)) {
		if (replace) localStorage.setItem(name, JSON.stringify(value));
	} else localStorage.setItem(name, JSON.stringify(value));
};

// Get Local Storage
const getLS = (name) => JSON.parse(localStorage.getItem(name));

// Colors
const COLORS = {
	red: "#e74545",
	orange: "#eb8715",
	yellow: "#e0af26",
	green: "#1aa355",
	cyan: "#1a9aa3",
	blue: "#456eb5",
	purple: "#9d4fd1",
	pink: "#de2f9e",
	black: "#111",
};

// Set initial values
setLS("workTime", 25, false);
setLS("shortBreakTime", 5, false);
setLS("longBreakTime", 10, false);

setLS("workColor", COLORS.red, false);
setLS("shortBreakColor", COLORS.cyan, false);
setLS("longBreakColor", COLORS.blue, false);

setLS("autoStartWork", true, false);
setLS("autoStartBreaks", true, false);
setLS("longBreakInterval", 4, false);

// Initial value for the theme
document.querySelector(":root").style.setProperty("--theme-color", getLS("workColor"));
