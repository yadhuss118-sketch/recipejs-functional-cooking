const RecipeApp = (() => {

  // --------------------
  // RECIPE DATA
  // --------------------
  const recipes = [
    {
      title: "Pasta Alfredo",
      difficulty: "easy",
      time: 20,
      ingredients: ["Pasta", "Cream", "Butter", "Garlic"],
      steps: [
        "Boil pasta",
        "Prepare sauce",
        "Mix pasta with sauce"
      ]
    },
    {
      title: "Chicken Curry",
      difficulty: "medium",
      time: 45,
      ingredients: ["Chicken", "Onion", "Tomato", "Spices"],
      steps: [
        "Wash chicken",
        {
          text: "Prepare masala",
          substeps: [
            "Heat oil",
            "Add onion",
            {
              text: "Add spices",
              substeps: ["Turmeric", "Chili powder"]
            }
          ]
        },
        "Add chicken",
        "Cook for 30 minutes"
      ]
    },
    {
      title: "Omelette",
      difficulty: "easy",
      time: 10,
      ingredients: ["Eggs", "Salt", "Oil"],
      steps: ["Crack eggs", "Beat eggs", "Cook in pan"]
    }
  ];

  // --------------------
  // STATE
  // --------------------
  let currentFilter = "all";
  let currentSort = "none";
  let searchText = "";

  // --------------------
  // DOM ELEMENTS
  // --------------------
  const recipeContainer = document.getElementById("recipe-container");
  const filterButtons = document.querySelectorAll("[data-filter]");
  const sortButtons = document.querySelectorAll("[data-sort]");
  const searchInput = document.getElementById("searchInput");

  // --------------------
  // FILTER
  // --------------------
  const applyFilter = list => {
    if (currentFilter === "all") return list;
    if (currentFilter === "quick") {
      return list.filter(r => r.time <= 30);
    }
    return list.filter(r => r.difficulty === currentFilter);
  };

  // --------------------
  // SORT
  // --------------------
  const applySort = list => {
    if (currentSort === "name") {
      return [...list].sort((a, b) => a.title.localeCompare(b.title));
    }
    if (currentSort === "time") {
      return [...list].sort((a, b) => a.time - b.time);
    }
    return list;
  };

  // --------------------
  // SEARCH
  // --------------------
  const applySearch = list =>
    list.filter(r =>
      r.title.toLowerCase().includes(searchText)
    );

  // --------------------
  // RECURSIVE STEPS RENDER
  // --------------------
  const renderSteps = steps => {
    return `
      <ul>
        ${steps.map(step => {
          if (typeof step === "string") {
            return `<li>${step}</li>`;
          } else {
            return `
              <li>
                ${step.text}
                ${renderSteps(step.substeps)}
              </li>
            `;
          }
        }).join("")}
      </ul>
    `;
  };

  // --------------------
  // RENDER RECIPES
  // --------------------
  const renderRecipes = list => {
    recipeContainer.innerHTML = list.map((r, index) => `
      <div class="recipe-card">
        <h3>${r.title}</h3>
        <div class="recipe-meta">
          <p>Difficulty: ${r.difficulty}</p>
          <p>Time: ${r.time} mins</p>
        </div>

        <button class="toggle-btn" data-type="ingredients">
          Show Ingredients
        </button>
        <div class="ingredients-container">
          <ul>${r.ingredients.map(i => `<li>${i}</li>`).join("")}</ul>
        </div>

        <button class="toggle-btn" data-type="steps">
          Show Steps
        </button>
        <div class="steps-container">
          ${renderSteps(r.steps)}
        </div>
      </div>
    `).join("");
  };

  // --------------------
  // UPDATE DISPLAY
  // --------------------
  const updateDisplay = () => {
    let result = recipes;
    result = applySearch(result);
    result = applyFilter(result);
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

  searchInput.addEventListener("input", e => {
    searchText = e.target.value.toLowerCase();
    updateDisplay();
  });

  recipeContainer.addEventListener("click", e => {
    if (!e.target.classList.contains("toggle-btn")) return;

    const type = e.target.dataset.type;
    const container = e.target.nextElementSibling;
    container.classList.toggle("visible");

    e.target.textContent =
      container.classList.contains("visible")
        ? `Hide ${type}`
        : `Show ${type}`;
  });

  // --------------------
  // INIT
  // --------------------
  const init = () => updateDisplay();

  return { init };

})();

RecipeApp.init();
