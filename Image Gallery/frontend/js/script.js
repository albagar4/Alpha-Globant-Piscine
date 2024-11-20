const SERVER_URL = 'http://localhost:3000';

async function displayResults(query, resultsDiv) {
    const response = await fetch(`${SERVER_URL}/get_unsplash_urls?search=${query}`);
    const data = await response.json();

    data.forEach(result => {
        const img = document.createElement('img');
        img.src = result;
        img.classList.add('result');
        resultsDiv.appendChild(img);
    });
}

const searchForm = document.getElementById('search');
const searchInput = searchForm['search_input'];

function handleSubmit(e) {
    e.preventDefault();
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';

    const query = searchInput.value;
    displayResults(query, resultsDiv);
    searchInput.value = '';
}

// Code for OAuth2.0
const loginButton = document.querySelector('.login-page button');

loginButton.addEventListener('click', () => {
    // This will redirect the user to the login endpoint in the backend
    // http://localhost:3000/auth/login (this will redirect to Unsplash)
    window.location.href = `${SERVER_URL}/auth/login`;
});

async function checkAuthStatus() {
    const response = await  fetch(`${SERVER_URL}/auth/status`);
    const data = await response.json();

    if (data.authenticated) {
        loginButton.textContent = 'Logout';
        loginButton.disabled = true;
    }
    else {
        loginButton.textContent = 'Login';
        loginButton.disabled = false;
    }
}

checkAuthStatus();
searchForm.addEventListener('submit', handleSubmit);