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

const searchInput = document.getElementById('search');

function handleSubmit(e) {
    e.preventDefault();
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';

    const query = searchInput.value;
    displayResults(query, resultsDiv);
}

searchForm.addEventListener('submit', handleSubmit);