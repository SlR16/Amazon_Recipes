let allRecipes = []; // To store all recipes for search functionality
const content = document.getElementById("content");

// Function to load a category
async function showCategory(category) {
    try {
      const response = await fetch(`data/${category}.json`);
      if (!response.ok) throw new Error('Failed to load recipes');
      const recipes = await response.json();
      allRecipes = recipes; // Store recipes for search functionality
      displayRecipes(recipes);
    } catch (error) {
      content.innerHTML = `<p>Error loading ${category} recipes: ${error.message}</p>`;
    }
  }
  
// Function to display recipes
function displayRecipes(recipes) {
  content.innerHTML = ""; // Clear existing content

  if (recipes.length === 0) {
    content.innerHTML = "<p>No recipes found.</p>";
    return;
  }

  recipes.forEach(recipe => {
    const recipeCard = document.createElement("div");
    recipeCard.className = "recipe";

    recipeCard.innerHTML = `
      <h2>${recipe.name}</h2>
      <p><strong>Type:</strong> ${recipe.type}</p>
      <p><strong>Ingredients:</strong></p>
      <ul>
        ${recipe.ingredients.map(i => `<li>${i.amount} ${i.unit} ${i.name}</li>`).join("")}
      </ul>
      <p><strong>Process:</strong> ${recipe.process}</p>
    `;

    content.appendChild(recipeCard);
  });
}

// Search functionality
function searchRecipes(event) {
  const query = event.target.value.toLowerCase();
  const filteredRecipes = allRecipes.filter(recipe =>
    recipe.name.toLowerCase().includes(query) ||
    recipe.type.toLowerCase().includes(query)
  );
  displayRecipes(filteredRecipes);
}

