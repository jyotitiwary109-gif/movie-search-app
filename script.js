const API_KEY="857019df";
const searchBtn=document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");
const movieContainer = document.getElementById("movieContainer");
searchBtn.addEventListener("click",searchMovies);
searchInput.addEventListener("keypress", function(event) {

  if (event.key === "Enter") {
    searchMovies();
  }

});
async function searchMovies() {
    const movieName=searchInput.value.trim();
    if (movieName==="") {
        movieContainer.innerHTML="<h2>Please enter movie name</h2>";
        return;
    }
    movieContainer.innerHTML="<h2>Loading...</h2>";
    
  try {

    const response = await fetch(
      `https://www.omdbapi.com/?s=${movieName}&apikey=${API_KEY}`
    );

    const data = await response.json();

    if (data.Response === "False") {
      movieContainer.innerHTML = `<h2>${data.Error}</h2>`;
      return;
    }

    showMovies(data.Search);

  } catch (error) {

    movieContainer.innerHTML = "<h2>Something went wrong</h2>";

  }
}
function showMovies(movies) {
    movieContainer.innerHTML="";
    movies.forEach(movie => {
        const movieCard=document.createElement("div");
         movieCard.classList.add("movie-card");

    const poster =
      movie.Poster !== "N/A"
        ? movie.Poster
        : "https://via.placeholder.com/300x450?text=No+Image";
        movieCard.innerHTML=`<img src ="${movie.Poster}" alt="${movie.Title}">
        <div class="movie-info">
        <h2>${movie.Title}</h2>
        <p>Year:${movie.Year}</p>
        <p>Type:${movie.Type}</p>
        </div>
        `;
        movieContainer.appendChild(movieCard);
    });
}
