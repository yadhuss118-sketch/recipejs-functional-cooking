// ===============================
// Recipe Data
// ===============================

const recipes = [
    {
        title: "Spaghetti Carbonara",
        difficulty: "Medium",
        time: 30
    },
    {
        title: "Grilled Cheese Sandwich",
        difficulty: "Easy",
        time: 10
    },
    {
        title: "Chicken Biryani",
        difficulty: "Hard",
        time: 60
    },
    {
        title: "Pancakes",
        difficulty: "Easy",
        time: 20
    },
    {
        title: "Veg Stir Fry",
        difficulty: "Medium",
        time: 25
    }
];

// ===============================
// Render Recipes
// ===============================

const recipeContainer = document.getElementById("recipe-container");

function renderRecipes(recipeList) {
    recipeContainer.innerHTML = "";

    recipeList.forEach(recipe => {
        const card = document.createElement("div");
        card.className = "recipe-card";

        card.innerHTML = `
            <h3>${recipe.title}</h3>
            <p>Difficulty: <strong>${recipe.difficulty}</strong></p>
            <p>Time: ${recipe.time} mins</p>
        `;

        recipeContainer.appendChild(card);
    });
}

// Initial render
renderRecipes(recipes);

// ===============================
// Filter & Sort Controls
// ===============================

const buttons = document.querySelectorAll(".controls button");

buttons.forEach(button => {
    button.addEventListener("click", () => {
        const action = button.dataset.action;
        handleAction(action);
    });
});

function handleAction(action) {
    let updatedRecipes = [...recipes];

    if (action === "easy") {
        updatedRecipes = recipes.filter(r => r.difficulty === "Easy");
    }

    if (action === "medium") {
        updatedRecipes = recipes.filter(r => r.difficulty === "Medium");
    }

    if (action === "hard") {
        updatedRecipes = recipes.filter(r => r.difficulty === "Hard");
    }

    if (action === "quick") {
        updatedRecipes = recipes.filter(r => r.time <= 30);
    }

    if (action === "time") {
        updatedRecipes.sort((a, b) => a.time - b.time);
    }

    if (action === "az") {
        updatedRecipes.sort((a, b) => a.title.localeCompare(b.title));
    }

    renderRecipes(updatedRecipes);
}
