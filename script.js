// -----------------------------------------
// Function to fetch search results from the API
async function fetchSearchResults(searchText) {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`);
  const data = await response.json();
  return data.meals;
}

// Function to render search results
function renderSearchResults(meals) {
  const searchResults = document.getElementById("searchResults");
  searchResults.innerHTML = "";

  meals.forEach((meal) => {
    const mealCard = document.createElement("div");
    mealCard.classList.add("card", "mb-3");

    const mealImage = document.createElement("img");
    mealImage.src = meal.strMealThumb;
    mealImage.classList.add("card-img-top");
    mealCard.appendChild(mealImage);

    const mealCardBody = document.createElement("div");
    mealCardBody.classList.add("card-body");

    const mealTitle = document.createElement("h5");
    mealTitle.classList.add("card-title");
    mealTitle.innerText = meal.strMeal;
    mealCardBody.appendChild(mealTitle);

    const knowMoreBtn = document.createElement("button");
    knowMoreBtn.classList.add("btn", "btn-primary", "mr-2");
    knowMoreBtn.innerText = "Know More";
    knowMoreBtn.addEventListener("click", () => showModal(meal));
    mealCardBody.appendChild(knowMoreBtn);

    const addToFavoritesBtn = document.createElement("button");
    addToFavoritesBtn.classList.add("btn", "btn-primary");
    addToFavoritesBtn.innerText = "Add to Favorites";
    addToFavoritesBtn.addEventListener("click", () => addToFavorites(meal));
    mealCardBody.appendChild(addToFavoritesBtn);

    mealCard.appendChild(mealCardBody);
    searchResults.appendChild(mealCard);
  });
}

// Function to show the modal with meal details
function showModal(meal) {
  const modal = document.getElementById("mealModal");
  const modalContent = document.getElementById("mealModalContent");

  modalContent.innerHTML = `
    <div class="modal-header">
      <h3>${meal.strMeal}</h3>
      <span class="close" onclick="closeModal()">&times;</span>
    </div>
    <div class="modal-body">
      <p>${meal.strInstructions}</p>
      <a href="${meal.strYoutube}" target="_blank">Watch on YouTube</a>
    </div>
  `;

  modal.style.display = "block";
}

// Function to close the modal
function closeModal() {
  const modal = document.getElementById("mealModal");
  modal.style.display = "none";
}

// Function to add a meal to favorites
function addToFavorites(meal) {
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  favorites.push(meal);
  localStorage.setItem("favorites", JSON.stringify(favorites));
}

// Event listener for search input
const searchInput = document.getElementById("searchInput");
searchInput.addEventListener("input", async () => {
  const searchText = searchInput.value;
  if (searchText.trim() !== "") {
    const meals = await fetchSearchResults(searchText);
    renderSearchResults(meals);
  } else {
    // Clear search results if search input is empty
    const searchResults = document.getElementById("searchResults");
    searchResults.innerHTML = "";
  }
});


