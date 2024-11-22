const SERVER_URL = 'http://localhost:5000';

const initPage = document.querySelector('.init-page');
const formPage = document.querySelector('.form-page');
const formOption = document.getElementById('form-option');
const backButton = document.getElementById('back-btn');
const travelForm = document.getElementById('travel-input');
const IAResponse = document.getElementById('IA-response');
const mapContainer = document.getElementById("map-container");
let map;

formOption.addEventListener('click', () => {
	initPage.style.display = 'none';
	formPage.style.display = 'block';
});

backButton.addEventListener('click', () => {
	initPage.style.display = 'block';
	formPage.style.display = 'none';
	IAResponse.style.display = 'none';
	mapContainer.style.display = "none";
});

// Form Gemini petitions
travelForm.addEventListener('submit', async (e) => {
	e.preventDefault();
	const searchQuery = document.getElementById('origin').value;
	const inputForm = document.getElementById('origin');

	if (searchQuery === '') {
		alert('Please enter a search query');
		return ;
	}

	try {
		console.log("Entering info fetch");
		const info_response = await fetch(`${SERVER_URL}/generate_travel_info?query=${searchQuery}`);
		const info_data = await info_response.json();
		console.log(info_data);

		console.log("Entering coord fetch");
		// const enhancedQuery = `${searchQuery} - ${info_data}`;
		// console.log(enhancedQuery);
		const coord_response = await fetch(`${SERVER_URL}/generate_travel_coord?query=${info_data}`);
		const coord_data = await coord_response.json();
		coord = [coord_data.split(',')[0], coord_data.split(',')[1]];


		IAResponse.innerHTML = info_data;
		inputForm.value = '';
		IAResponse.style.display = 'block';
		mapContainer.style.display = "flex";

		if (!map) {
			map = L.map("map").setView([coord[0], coord[1]], 13);
			L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
				maxZoom: 19,
			}).addTo(map);
			L.marker([coord[0], coord[1]]).addTo(map);
		} else {
			map.setView(coord, 13);
			L.marker(coord).addTo(map);
		}
	}
	catch (err) {
		console.error("Error fetching data:", err);
	}
});
