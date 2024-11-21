let initPage = document.querySelector('.init-page');
let formPage = document.querySelector('.form-page');
let formOption = document.getElementById('form-option');
let backButton = document.getElementById('back-btn');

formOption.addEventListener('click', () => {
	initPage.style.display = 'none';
	formPage.style.display = 'block';
});

backButton.addEventListener('click', () => {
	initPage.style.display = 'block';
	formPage.style.display = 'none';
});