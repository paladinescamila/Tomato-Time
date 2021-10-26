// Elements
const aboutButton = document.getElementById("about");
const displayAbout = document.getElementById("display-about");
const cancelAboutButton = document.getElementById("cancel-about");
const aboutBox = document.getElementById("about-box");

// Open about window
aboutButton.addEventListener("click", (e) => {
	displayAbout.style.display = "flex";
});

// Close about window (with 'x' button)
cancelAboutButton.addEventListener("click", (e) => {
	displayAbout.style.display = "none";
});

// Close about window (clicking outside the box)
displayAbout.addEventListener("click", function (e) {
	if (!aboutBox.contains(e.target)) cancelAboutButton.click();
});
