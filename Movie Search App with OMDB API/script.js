// Grab references to DOM elements
const searchButton = document.getElementById('search-btn');
const movieInput = document.getElementById('movie-input');
const movieInfo = document.getElementById('movie-info');


// Add event listener to search button
searchButton.addEventListener('click', searchMovie);


// Function to fetch movie data from OMDB API
async function searchMovie() {
    const movieTitle = movieInput.value.trim();
    if (movieTitle === '') {
        alert('Please enter a movie title');
        return;
    }

    try {
        // Fetch movie data
        const response = await fetch(`https://www.omdbapi.com/?i=tt3896198&apikey=fbb437bd`);
        const data = await response.json();

        // Check if the movie exists in the API
        if (data.Response === 'False') {
            movieInfo.innerHTML = '<p>Movie not found. Please try another title.</p>';
        } else {
            // Display the movie information
            movieInfo.innerHTML = `
                <div class="movie-card">
                    <img src="${data.Poster}" alt="${data.Title} poster" class="movie-poster">
                    <div class="movie-details">
                        <h2>${data.Title} (${data.Year})</h2>
                        <p><strong>Plot:</strong> ${data.Plot}</p>
                        <p><strong>Release Year:</strong> ${data.Year}</p>
                    </div>
                </div>
            `;
        }
    } catch (error) {
        console.error('Error fetching movie data:', error);
        movieInfo.innerHTML = '<p>Something went wrong. Please try again later.</p>';
    }
}
