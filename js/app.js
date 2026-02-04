// Recipe Data
const recipes = [
    { id: 1, title: "Spaghetti Carbonara", time: 25, difficulty: "Easy" },
    { id: 2, title: "Chicken Tikka Masala", time: 45, difficulty: "Medium" },
    { id: 3, title: "Beef Wellington", time: 120, difficulty: "Hard" },
    { id: 4, title: "Greek Salad", time: 15, difficulty: "Easy" },
    { id: 5, title: "Pad Thai", time: 30, difficulty: "Medium" },
    { id: 6, title: "Homemade Croissants", time: 180, difficulty: "Hard" },
    { id: 7, title: "Vegetable Stir Fry", time: 20, difficulty: "Easy" },
    { id: 8, title: "Margherita Pizza", time: 60, difficulty: "Medium" }
];

// DOM Selection
const recipeContainer = document.querySelector("#recipe-container");

// Render Recipes
function renderRecipes(recipeList) {
    recipeContainer.innerHTML = "";

    recipeList.forEach(recipe => {
        const card = document.createElement("div");
        card.className = "recipe-card";

        const level = recipe.difficulty.toLowerCase();

        card.innerHTML = `
            <h3>${recipe.title}</h3>
            <span class="badge ${level}">${recipe.difficulty}</span>
            <p>⏱ ${recipe.time} minutes</p>
        `;

        recipeContainer.appendChild(card);
    });
}

// Filter by Difficulty
function filterByDifficulty(level) {
    return recipes.filter(r => r.difficulty === level);
}

// Handle Buttons
function handleAction(action) {
    let result = [...recipes];

    const actions = {
        easy: () => filterByDifficulty("Easy"),
        medium: () => filterByDifficulty("Medium"),
        hard: () => filterByDifficulty("Hard"),
        quick: () => recipes.filter(r => r.time <= 30),
        time: () => [...recipes].sort((a, b) => a.time - b.time),
        az: () => [...recipes].sort((a, b) => a.title.localeCompare(b.title)),
        all: () => recipes
    };

    if (actions[action]) {
        result = actions[action]();
    }

    renderRecipes(result);
}

// Search Recipes
function searchRecipes() {
    const query = document
        .getElementById("searchInput")
        .value
        .toLowerCase();

    const filtered = recipes.filter(recipe =>
        recipe.title.toLowerCase().includes(query)
    );

    if (filtered.length === 0) {
        recipeContainer.innerHTML = "<p>No recipes found 😢</p>";
        return;
    }

    renderRecipes(filtered);
}

// Initial Render
renderRecipes(recipes);
