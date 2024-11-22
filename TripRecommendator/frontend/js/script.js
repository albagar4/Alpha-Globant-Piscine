const SERVER_URL = 'http://localhost:5000';

const initPage = document.querySelector('.init-page');
const formPage = document.querySelector('.form-page');
const formOption = document.getElementById('form-option');
const backButton = document.getElementById('back-btn');
const travelForm = document.getElementById('travel-input');
const IAResponse = document.getElementById('IA-response');
const mapContainer = document.getElementById("map-container");
let map;
var marker;

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
		const info_response = await fetch(`${SERVER_URL}/generate_travel_info?query=${searchQuery}`);
		const info_data = await info_response.json();

		const coord_response = await fetch(`${SERVER_URL}/generate_travel_coord?query=${encodeURIComponent(info_data)}`);
		const coord_data = await coord_response.json();
		coord = [coord_data.split(',')[0], coord_data.split(',')[1]];


		IAResponse.innerHTML = info_data;
		inputForm.value = '';
		IAResponse.style.display = 'block';
		mapContainer.style.display = "flex";

		updateMap(coord);
	}
	catch (err) {
		console.error("Error fetching data:", err);
	}
});

function updateMap(coord) {
	if (!map) {
		map = L.map("map").setView([coord[0], coord[1]], 9);
		L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
			maxZoom: 19,
		}).addTo(map);
		marker = new L.marker([coord[0], coord[1]]).addTo(map);
		map.addLayer(marker);
	} 
	else {
		map.setView(coord, 13);
		map.removeLayer(marker);
		marker = new L.marker(coord).addTo(map);
		map.addLayer(marker);
	}
}
