// --------------------
// DATA
// --------------------
const recipes = [
  {
    title: "Pasta Alfredo",
    difficulty: "easy",
    time: 20,
    ingredients: ["Pasta", "Cream", "Garlic", "Cheese"],
    steps: ["Boil pasta", "Prepare sauce", "Mix together", "Serve"]
  },
  {
    title: "Chicken Curry",
    difficulty: "medium",
    time: 45,
    ingredients: ["Chicken", "Onion", "Tomato", "Spices"],
    steps: ["Marinate chicken", "Cook masala", "Add chicken", "Simmer"]
  },
  {
    title: "Veg Fried Rice",
    difficulty: "easy",
    time: 25,
    ingredients: ["Rice", "Vegetables", "Soy sauce"],
    steps: ["Cook rice", "Stir fry veggies", "Add rice", "Mix"]
  },
  {
    title: "Beef Steak",
    difficulty: "hard",
    time: 60,
    ingredients: ["Beef", "Salt", "Pepper"],
    steps: ["Season beef", "Heat pan", "Cook steak", "Rest & serve"]
  }
];

// --------------------
// STATE
// --------------------
let currentFilter = "all";
let currentSort = "none";
let searchTerm = "";
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

// --------------------
// DOM
// --------------------
const recipeContainer = document.getElementById("recipe-container");
const filterButtons = document.querySelectorAll("[data-filter]");
const sortButtons = document.querySelectorAll("[data-sort]");
const searchInput = document.getElementById("searchInput");

// --------------------
// HELPERS
// --------------------
const isFavorite = (title) => favorites.includes(title);

const toggleFavorite = (title) => {
  favorites = isFavorite(title)
    ? favorites.filter(f => f !== title)
    : [...favorites, title];

  localStorage.setItem("favorites", JSON.stringify(favorites));
};

// --------------------
// FILTER / SEARCH / SORT
// --------------------
const applyFilter = (list) => {
  if (currentFilter === "all") return list;
  if (currentFilter === "quick") {
    return list.filter(r => r.time <= 30);
  }
  return list.filter(r => r.difficulty === currentFilter);
};

const applySearch = (list) => {
  if (!searchTerm) return list;
  return list.filter(r =>
    r.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
};

const applySort = (list) => {
  if (currentSort === "name") {
    return [...list].sort((a, b) => a.title.localeCompare(b.title));
  }
  if (currentSort === "time") {
    return [...list].sort((a, b) => a.time - b.time);
  }
  return list;
};

// --------------------
// RENDER
// --------------------
const renderRecipes = (list) => {
  recipeContainer.innerHTML = list.map((r, i) => `
    <div class="recipe-card">
      <h3>${r.title}</h3>

      <div class="recipe-meta">
        <p>Difficulty: ${r.difficulty}</p>
        <p>Time: ${r.time} mins</p>
      </div>

      <button class="btn toggle-btn" data-index="${i}">
        Show Details
      </button>

      <button class="btn fav-btn" data-title="${r.title}">
        ${isFavorite(r.title) ? "❤️ Favorite" : "🤍 Favorite"}
      </button>

      <div class="details hidden" id="details-${i}">
        <h4>Ingredients</h4>
        <ul>${r.ingredients.map(i => `<li>${i}</li>`).join("")}</ul>

        <h4>Steps</h4>
        <ol>${r.steps.map(s => `<li>${s}</li>`).join("")}</ol>
      </div>
    </div>
  `).join("");
};

// --------------------
// UPDATE
// --------------------
const updateDisplay = () => {
  let result = recipes;
  result = applyFilter(result);
  result = applySearch(result);
  result = applySort(result);
  renderRecipes(result);
};

// --------------------
// EVENTS
// --------------------
filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    currentFilter = btn.dataset.filter;
    filterButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    updateDisplay();
  });
});

sortButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    currentSort = btn.dataset.sort;
    sortButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    updateDisplay();
  });
});

searchInput.addEventListener("input", (e) => {
  searchTerm = e.target.value;
  updateDisplay();
});

recipeContainer.addEventListener("click", (e) => {

  if (e.target.classList.contains("toggle-btn")) {
    const idx = e.target.dataset.index;
    const details = document.getElementById(`details-${idx}`);
    details.classList.toggle("hidden");
    e.target.textContent = details.classList.contains("hidden")
      ? "Show Details"
      : "Hide Details";
  }

  if (e.target.classList.contains("fav-btn")) {
    toggleFavorite(e.target.dataset.title);
    updateDisplay();
  }
});

// --------------------
// INIT
// --------------------
updateDisplay();
