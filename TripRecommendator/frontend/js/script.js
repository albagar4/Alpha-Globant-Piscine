const SERVER_URL = 'http://localhost:5000';

const initPage = document.querySelector('.init-page');
const formPage = document.querySelector('.form-page');
const formOption = document.getElementById('form-option');
const filePage = document.querySelector('.file-page');
const fileOption = document.getElementById('file-option');
const backButton = document.getElementsByClassName('back-btn');
const travelForm = document.getElementById('travel-input');
const travelFile = document.getElementById('travel-file');
const IAResponse = document.getElementsByClassName('IA-response');
const mapContainer = document.getElementById("map-container");
let map;
var marker;

formOption.addEventListener('click', () => {
	initPage.style.display = 'none';
	formPage.style.display = 'block';
});

fileOption.addEventListener('click', () => {
	initPage.style.display = 'none';
	filePage.style.display = 'block';
});

backButton[0].addEventListener('click', () => {
	initPage.style.display = 'block';
	formPage.style.display = 'none';
	IAResponse[0].style.display = 'none';
	mapContainer.style.display = "none";
});

backButton[1].addEventListener('click', () => {
	initPage.style.display = 'block';
	filePage.style.display = 'none';
	IAResponse[1].style.display = 'none';
	mapContainer.style.display = "none";
});

// Form Gemini petitions on form page
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


		IAResponse[0].innerHTML = info_data;
		inputForm.value = '';
		IAResponse[0].style.display = 'block';
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

// File Gemini petitions on file page
travelFile.addEventListener('submit', async (e) => {
	e.preventDefault();
	const file = document.getElementById('file').files[0];

	if (!file) {
		alert('Please select a file');
		return ;
	}

	const formData = new FormData();
	formData.append('file', file);

	try {
		console.log('Sending file...');
		const response = await fetch(`${SERVER_URL}/image_to_text`, {
			method: 'POST',
			body: formData,
		});

		if (!response.ok) {
			throw new Error(`Server error: ${response.statusText}`);
		}
		
		const data = await response.json();
		IAResponse[1].innerHTML = data.response;
		IAResponse[1].style.display = 'block';
	}
	catch (err) {
		console.error("Error fetching data:", err);
	}
});
