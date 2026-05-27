const API_KEY="857019df";
const searchBtn=document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");
const movieContainer = document.getElementById("movieContainer");
const moviePopup = document.getElementById("moviePopup");
const popupDetails = document.getElementById("popupDetails");
const closePopup = document.getElementById("closePopup");
const themeBtn = document.getElementById("themeBtn");
searchBtn.addEventListener("click",searchMovies);
searchInput.addEventListener("keypress", function(event) {

  if (event.key === "Enter") {
    searchMovies();
  }

});
themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("light-mode");

    if(document.body.classList.contains("light-mode")){
        themeBtn.textContent = "☀️";
    }
    else{
        themeBtn.textContent = "🌙";
    }

});
async function searchMovies() {
    const movieName=searchInput.value.trim();
    if (movieName==="") {
        movieContainer.innerHTML="<h2>Please enter movie name</h2>";
        return;
    }
    movieContainer.innerHTML=`<div class="loader"></div>`;
    await new Promise(resolve => setTimeout(resolve, 2000));
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
         movieCard.addEventListener("click", () => {
    getMovieDetails(movie.imdbID);
});


    const poster =
      movie.Poster !== "N/A"
        ? movie.Poster
        : "https://via.placeholder.com/300x450?text=No+Image";
        movieCard.innerHTML=`<img src ="${poster}" alt="${movie.Title}">
        <div class="movie-info">
        <h2>${movie.Title}</h2>
        <p>Year:${movie.Year}</p>
        <p>Type:${movie.Type}</p>
        <button class="fav-btn">❤️ Favorite</button>
        </div>
        `;
        movieContainer.appendChild(movieCard);
        const favBtn = movieCard.querySelector(".fav-btn");

favBtn.addEventListener("click", (e) => {

    e.stopPropagation();

    let favorites =
        JSON.parse(localStorage.getItem("favorites")) || [];

    const alreadyExists = favorites.some(
    fav => fav.imdbID === movie.imdbID
);

if(alreadyExists){
    alert("Movie already added ❤️");
    return;
}

favorites.push(movie);

    localStorage.setItem(
        "favorites",
        JSON.stringify(favorites)
    );

    alert("Movie added to favorites ❤️");

});
    });
}
async function getMovieDetails(id){

    const response = await fetch(
        `https://www.omdbapi.com/?apikey=${API_KEY}&i=${id}`
    );

    const data = await response.json();

    popupDetails.innerHTML = `
    
    <div class="popup-details">

        <img src="${
    data.Poster !== 'N/A'
    ? data.Poster
    : 'https://via.placeholder.com/300x450?text=No+Image'
}" alt="${data.Title}">

        <div class="popup-text">

            <h2>${data.Title}</h2>

            <p><strong>Year:</strong> ${data.Year}</p>

            <p><strong>Genre:</strong> ${data.Genre}</p>

            <p><strong>IMDb Rating:</strong> ${data.imdbRating}</p>

            <p><strong>Actors:</strong> ${data.Actors}</p>

            <p><strong>Plot:</strong> ${data.Plot}</p>

        </div>

    </div>
    
    `;

    moviePopup.style.display = "flex";

}
closePopup.addEventListener("click", () => {
    moviePopup.style.display = "none";
});
moviePopup.addEventListener("click", (e) => {

    if(e.target === moviePopup){
        moviePopup.style.display = "none";
    }

});