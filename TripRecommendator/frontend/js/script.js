const SERVER_URL = 'http://localhost:5000';

const initPage = document.querySelector('.init-page');
const formPage = document.querySelector('.form-page');
const formOption = document.getElementById('form-option');
const backButton = document.getElementById('back-btn');
const travelForm = document.getElementById('travel-input');
const IAResponse = document.getElementById('IA-response');

formOption.addEventListener('click', () => {
	initPage.style.display = 'none';
	formPage.style.display = 'block';
});

backButton.addEventListener('click', () => {
	initPage.style.display = 'block';
	formPage.style.display = 'none';
	IAResponse.style.display = 'none';
});

// Form Gemini petitions
travelForm.addEventListener('submit', async (e) => {
	e.preventDefault();
	const searchQuery = document.getElementById('origin').value;
	const inputForm = document.getElementById('origin');
	if (searchQuery === '') {
		alert('Please enter a search query');
	}
	else {
		const response = await fetch(`${SERVER_URL}/generate_travel_info?query=${searchQuery}`);
		const data = await response.json();
		console.log(data);

		IAResponse.innerHTML = data;
		inputForm.value = '';
		IAResponse.style.display = 'block';
	}
});
