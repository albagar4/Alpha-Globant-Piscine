const SERVER_URL = 'http://localhost:3000';

//Favorite implementation
function getFavorites() {
    // If there are no favorites, return an empty array
    return JSON.parse(localStorage.getItem('favorites')) || [];
}

// Save the favorites to local storage
function saveFavorites(favorites) {
    localStorage.setItem('favorites', JSON.stringify(favorites));
}

// Function to add or erase an image from favorites
async function toggleFavorite(imgUrl) {
    const response = await fetch(`${SERVER_URL}/auth/status`);
    const data = await response.json();

    if (data.authenticated) {
        const favorites = getFavorites();
        const index = favorites.indexOf(imgUrl);

        // indexOf returns -1 if the element is not found, else it returns the index
        if (index === -1)
            favorites.push(imgUrl);
        else 
            favorites.splice(index, 1);

        saveFavorites(favorites);
    }
}

function displayFavorites(resultsDiv) {
    const favorites = getFavorites();
    resultsDiv.innerHTML = '';

    favorites.forEach(url => {
        const img = document.createElement('img');
        const photo = document.createElement('div');
        photo.classList.add('result');
        img.src = url;

        photo.appendChild(img);
        resultsDiv.appendChild(photo);
    });
}

const favoritesButton = document.getElementById('favorites-button');

favoritesButton.addEventListener('click', () => {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';
    displayFavorites(resultsDiv);
});

async function displayResults(query, resultsDiv) {
    const response = await fetch(`${SERVER_URL}/get_unsplash_urls?search=${query}`);
    const data = await response.json();

    data.forEach(result => {
        const img = document.createElement('img');
        const photo = document.createElement('div');
        photo.classList.add('result');
        img.src = result;
        // if you click on the image, it will be added to favorites
        img.addEventListener('click', () => toggleFavorite(result));
        photo.appendChild(img);
        resultsDiv.appendChild(photo);
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
const loginButton = document.querySelector('#login-button');
const logoutButton = document.querySelector('#logout-button');

loginButton.addEventListener('click', () => {
    // This will redirect the user to the login endpoint in the backend
    // http://localhost:3000/auth/login (this will redirect to Unsplash)
    window.location.href = `${SERVER_URL}/auth/login`;
});

logoutButton.addEventListener('click', async () => {
    try {
        const response = await fetch(`${SERVER_URL}/auth/logout`);
        const data = await response.json();
        if (data.message === 'Logged out succesfully') {
            loginButton.style.display = 'inline-block';
            logoutButton.style.display = 'none';

            const resultsDiv = document.getElementById('results');
            resultsDiv.innerHTML = '';

            document.body.classList.remove('authenticated');

            alert('Logged out successfully');
        }
    }
    catch (error) {
        console.error('Error logging out', error);
        alert('Failed to log out. Please try again.');
    }
});

async function checkAuthStatus() {
    const response = await fetch(`${SERVER_URL}/auth/status`);
    const data = await response.json();

    const body = document.body;
    if (data.authenticated) {
        loginButton.style.display = 'none';
        logoutButton.style.display = 'inline-block';
        favoritesButton.style.display = 'inline-block';
        body.classList.add('authenticated');
    } else {
        loginButton.style.display = 'inline-block';
        logoutButton.style.display = 'none';
        favoritesButton.style.display = 'none';
        body.classList.remove('authenticated');
    }
}

window.addEventListener('load', checkAuthStatus);
searchForm.addEventListener('submit', handleSubmit);