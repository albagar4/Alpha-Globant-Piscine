let initPage = document.querySelector('.init-page');
let formPage = document.querySelector('.form-page');
let formOption = document.getElementById('form-option');

formOption.addEventListener('click', () => {
	initPage.style.display = 'none';
	formPage.style.display = 'block';
});