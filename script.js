const api = {
	key: "0c7dd80c0e75be125e1fbc8cddb4cc11",
	base: "https://api.openweathermap.org/data/2.5/",
};

const searchBox = document.querySelector(".search-box");
searchBox.addEventListener("keypress", setQuery);

function setQuery(evt) {
	if (evt.keyCode == 13) {
		getResults(searchBox.value);
		searchBox.value = "";
	}
}

function getResults(query) {
	fetch(`${api.base}weather?q=${query}&units=metric&appid=${api.key}`)
		.then((weather) => weather.json())
		.then(displayResults);
}

function displayResults(weather) {
	const city = document.querySelector(".location .city");
	city.innerText = `${weather.name}, ${weather.sys.country}`;

	let now = new Date();
	let date = document.querySelector(".location .date");
	date.innerHTML = dateBuilder(now);

	const temp = document.querySelector(".current .temp");
	temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;

	const weatherEl = document.querySelector(".current .weather");
	weatherEl.innerText = weather.weather[0].main;

	const hilow = document.querySelector(".hi-low");
	hilow.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(
		weather.main.temp_max
	)}°c`;
}

function dateBuilder(d) {
	const months = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];
	const days = [
		"Sunday",
		"Monday",
		"Tuesday",
		"Weednesday",
		"Thursday",
		"Friday",
		"Saturday",
		"Sunday",
	];

	let day = days[d.getDay()];
	let date = d.getDate();
	let month = months[d.getMonth()];
	let year = d.getFullYear();

	return `${day} ${date} ${month} ${year}`;
}
